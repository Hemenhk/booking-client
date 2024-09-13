"use client"

import { useEffect } from "react";
import { useMap } from "react-leaflet";


export default function ChangeMapView({ position }: { position: [number, number] }) {
    const map = useMap();

    useEffect(() => {
      if (position) {
        map.setView(position, map.getZoom(), {
          animate: true,
        });
      }
    }, [position, map]);
  
    return null;
}
