import { useEffect, useRef, useState } from 'react';
import './index.css'

// Import - Import for Map
import Map from 'ol/Map.js';

// Import - Import for View
import View from 'ol/View.js';

// Import - Import for Layers and Layers Source
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';

// Import - Import for Controls
import ScaleLineControl from 'ol/control/ScaleLine';
import FullScreenControl from 'ol/control/FullScreen';
import { Zoom, Attribution, Rotate, MousePosition, ZoomSlider } from 'ol/control';

// Import - Import for function that creates cordinates
import { createStringXY } from 'ol/coordinate';

function App() {

  // Const declaration - controls
  const rotateControl = new Rotate();
  const zoomSliderControl = new ZoomSlider();
  const scaleLineControl = new ScaleLineControl();
  const fullScreenControl = new FullScreenControl();
  const attrControl = new Attribution()
  const zoomControl = new Zoom({})
  const mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: 'EPSG:4326',
    className: 'custom-mouse-position',
  });

  // State inizialization - State for Map ref and Map
  const mapTargetElement = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<Map | undefined>()

  useEffect(() => {
    const map = new Map({
      layers: [
        new TileLayer({ source: new OSM() }),
      ],
      controls: [fullScreenControl, scaleLineControl, zoomControl, attrControl, mousePositionControl, rotateControl, zoomSliderControl],
      view: new View({
        center: [0, 0],
        zoom: 0,
        minZoom: 0,
        maxZoom: 28,
      }),
    })
    map.setTarget(mapTargetElement.current || "")
    setMap(map)
    return () => map.setTarget("")
  }, [])

  // Function delcaration - Declaring functions for editing the View
  const lessZoom = (map: Map) => {
    const view = map.getView();
    const currentZoom = view.getZoom()
    const newZoom = currentZoom - 0.5;
    view.setZoom(newZoom);
  }

  const zoom = (map: Map) => {
    console.log("zoom")
    const view = map.getView()
    const currentZoom = view.getZoom()
    const newZoom = currentZoom + 1;
    view.setZoom(newZoom)
  }

  const increaseResolution = (map: Map) => {
    const view = map.getView();
    const currentResolution = view.getResolution();
    const newResolution = currentResolution / 2;
    view.setResolution(newResolution);
  };

  const decreaseResolution = (map: Map) => {
    const view = map.getView();
    const currentResolution = view.getResolution();
    const newResolution = currentResolution * 2;
    view.setResolution(newResolution);
  };

  const rotateLeft = (map: Map) => {
    const view = map.getView();
    const currentRotation = view.getRotation();
    const newRotation = currentRotation - Math.PI / 6;
    view.setRotation(newRotation);
  };

  const rotateRight = (map: Map) => {
    const view = map.getView();
    const currentRotation = view.getRotation();
    const newRotation = currentRotation + Math.PI / 6;
    view.setRotation(newRotation);
  };

  const originalCenter = (map: Map) => {
    const view = map.getView();
    const currentCenter = view.getCenter();
    const newCenter = [0, 0];
    view.setCenter(newCenter);
  };

  const changeCenter = (map: Map) => {
    const view = map.getView();
    const currentCenter = view.getCenter();
    const newCenter = [-10725196.690349146, 5635012.033203788];
    view.setCenter(newCenter);
  };

  return (
    <>
      <button onClick={() => lessZoom(map)}>lessZoom</button>
      <button onClick={() => zoom(map)}>zoom</button>
      <button onClick={() => increaseResolution(map)}>increaseResolution</button>
      <button onClick={() => decreaseResolution(map)}>decreaseResolution</button>
      <button onClick={() => rotateRight(map)}>rotateRight</button>
      <button onClick={() => rotateLeft(map)}>rotateLeft</button>
      <button onClick={() => changeCenter(map)}>changeCenter</button>
      <button onClick={() => originalCenter(map)}>originalCenter</button>
      <div
        ref={mapTargetElement}
        className="map"
        style={{
          width: "100%",
          height: "400px",
          position: "relative",
        }} >
      </div>
    </>
  )
}
export default App; 