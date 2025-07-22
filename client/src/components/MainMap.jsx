import { useEffect, useState } from "react";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM";
import {fromLonLat} from 'ol/proj';

import "ol/ol.css";

const PR_COORDINATES = [-66.664513, 18.200178];

export default function MainMap() {
    const [mainMap, setMainMap] = useState();
    const [clickedCoordinate, setClickedCoordinate] = useState();

    useEffect(() => {
        const map = new Map({
            target: "map",
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: fromLonLat(PR_COORDINATES),
                zoom: 7,
            }),
        });

        map.on("click", (e) => {
            setClickedCoordinate(e.coordinate);
        });

        setMainMap(map);

        return () => {
            map.setTarget(null);
        };
    }, []);

    return (
    <>
    <div id="map"
    style={{height: "400px"}}/>
    {clickedCoordinate && <span className="coordinates-container">
        You clicked at: {clickedCoordinate[0]} / {clickedCoordinate[1]}
        </span>}
    </>
);
}
