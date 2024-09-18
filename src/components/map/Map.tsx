import React, { forwardRef, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Fix cho icon mặc định
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: iconShadow,
});

interface Location {
  lat: number;
  lng: number;
  name: string;
}

interface MapProps {
  style: React.CSSProperties;
  locations?: Location[];
  center: L.LatLngExpression;
  zoom: number;
  onMapClick?: (lat: number, lng: number) => void;
}

const MapEvents = ({
  onMapClick,
}: {
  onMapClick?: (lat: number, lng: number) => void;
}) => {
  useMapEvents({
    click(e) {
      onMapClick?.(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

function ChangeView({
  center,
  zoom,
}: {
  center: L.LatLngExpression;
  zoom: number;
}) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const Map = forwardRef<L.Map, MapProps>(
  ({ style, locations, center, zoom, onMapClick }, ref) => {
    const mapRef = useRef<L.Map | null>(null);

    // Kiểm tra xem có ít nhất một vị trí hợp lệ không
    const validLocations =
      locations?.filter(
        (loc) => typeof loc.lat === "number" && typeof loc.lng === "number"
      ) ?? [];

    const handleMarkerClick = (lat: number, lng: number) => {
      mapRef.current?.flyTo([lat, lng], 15);
    };

    return (
      <MapContainer
        ref={(map) => {
          mapRef.current = map;
          if (ref) {
            if (typeof ref === "function") ref(map);
            else ref.current = map;
          }
        }}
        style={style}
        center={center}
        zoom={zoom}
      >
        <MapEvents onMapClick={onMapClick} />
        <ChangeView center={center} zoom={zoom} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {validLocations?.length <= 0 ||
          validLocations?.map((location, index) => (
            <Marker
              key={index}
              position={[location.lat, location.lng]}
              eventHandlers={{
                click: () => handleMarkerClick(location.lat, location.lng),
              }}
            >
              <Popup>{location.name}</Popup>
            </Marker>
          ))}
      </MapContainer>
    );
  }
);

export default Map;
