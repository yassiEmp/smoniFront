// SSR replacement for the `leaflet` package. Returns a no-op proxy because
// no leaflet code path should actually execute during prerender.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stub: any = new Proxy(function () {}, {
  get(target, prop) {
    if (prop === '__esModule') return true;
    if (prop === 'then') return undefined;
    return stub;
  },
  apply() {
    return stub;
  },
  construct() {
    return stub;
  },
});

export default stub;

// Mirror the named exports the client shim provides, all pointing at the stub
// so that any incidental destructuring doesn't crash module load.
export const bind = stub, bounds = stub, Bounds = stub, Browser = stub;
export const canvas = stub, Canvas = stub, circle = stub, Circle = stub;
export const circleMarker = stub, CircleMarker = stub, Class = stub;
export const control = stub, Control = stub, CRS = stub, divIcon = stub;
export const DivIcon = stub, DivOverlay = stub, DomEvent = stub, DomUtil = stub;
export const Draggable = stub, Evented = stub, extend = stub;
export const featureGroup = stub, FeatureGroup = stub, geoJson = stub;
export const geoJSON = stub, GeoJSON = stub, gridLayer = stub, GridLayer = stub;
export const Handler = stub, icon = stub, Icon = stub, imageOverlay = stub;
export const ImageOverlay = stub, latLng = stub, LatLng = stub;
export const latLngBounds = stub, LatLngBounds = stub, Layer = stub;
export const layerGroup = stub, LayerGroup = stub, LineUtil = stub;
export const map = stub, Map = stub, marker = stub, Marker = stub;
export const Mixin = stub, noConflict = stub, Path = stub, point = stub;
export const Point = stub, polygon = stub, Polygon = stub, polyline = stub;
export const Polyline = stub, PolyUtil = stub, popup = stub, Popup = stub;
export const PosAnimation = stub, Projection = stub, rectangle = stub;
export const Rectangle = stub, Renderer = stub, setOptions = stub;
export const stamp = stub, svg = stub, SVG = stub, svgOverlay = stub;
export const SVGOverlay = stub, tileLayer = stub, TileLayer = stub;
export const tooltip = stub, Tooltip = stub, transformation = stub;
export const Transformation = stub, Util = stub, version = '0.0.0';
export const videoOverlay = stub, VideoOverlay = stub;
