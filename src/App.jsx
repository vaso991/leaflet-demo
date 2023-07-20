import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import './App.css';
import { useEffect, useState } from 'react';
import { icon } from 'leaflet';

const DEFAULT_POSITION = [41.726291, 44.744465];

const randomFloat = (min, max) => Math.random() * (max - min) + min;

const COMERCANTS = Array(20)
  .fill(null)
  .map((_, index) => ({
    latitude: randomFloat(41.692893, 41.817632),
    longitude: randomFloat(44.762019, 44.804555),
    name: `Comercant ${index}`,
    id: index
  }));

const CourierIcon = icon({
  iconUrl: '/Courier.svg',
  iconSize: [46, 46],
});

function App() {
  return (
    <>
      <MapContainer
        center={DEFAULT_POSITION}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png" />
        <LocationDetector />
        <MapChangeDetector />
        <Markers />
      </MapContainer>
    </>
  );
}

export default App;

function LocationDetector() {
  const map = useMap();

  useEffect(() => {
    if (map) {
      map.locate();
    }
  }, [map]);
}

function Markers() {
  function onMarkerClick(e, comercans) {
    console.log('marker clicked', comercans)
  }
  return (
    <>
      {COMERCANTS.map((c) => (
        <Marker key={c.id} position={[c.latitude, c.longitude]} icon={CourierIcon} alt={c.name} eventHandlers={{
          click: (e) => onMarkerClick(e, c)
        }} />
      ))}
    </>
  );
}

function MapChangeDetector() {
  function onMapStateChange(e) {
    const zoom = map.getZoom();
    const coordinates = map.getCenter();
    console.log({lat: coordinates.lat, lng: coordinates.lng, zoom});
  }
  const map = useMapEvent({
    moveend: onMapStateChange,
    zoomend: onMapStateChange
  })
  return null;
}