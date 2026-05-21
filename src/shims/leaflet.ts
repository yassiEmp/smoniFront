// Vite alias target for `leaflet`.
// Leaflet ships UMD which Vite/esbuild prebundles as `export default <namespace>`,
// breaking `import { DomUtil } from 'leaflet'` from `@react-leaflet/core`.
// This shim re-exports every member as a named export.
import L from 'leaflet/dist/leaflet-src.js';

export default L;

export const {
  bind, bounds, Bounds, Browser, canvas, Canvas, circle, Circle, circleMarker, CircleMarker,
  Class, control, Control, CRS, divIcon, DivIcon, DivOverlay, DomEvent, DomUtil, Draggable,
  Evented, extend, featureGroup, FeatureGroup, geoJson, geoJSON, GeoJSON, gridLayer, GridLayer,
  Handler, icon, Icon, imageOverlay, ImageOverlay, latLng, LatLng, latLngBounds, LatLngBounds,
  Layer, layerGroup, LayerGroup, LineUtil, map, Map, marker, Marker, Mixin, noConflict, Path,
  point, Point, polygon, Polygon, polyline, Polyline, PolyUtil, popup, Popup, PosAnimation,
  Projection, rectangle, Rectangle, Renderer, setOptions, stamp, svg, SVG, svgOverlay, SVGOverlay,
  tileLayer, TileLayer, tooltip, Tooltip, transformation, Transformation, Util, version,
  videoOverlay, VideoOverlay,
  // @ts-expect-error - leaflet ESM has no declared types, members are dynamic
} = L;
