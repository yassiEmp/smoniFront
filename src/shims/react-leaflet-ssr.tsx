// SSR stub for react-leaflet. Renders nothing on the server; the real
// package is only loaded in the browser via the original import path.
const Noop = () => null;

export const MapContainer = Noop;
export const TileLayer = Noop;
export const Marker = Noop;
export const Popup = Noop;
export const Tooltip = Noop;
export const Polyline = Noop;
export const Polygon = Noop;
export const Circle = Noop;
export const CircleMarker = Noop;
export const Rectangle = Noop;
export const FeatureGroup = Noop;
export const LayerGroup = Noop;
export const GeoJSON = Noop;
export const ImageOverlay = Noop;
export const VideoOverlay = Noop;
export const SVGOverlay = Noop;
export const Pane = Noop;
export const ZoomControl = Noop;
export const AttributionControl = Noop;
export const ScaleControl = Noop;
export const LayersControl = Object.assign(Noop, {
  BaseLayer: Noop,
  Overlay: Noop,
});
export const useMap = () => null;
export const useMapEvent = () => undefined;
export const useMapEvents = () => null;

export default {};
