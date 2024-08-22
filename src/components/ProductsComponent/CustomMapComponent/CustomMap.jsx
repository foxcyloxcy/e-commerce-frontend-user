import React, { useEffect, useRef } from "react";
import { TextField } from "@mui/material";
import './CustomMap.css'

const MapComponent = () => {
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const infowindowContentRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 13,
        disableDefaultUI: true,
      });

      const input = inputRef.current;
      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        fields: ["place_id", "geometry", "name", "formatted_address"],
      });

      autocomplete.bindTo("bounds", map);
      map.controls[window.google.maps.ControlPosition.LEFT].push(input);

      const infowindow = new window.google.maps.InfoWindow();
      const infowindowContent = infowindowContentRef.current;
      infowindow.setContent(infowindowContent);

      const geocoder = new window.google.maps.Geocoder();
      const marker = new window.google.maps.Marker({ map });

      marker.addListener("click", () => {
        infowindow.open(map, marker);
      });

      autocomplete.addListener("place_changed", () => {
        infowindow.close();

        const place = autocomplete.getPlace();
        if (!place.place_id) return;

        geocoder
          .geocode({ placeId: place.place_id })
          .then(({ results }) => {
            console.log(results)
            map.setZoom(11);
            map.setCenter(results[0].geometry.location);

            marker.setPlace({
              placeId: place.place_id,
              location: results[0].geometry.location,
            });
            marker.setVisible(true);

            infowindowContent.children["place-name"].textContent = place.name;
            infowindowContent.children["place-id"].textContent = place.place_id;
            infowindowContent.children["place-address"].textContent = results[0].formatted_address;

            infowindow.open(map, marker);
          })
          .catch((e) => window.alert("Geocoder failed due to: " + e));
      });
    };

    if (window.google) {
      initMap();
    } else {
      // Add your Google Maps script loading logic here if needed
    }
  }, []);

  return (
    <>
        <div className="map-container">
        <input type="text" ref={inputRef} required/>
        <div id="map" ref={mapRef} style={{ height: "490px", width: "100%", zIndex: 1 }}>
        </div>
        <div id="infowindow-content" ref={infowindowContentRef}>
          <span id="place-name" className="title"></span><br />
          <span id="place-id"></span><br />
          <span id="place-address"></span>
        </div>
        </div>
    </>
  );
};

export default MapComponent;
