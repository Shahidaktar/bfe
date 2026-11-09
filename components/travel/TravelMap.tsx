'use client';

import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import type { Map as LeafletMap } from 'leaflet';
import type { TravelRouteStop } from '../../lib/travel';

/**
 * Free Esri street tiles rendered with Leaflet.
 * Leaflet is imported inside the effect so it never touches the server render.
 */
export const TravelMap: React.FC<{ stops: TravelRouteStop[] }> = ({ stops }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
        zoomSnap: 0.5,
        minZoom: 3,
      });
      mapRef.current = map;

      // Free, key-less Esri street map with full place names and roads.
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 19,
          attribution:
            'Tiles &copy; <a href="https://www.esri.com" target="_blank" rel="noopener noreferrer">Esri</a> — Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom',
        }
      ).addTo(map);

      const points = stops.map((stop) => L.latLng(stop.coords[0], stop.coords[1]));

      L.polyline(points, {
        color: '#b68b55',
        weight: 2,
        opacity: 0.95,
        lineJoin: 'round',
        lineCap: 'round',
      }).addTo(map);

      stops.forEach((stop, index) => {
        const icon = L.divIcon({
          className: 'travel-pin',
          html: `<span class="travel-pin__drop"><span>${String(index + 1).padStart(2, '0')}</span></span>`,
          iconSize: [36, 44],
          iconAnchor: [18, 44],
          popupAnchor: [0, -46],
        });

        L.marker(points[index], { icon, title: stop.label, riseOnHover: true })
          .addTo(map)
          .bindPopup(
            `<p class="travel-popup__day">${stop.dayRange} · ${stop.country}</p>
             <p class="travel-popup__title">${stop.label}</p>`,
            { closeButton: false, offset: [0, -4], className: 'travel-popup' }
          );
      });

      map.fitBounds(L.latLngBounds(points), { padding: [46, 46] });

      // Wheel zoom only after the map is engaged, so the page keeps scrolling.
      map.on('click', () => map.scrollWheelZoom.enable());
      map.on('mouseout', () => map.scrollWheelZoom.disable());
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [stops]);

  return (
    <div className="travel-map relative z-0 isolate">
      <div
        ref={containerRef}
        aria-label="Map of the route from Bishkek to Ashgabat across five Central Asian countries"
        className="h-[380px] w-full bg-[#f4f0e7] sm:h-[460px] lg:h-[520px]"
      />
    </div>
  );
};
