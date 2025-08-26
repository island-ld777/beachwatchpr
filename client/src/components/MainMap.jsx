import { useEffect, useRef, useState } from "react";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import OSM from "ol/source/OSM";
import { fromLonLat, toLonLat } from 'ol/proj';
import Overlay from "ol/Overlay.js";
import Feature from "ol/Feature.js";
import Point from "ol/geom/Point.js";
import { Style, Icon, Circle, Fill, Stroke } from "ol/style.js";
import { ReportForm } from "./ReportForm";
import { getValidatedReports } from "../utils/dataHandler";
import "ol/ol.css";

const PR_COORDINATES = [-66.5, 18.2];

// Category colors for markers
const CATEGORY_COLORS = {
    'Pollution': '#ff4444',              // Red
    'Illegal Construction': '#ff8800',   // Orange
    'Land Clearing': '#44aa44',          // Green
    'Blocked Access': '#4444ff'          // Blue
};

export default function MainMap() {
    const mapRef = useRef();
    const popupRef = useRef();
    const reportPopupRef = useRef();
    const [popupRender, setPopupRender] = useState(null);
    const [reportModal, setReportModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [map, setMap] = useState(null);

    // Create marker style based on category
    const createMarkerStyle = (category) => {
        const color = CATEGORY_COLORS[category] || '#888888'; // Default gray if category not found
        return new Style({
            image: new Circle({
                radius: 8,
                fill: new Fill({
                    color: color,
                }),
                stroke: new Stroke({
                    color: '#ffffff',
                    width: 2,
                }),
            }),
        });
    };

    // Load and display validated reports as markers
    const loadValidatedReports = async (map) => {
        try {
            const reports = await getValidatedReports();
            console.log('Loaded reports:', reports); // Debug log
            
            const features = reports.map(report => {
                const feature = new Feature({
                    geometry: new Point(fromLonLat([report.longitude, report.latitude])),
                    report: report, // Store report data in feature
                });
                feature.setStyle(createMarkerStyle(report.category));
                return feature;
            });

            const vectorSource = new VectorSource({
                features: features,
            });

            const vectorLayer = new VectorLayer({
                source: vectorSource,
            });

            map.addLayer(vectorLayer);
            
        } catch (error) {
            console.error('Error loading validated reports:', error);
        }
    };

    useEffect(() => {
        // Initialize popup elements with default hidden state
        if (popupRef.current) {
            popupRef.current.style.display = 'none';
        }
        if (reportPopupRef.current) {
            reportPopupRef.current.style.display = 'none';
        }

        const coordinateOverlay = new Overlay({
            element: popupRef.current,
            autoPan: {
                animation: {
                    duration: 250,
                },
            },
            positioning: 'top-center', // Changed from 'bottom-center'
            stopEvent: false,
            offset: [0, 10], // Smaller offset, positioned below the click point
        });

        const reportOverlay = new Overlay({
            element: reportPopupRef.current,
            autoPan: {
                animation: {
                    duration: 250,
                },
                margin: 20,
            },
            positioning: 'top-center', // Changed from 'bottom-center'
            stopEvent: false,
            offset: [0, 15], // Smaller offset, positioned below the marker
        });

        const newMap = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            overlays: [coordinateOverlay, reportOverlay],
            view: new View({
                center: fromLonLat(PR_COORDINATES),
                zoom: 9,
            }),
        });

        newMap.on("singleclick", (e) => {
            console.log('Map clicked at:', e.coordinate); // Debug log
            
            // Reset modals
            setReportModal(false);
            
            // Check if click is on a feature (marker)
            const feature = newMap.forEachFeatureAtPixel(e.pixel, (feature) => {
                console.log('Feature found:', feature.get('report')); // Debug log
                return feature;
            });
            
            if (feature && feature.get('report')) {
                // Clicked on a report marker
                console.log('Showing report popup'); // Debug log
                const report = feature.get('report');
                setSelectedReport(report);
                
                // Hide coordinate popup
                coordinateOverlay.setPosition(undefined);
                popupRef.current.style.display = 'none';
                setPopupRender(null);
                
                // Show report popup at the marker's exact position
                const markerCoordinate = feature.getGeometry().getCoordinates();
                reportPopupRef.current.style.display = 'block';
                reportOverlay.setPosition(markerCoordinate);
                
            } else {
                // Clicked on empty map - use the exact click coordinate
                console.log('Showing coordinate popup'); // Debug log
                const coordinates = toLonLat(e.coordinate);
                
                // Hide report popup
                reportOverlay.setPosition(undefined);
                reportPopupRef.current.style.display = 'none';
                setSelectedReport(null);
                
                // Show coordinate popup at exact click position
                setPopupRender(coordinates);
                popupRef.current.style.display = 'block';
                coordinateOverlay.setPosition(e.coordinate); // Use e.coordinate directly
            }
        });

        setMap(newMap);
        loadValidatedReports(newMap);

        return () => {
            newMap.setTarget(null);
        };
    }, []);

    const closeCoordinatePopup = () => {
        setPopupRender(null);
        setReportModal(false);
        if (popupRef.current) {
            popupRef.current.style.display = 'none';
        }
    };

    const closeReportPopup = () => {
        setSelectedReport(null);
        if (reportPopupRef.current) {
            reportPopupRef.current.style.display = 'none';
        }
    };

    return (
        <div>
            <div 
                ref={mapRef}
                id="map"
                className="main-map"
                style={{ width: '100%', height: '500px' }}
            />

            {/* Coordinate popup for creating new reports */}
            <div ref={popupRef} className="map-popup" style={{ display: 'none' }}>
                {popupRender && (
                    <div className="map-popup-content">
                        <p className="underline text-2xl text-center mb-3">Coordinates</p>
                        <p>LAT: {parseFloat(popupRender[1]).toFixed(4)} LON: {parseFloat(popupRender[0]).toFixed(4)}</p>
                        <div className="flex justify-between mt-3">
                            <button 
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                                onClick={() => setReportModal(true)}
                            >
                                Report
                            </button>
                            <button 
                                className="bg-gray-500 text-white px-3 py-1 rounded"
                                onClick={closeCoordinatePopup}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Report Form Modal */}
            {reportModal && (
                <ReportForm 
                    onClose={() => setReportModal(false)} 
                    coordinates={popupRender ? [popupRender[1], popupRender[0]] : [0, 0]}
                />
            )}

            {/* Report details popup for validated reports */}
            <div ref={reportPopupRef} className="map-popup" style={{ display: 'none' }}>
                {selectedReport && (
                    <div className="map-popup-content max-w-md">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-xl font-bold">Validated Report</h3>
                            <button 
                                onClick={closeReportPopup}
                                className="text-gray-500 hover:text-gray-700 text-xl"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className="space-y-3">
                            <div>
                                <strong>Category:</strong>
                                <span 
                                    className="ml-2 px-2 py-1 rounded text-white text-sm"
                                    style={{ backgroundColor: CATEGORY_COLORS[selectedReport.category] || '#888888' }}
                                >
                                    {selectedReport.category}
                                </span>
                            </div>
                            
                            <div>
                                <strong>Description:</strong>
                                <p className="mt-1 text-gray-700">{selectedReport.description}</p>
                            </div>
                            
                            {selectedReport.images && selectedReport.images.length > 0 && (
                                <div>
                                    <strong>Images:</strong>
                                    <div className="mt-2 grid grid-cols-2 gap-2">
                                        {selectedReport.images.map((image, index) => (
                                            <img
                                                key={image.id || index}
                                                src={`http://localhost:5000${image.image_url}`}
                                                alt={`Report image ${index + 1}`}
                                                className="w-full h-20 object-cover rounded border"
                                                onError={(e) => {
                                                    console.error('Image load error:', image.image_url);
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            <div className="text-sm text-gray-500">
                                {selectedReport.validated_at && (
                                    <p>Validated: {new Date(selectedReport.validated_at).toLocaleDateString()}</p>
                                )}
                                <p>Location: {parseFloat(selectedReport.latitude).toFixed(4)}, {parseFloat(selectedReport.longitude).toFixed(4)}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

