"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import { TiLocation } from "react-icons/ti";
import { renderToStaticMarkup } from "react-dom/server";
import { Store } from "@/types/types";
import ChangeMapView from "./ChangeMapView";

export default function TheStoreDetailMap({
  storeData,
}: {
  storeData: Store | undefined;
}) {
  const [mapCenter, setMapCenter] = useState<[number, number]>([51.505, -0.09]); // Default center: London

  useEffect(() => {
    if (storeData?.address_coordinates) {
      setMapCenter([
        storeData.address_coordinates.latitude,
        storeData.address_coordinates.longitude,
      ]);
    }
  }, [storeData]);

  const createReactIconMarker = () => {
    const iconMarkup = renderToStaticMarkup(
      <div style={{ color: "black", fontSize: "2rem" }}>
        <TiLocation />
      </div>
    );
    return L.divIcon({
      html: iconMarkup,
      className: "react-icon-marker", // Add this class for custom styling if needed
      iconSize: [30, 30], // Adjust the icon size if needed
      iconAnchor: [15, 30], // Adjust anchor point for positioning
    });
  };

  return (
    <MapContainer
      center={mapCenter}
      attributionControl={false}
      zoomControl={false}
      zoom={16}
      scrollWheelZoom={false}
      className="rounded-t-lg brightness-90 h-[500px]" // Make sure the map has enough height
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      {/* Custom marker */}
      {storeData?.address_coordinates && (
        <>
          <ChangeMapView
            position={[
              storeData.address_coordinates.latitude,
              storeData.address_coordinates.longitude,
            ]}
          />
          <Marker
            position={[
              storeData.address_coordinates.latitude,
              storeData.address_coordinates.longitude,
            ]}
            icon={createReactIconMarker()}
          />
        </>
      )}
    </MapContainer>
  );
}
