import { useEffect, useRef, useState } from "react";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM";
import {fromLonLat, toLonLat} from 'ol/proj';
import "ol/ol.css";
import Overlay from "ol/Overlay.js";
import { ReportForm } from "./ReportForm";

const PR_COORDINATES = [-66.664513, 18.200178];

export default function MainMap() {

    const mapRef = useRef();
    const popupRef = useRef();
    const [popupRender, setPopupRender] = useState(null);
    const [reportModal, setReportModal] = useState(false);


    useEffect(() => {

        const overlay = new Overlay({
            element: popupRef.current,
            autoPan: {
                animation: {
                    duration: 250,
                },
            },
        });

        const map = new Map({
            target: "map",
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            overlays: [overlay],
            view: new View({
                center: fromLonLat(PR_COORDINATES),
                zoom: 7,
            }),
        });

        map.on("singleclick", (e) => {
            setReportModal(false);
            const coordinates = toLonLat(e.coordinate);
            setPopupRender(coordinates);
            overlay.setPosition(e.coordinate);
        });

        return () => {
            map.setTarget(null);
        };
    }, []);

    return (
    <div>
    <div 
    ref={mapRef}
    id="map"
    style={{height: "400px"}}/>

    <div ref={popupRef} className="ol-popup" style={popupStyle}>
        {popupRender && (
            <>
            <p>LAT: {popupRender[1]} LON: {popupRender[0]}</p>
            <button onClick={() => setReportModal(true)}>Report</button>
            {reportModal && (
                <ReportForm onClose={() => setReportModal(false)}/>
            )
            }
            </>
        )}
    </div>
</div>
);
}

const popupStyle = {
  position: "absolute",
  backgroundColor: "white",
  padding: "5px",
  borderRadius: "5px",
  border: "1px solid black",
  transform: "translate(-50%, -100%)",
  width: "220px",
  color: "black"
};
