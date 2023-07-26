import React, { useEffect, useState } from "react";
import L, { marker } from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";

const LeafletRoutingMachine = () => {
  const map = useMap();
  let DefaultIcon = L.icon({
    iconUrl: "/marche.gif",
    iconSize: [90, 90],
  });
  const [mak, setMak] = useState({username:"", location:[]});
  useEffect(() => {
    var marker1 = L.marker([41.37274500265018, 69.31095571079989]).addTo(map);
    map.on("click", function (e) {
      L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

      L.Routing.control({
        waypoints: [
          L.latLng(41.37274500265018, 69.31095571079989),
          L.latLng(e.latlng.lat, e.latlng.lng),
        ],
        lineOptions: {
          styles: [
            {
              color: "#13a05e",
              weight: 6,
              opacity: 0.8,
            },
          ],
        },

        routeWhileDragging: true,
        geocoder: L.Control.Geocoder.nominatim(),
        addWaypoints: false,
        draggableWaypoints: true,
        fitSelectedRoutes: false,
        showAlternatives: false,
      })
        .on("routesfound", function (e) {})
        .addTo(map);
      setMak({...mak, location:[e.latlng.lat, e.latlng.lng]});
    });
  }, [map]);
  console.log(mak);
  return null;
};

export default LeafletRoutingMachine;
