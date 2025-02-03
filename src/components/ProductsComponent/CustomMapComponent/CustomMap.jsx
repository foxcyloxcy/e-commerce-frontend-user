import React, { useEffect, useRef } from "react";
import './CustomMap.css'

const CustomMap = (props) => {
  const { addressData, mapDataValue, Editing, modalIsOpen } = props;
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const infowindowContentRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 25.2048, lng: 55.2708 },
        zoom: 13,
        disableDefaultUI: true,
        mapId: '1947e6c6df289e5e'
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
      markerRef.current = marker;

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
            results.push({'name': place.name});
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
            addressData(results);
          })
          .catch((e) => window.alert("Geocoder failed due to: " + e));
      });

      if (mapDataValue) {
        map.setCenter(mapDataValue[0].geometry.location);

        marker.setPlace({
          placeId: mapDataValue[0].place_id,
          location: mapDataValue[0].geometry.location,
        });

        marker.setVisible(true);

        infowindowContent.children["place-name"].textContent = mapDataValue[1].name;
        infowindowContent.children["place-id"].textContent = mapDataValue[0].place_id;
        infowindowContent.children["place-address"].textContent = mapDataValue[0].formatted_address;

        infowindow.open(map, marker);
      }

      mapInstance.current = map;
    };

    if (window.google) {
      initMap();
    }
  }, [mapDataValue]);

  useEffect(() => {
    if (modalIsOpen && mapInstance.current) {
      // Small timeout to ensure the modal is fully visible
      setTimeout(() => {
        window.google.maps.event.trigger(mapInstance.current, "resize");

        // Re-center the map after resize
        if (mapDataValue) {
          mapInstance.current.setCenter(mapDataValue[0].geometry.location);
        } else {
          mapInstance.current.setCenter({ lat: 25.2048, lng: 55.2708 });
        }

        if (markerRef.current && mapDataValue) {
          markerRef.current.setPlace({
            placeId: mapDataValue[0].place_id,
            location: mapDataValue[0].geometry.location,
          });
          markerRef.current.setVisible(true);
        }
      }, 300); // Delay to allow the modal to fully open before resizing the map
    }
  }, [modalIsOpen, mapDataValue]);

  return (
    <>
      <div className="map-container">
        <input 
          type="text" 
          ref={inputRef} 
          style={{ 
            height: "40px", 
            width: "100%", 
            zIndex: 1, 
            display: Editing ? "block" : "none" 
          }}
        />
        <div id="map" ref={mapRef} style={{ height: "490px", width: "100%", zIndex: 1 }} />
        <div id="infowindow-content" ref={infowindowContentRef}>
          <span id="place-name" className="title"></span><br />
          <span id="place-id"></span><br />
          <span id="place-address"></span>
        </div>
      </div>
    </>
  );
};

export default CustomMap;
