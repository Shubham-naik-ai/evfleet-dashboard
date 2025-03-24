
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";

// Temporary access token - in production this should be stored securely
// User should replace this with their own token from mapbox.com
const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoibWFwYm94LWRlbW8iLCJhIjoiY2pqd2U1OHRnMDBvNjNxcDNqNW85amh2NiJ9.XT7-qDGn_2T88tI12_YngA";

interface BusLocation {
  id: string;
  lat: number;
  lng: number;
  status: "moving" | "stopped" | "maintenance";
  busNumber: string;
}

const IndiaMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [apiKey, setApiKey] = useState(MAPBOX_ACCESS_TOKEN);

  // Sample bus location data for India
  // In a real application, this would come from an API
  const busLocations: BusLocation[] = [
    { id: "bus1", lat: 28.6139, lng: 77.2090, status: "moving", busNumber: "EV0721" }, // Delhi
    { id: "bus2", lat: 19.0760, lng: 72.8777, status: "moving", busNumber: "EV0892" }, // Mumbai
    { id: "bus3", lat: 12.9716, lng: 77.5946, status: "moving", busNumber: "EV1124" }, // Bangalore
    { id: "bus4", lat: 17.3850, lng: 78.4867, status: "stopped", busNumber: "EV0935" }, // Hyderabad
    { id: "bus5", lat: 13.0827, lng: 80.2707, status: "maintenance", busNumber: "EV1045" }, // Chennai
    { id: "bus6", lat: 22.5726, lng: 88.3639, status: "moving", busNumber: "EV0786" }, // Kolkata
    { id: "bus7", lat: 23.0225, lng: 72.5714, status: "stopped", busNumber: "EV0433" }, // Ahmedabad
    { id: "bus8", lat: 26.9124, lng: 75.7873, status: "moving", busNumber: "EV0512" }, // Jaipur
    { id: "bus9", lat: 18.5204, lng: 73.8567, status: "moving", busNumber: "EV0667" }, // Pune
  ];

  // Handle API key changes
  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  // Initialize the map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    try {
      // Set the access token
      mapboxgl.accessToken = apiKey;

      // Create the map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [78.9629, 20.5937], // Center of India
        zoom: 4
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        "top-right"
      );

      map.current.on("load", () => {
        setMapLoaded(true);
      });
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [apiKey]);

  // Add bus markers to the map
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Remove existing markers if any
    const markers = document.querySelectorAll('.mapboxgl-marker');
    markers.forEach(marker => marker.remove());

    // Add markers for each bus location
    busLocations.forEach(bus => {
      // Create a custom marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'bus-marker';
      
      // Style the marker based on bus status
      let markerColor = '';
      switch (bus.status) {
        case 'moving':
          markerColor = '#10B981'; // green
          break;
        case 'stopped':
          markerColor = '#0EA5E9'; // blue
          break;
        case 'maintenance':
          markerColor = '#F59E0B'; // yellow
          break;
      }
      
      markerElement.innerHTML = `
        <div style="background-color: ${markerColor}; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M8 5H18V15C18 16.1046 17.1046 17 16 17H10C8.89543 17 8 16.1046 8 15V5Z"></path>
            <rect x="6" y="13" width="2" height="2"></rect>
            <rect x="18" y="13" width="2" height="2"></rect>
            <path d="M5 7H19"></path>
            <path d="M5 9H19"></path>
            <path d="M9 17V19"></path>
            <path d="M15 17V19"></path>
          </svg>
        </div>
      `;
      
      // Create the popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div style="padding: 10px;">
            <strong style="font-size: 14px;">Bus ${bus.busNumber}</strong>
            <p style="font-size: 12px; margin: 5px 0;">Status: ${bus.status}</p>
          </div>
        `);
        
      // Add the marker to the map
      new mapboxgl.Marker(markerElement)
        .setLngLat([bus.lng, bus.lat])
        .setPopup(popup)
        .addTo(map.current!);
    });
  }, [mapLoaded, busLocations]);

  return (
    <div className="bg-white rounded-xl border border-border/40 shadow-sm p-5 h-[400px]">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Live Bus Tracking</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center text-xs">
            <span className="w-3 h-3 rounded-full bg-ev-green mr-1"></span>
            <span className="mr-2">Moving</span>
            
            <span className="w-3 h-3 rounded-full bg-ev-blue mr-1"></span>
            <span className="mr-2">Stopped</span>
            
            <span className="w-3 h-3 rounded-full bg-ev-yellow mr-1"></span>
            <span>Maintenance</span>
          </div>
        </div>
      </div>
      
      {!MAPBOX_ACCESS_TOKEN.startsWith('pk.eyJ1IjoibWFwYm94LWRlbW8') ? (
        <div className="h-[345px] relative" ref={mapContainer}></div>
      ) : (
        <div className="h-[345px] flex flex-col">
          <div className="mb-2">
            <label className="text-xs text-muted-foreground block mb-1">
              Enter your Mapbox token (get one at mapbox.com):
            </label>
            <input
              type="text"
              value={apiKey}
              onChange={handleApiKeyChange}
              className="px-3 py-1 text-sm border rounded w-full"
              placeholder="Enter Mapbox access token"
            />
          </div>
          <div className="flex-1 relative" ref={mapContainer}></div>
        </div>
      )}
    </div>
  );
};

export default IndiaMap;
