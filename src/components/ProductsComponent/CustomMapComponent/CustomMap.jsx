import React, { useEffect, useRef } from "react";
import { TextField } from "@mui/material";

const MapComponent = () => {
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const infowindowContentRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 13,
      });

      const input = inputRef.current;
      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        fields: ["place_id", "geometry", "name", "formatted_address"],
      });

      autocomplete.bindTo("bounds", map);
      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);

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
      <TextField
        size="small"
        fullWidth
        label="Product Name"
        required
        ref={inputRef}
        id="pac-input"
      />
      <input id="pac-input" ref={inputRef} type="text" placeholder="Search Box" />
      <div id="map" ref={mapRef} style={{ height: "400px", width: "100%" }}></div>
      <div id="infowindow-content" ref={infowindowContentRef}>
        <span id="place-name" className="title"></span><br />
        <span id="place-id"></span><br />
        <span id="place-address"></span>
      </div>
    </>
  );
};

export default MapComponent;
