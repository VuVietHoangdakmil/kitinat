import React, { useState, useRef } from "react";
import Map from "../../components/map/Map";

const Store = () => {
  const locations = [
    { lat: 21.0285, lng: 105.8542, name: "Hà Nội" },
    { lat: 10.8231, lng: 106.6297, name: "Hồ Chí Minh" },
    { lat: 16.0544, lng: 108.2022, name: "Đà Nẵng" },
  ];

  const [center, setCenter] = useState<[number, number]>([16.0544, 108.2022]);
  const [zoom, setZoom] = useState(6);
  const mapRef = useRef<any>(null);

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLocation = locations.find(
      (loc) => loc.name === event.target.value
    );
    if (selectedLocation) {
      setCenter([selectedLocation.lat, selectedLocation.lng]);
      setZoom(15); // Đặt mức zoom cao hơn
      mapRef.current?.flyTo([selectedLocation.lat, selectedLocation.lng], 15, {
        duration: 2, // Thời gian di chuyển (giây)
      });
    }
  };

  return (
    <div>
      <select onChange={handleLocationChange}>
        <option value="">Chọn địa điểm</option>
        {locations.map((location, index) => (
          <option key={index} value={location.name}>
            {location.name}
          </option>
        ))}
      </select>
      <Map
        ref={mapRef}
        style={{ height: "500px", width: "60%" }}
        locations={locations}
        center={center}
        zoom={zoom}
      />
    </div>
  );
};

export default Store;
