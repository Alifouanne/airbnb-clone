"use client";
import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";
import { useCountries } from "../lib/getCountries";
import { icon } from "leaflet";
const ICON = icon({
  iconUrl:
    "https://p7.hiclipart.com/preview/836/493/143/google-map-maker-computer-icons-google-maps-clip-art-location-mark.jpg",
  iconSize: [50, 50],
});
const Map = ({ location }: { location: string }) => {
  const { getCountryByValue } = useCountries();
  const latLang = getCountryByValue(location)?.latLang;
  return (
    <MapContainer
      scrollWheelZoom={false}
      className="h-[50vh] rounded-lg relative z-0"
      center={latLang ?? [52.505, -0.09]}
      zoom={8}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={latLang ?? [52.505, -0.09]} icon={ICON} />
    </MapContainer>
  );
};

export default Map;
