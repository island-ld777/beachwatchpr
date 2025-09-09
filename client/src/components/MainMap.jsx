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
    const [reportCoordinates, setReportCoordinates] = useState(null);
    const [selectedReport, setSelectedReport] = useState(null);
    const [map, setMap] = useState(null);
    const [expandedImage, setExpandedImage] = useState(null);

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

    // Create the Map upon loading
    useEffect(() => {

        const coordinateOverlay = new Overlay({
            element: popupRef.current,
            autoPan: {
                animation: {
                    duration: 250,
                },
            },
            positioning: 'top-center',
            stopEvent: true,
            offset: [0, 10], 
        });

        const reportOverlay = new Overlay({
            element: reportPopupRef.current,
            autoPan: {
                animation: {
                    duration: 250,
                },
                margin: 20,
            },
            positioning: 'top-center',
            stopEvent: true,
            offset: [0, 15], 
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
                //console.log('Feature found:', feature.get('report')); // Debug log
                return feature;
            });
            
            if (feature && feature.get('report')) {
                //console.log('Showing report popup'); // Debug log
                const report = feature.get('report');
                setSelectedReport(report);
                
                // Hide coordinate popup
                coordinateOverlay.setPosition(undefined);
                setPopupRender(null);
                
                // Hide any open report modal
                setReportModal(false);
                setReportCoordinates(null);
                
                // Show report popup
                const markerCoordinate = feature.getGeometry().getCoordinates();
                reportOverlay.setPosition(markerCoordinate);
                
            } else {
                // Clicked on empty map - use the exact click coordinate
                console.log('Showing coordinate popup'); // Debug log
                const coordinates = toLonLat(e.coordinate);
                
                // Hide report popup
                reportOverlay.setPosition(undefined);
                setSelectedReport(null);
                
                // Hide any open report modal
                setReportModal(false);
                setReportCoordinates(null);
                
                // Show coordinate popup
                setPopupRender(coordinates);
                coordinateOverlay.setPosition(e.coordinate); // Use e.coordinate directly
            }
        });

        setMap(newMap);
        loadValidatedReports(newMap);

        return () => {
            newMap.setTarget(null);
        };
    }, []);

    //Helper Functions for OnClicks
    const closeCoordinatePopup = () => {
        setPopupRender(null);
    };

    const closeReportPopup = () => {
        setSelectedReport(null);
    };

    const handleReportClick = () => {
        if (popupRender) {
            setReportCoordinates([popupRender[1], popupRender[0]]); // lat, lon
            setReportModal(true);
            closeCoordinatePopup();
        }
    };

    const handleReportClose = () => {
        setReportModal(false);
        setReportCoordinates(null);
    };

    const handleImageClick = (imageUrl) => {
        setExpandedImage(imageUrl);
    };

    const closeExpandedImage = () => {
        setExpandedImage(null);
    };

    return (
        <>
            <div className="relative">
                {/* Fullscreen responsive map */}
                <div 
                    ref={mapRef}
                    id="map"
                    className="w-full h-screen"
                />
            
                {/* Responsive Legend */}
                <div className="absolute top-4 right-4 bg-white p-2 sm:p-3 rounded-lg shadow-lg border z-10 max-w-[200px] sm:max-w-none">
                    <h4 className="font-bold text-xs sm:text-sm mb-1 sm:mb-2 text-gray-800">Report Types</h4>
                    <div className="space-y-0.5 sm:space-y-1">
                        {Object.entries(CATEGORY_COLORS).map(([category, color]) => (
                            <div key={category} className="flex items-center space-x-1 sm:space-x-2 text-xs">
                                <div 
                                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-white shadow-sm flex-shrink-0"
                                    style={{ backgroundColor: color }}
                                ></div>
                                <span className="text-gray-700 truncate">{category}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Coordinate popup for creating new reports */}
                <div ref={popupRef} className={`map-popup ${popupRender ? 'block' : 'hidden'}`} >
                    {popupRender && (
                        <div className="map-popup-content select-text pointer-events-auto w-64 sm:w-auto">
                            <p className="underline text-lg sm:text-2xl text-center mb-3">Coordinates</p>
                            <div className="space-y-1 mb-3 text-center text-sm sm:text-base"> 
                                <p>LAT: {parseFloat(popupRender[1]).toFixed(4)}</p>
                                <p>LON: {parseFloat(popupRender[0]).toFixed(4)}</p>
                            </div>
                            <div className="flex justify-between mt-3 gap-2">
                                <button 
                                    className="bg-blue-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded text-sm sm:text-base hover:bg-blue-600 transition-colors"
                                    onClick={handleReportClick}
                                >
                                    Report
                                </button>
                                <button 
                                    className="bg-gray-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded text-sm sm:text-base hover:bg-gray-600 transition-colors"
                                    onClick={closeCoordinatePopup}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Report details popup for validated reports */}
                <div ref={reportPopupRef} className={`map-popup md:w-100 ${selectedReport ? 'block' : 'hidden'}`}>
                    {selectedReport && (
                        <div className="map-popup-content select-text pointer-events-auto">
                            <div className="flex justify-between items-center mb-3">
                                <h3 
                                    className="text-lg sm:text-xl font-bold text-white px-2 sm:px-3 py-1 rounded flex-1 mr-3 text-sm sm:text-base"
                                    style={{ backgroundColor: CATEGORY_COLORS[selectedReport.category] || '#888888' }}
                                >
                                    {selectedReport.category}
                                </h3>
                                <button 
                                    onClick={closeReportPopup}
                                    className="text-gray-500 hover:text-gray-700 text-lg sm:text-xl w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center flex-shrink-0"
                                >
                                    ✕
                                </button>
                            </div>
                            
                            <div className="space-y-3">
                                <div>
                                    <strong className="text-sm sm:text-base">Description:</strong>
                                    <p className="mt-1 text-gray-700 break-words text-sm sm:text-base">{selectedReport.description}</p>
                                </div>
                                
                                {selectedReport.images && selectedReport.images.length > 0 && (
                                    <div>
                                        <strong className="text-sm sm:text-base">Images:</strong>
                                        <div className="mt-2 grid grid-cols-2 gap-2">
                                            {selectedReport.images.map((image, index) => {
                                                const imageUrl = image.image_url.startsWith('http') ? image.image_url : `http://localhost:5000${image.image_url}`;
                                                return (
                                                    <img
                                                        key={image.id || index}
                                                        src={imageUrl}
                                                        alt={`Report image ${index + 1}`}
                                                        className="w-full h-16 sm:h-20 object-cover rounded border cursor-pointer hover:opacity-80 transition-opacity"
                                                        onClick={() => handleImageClick(imageUrl)}
                                                        onError={(e) => {
                                                            console.error('Image load error:', image.image_url);
                                                            e.target.classList.add('hidden');
                                                        }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                                
                                <div className="text-xs sm:text-sm text-gray-500">
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

            {/* Report Form Modal - Rendered outside of map container */}
            {reportModal && reportCoordinates && (
                <ReportForm 
                    onClose={handleReportClose} 
                    coordinates={reportCoordinates}
                />
            )}

            {/* Expanded Image Modal */}
            {expandedImage && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={closeExpandedImage}
                >
                    <div className="relative max-w-[90vw] max-h-[90vh] sm:max-w-4xl sm:max-h-full p-2 sm:p-4">
                        <button
                            onClick={closeExpandedImage}
                            className="absolute top-1 right-1 sm:top-2 sm:right-2 text-white text-2xl sm:text-3xl bg-black bg-opacity-50 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-opacity-75"
                        >
                            ✕
                        </button>
                        <img
                            src={expandedImage}
                            alt="Expanded report image"
                            className="max-w-full max-h-full object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

