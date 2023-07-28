import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";

const LeafletRoutingMachine = () => {
  const map = useMap();
  const [marker1, setMarker1] = useState(null);
  const [mak, setMak] = useState({ username: "", location: [] });

  useEffect(() => {
    // L.Control.geocoder({
    // }).on("change",(e)=>{console.log(e)}).addTo(map);

    const handleMapClick = function (e) {
      console.log(e);
      if (!marker1) {
        // Birinchi marta bosganda "maker1" ni qo'shish
        const newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
        setMarker1(newMarker);
        setMak({ ...mak, location: [e.latlng.lat, e.latlng.lng] });
      } else {
        // Keyingi bosgan joyda "maker1" ni o'zgartirish
        marker1.setLatLng([e.latlng.lat, e.latlng.lng]);
      }
      if (marker1) {
        marker1.setLatLng([e.latlng.lat, e.latlng.lng]);
      }

      L.Routing.control({
        waypoints: [L.latLng(marker1?.getLatLng().lat, marker1?.getLatLng().lng)], // Manzilni "marker1" ga moslaymiz
        lineOptions: {
          styles: [
            {
              color: "#893bef",
              weight: 6,
              opacity: 0.8,
            },
          ],
        },

        routeWhileDragging: false,
        // geocoder: L.Control.Geocoder.nominatim(),
        addWaypoints: true,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
      })
        .on("routesfound", function (e) {
          // console.log(e)
          setMak({
            ...mak,
            username: e.routes[0].name,
            location: [e.routes[0].coordinates[0].lat, e.routes[0].coordinates[0].lng],
          });
        })
        .addTo(map);

      // "map.on("click")" funksiyasini o'chirib tashlash
      map.off("click", handleMapClick);
    };

    map.on("click", handleMapClick);

    return () => {
      // Komponent yopilganda "map.on("click")" ning eski tiklovini o'chirib tashlash
      map.off("click", handleMapClick);
    };
  }, [map, mak, marker1]);

  console.log(mak);
  return null;
};

export default LeafletRoutingMachine;








// import React, { useEffect, useState } from "react";
// import L, { marker } from "leaflet";
// import "leaflet-routing-machine";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import { useMap } from "react-leaflet";

// const LeafletRoutingMachine = () => {
//   const map = useMap();
//   let DefaultIcon = L.icon({
//     iconUrl: "/marche.gif",
//     iconSize: [90, 90],
//   });
//   const [mak, setMak] = useState({username:"", location:[]});
//   useEffect(() => {
//     var marker1 = L.marker([41.37274500265018, 69.31095571079989]).addTo(map);
//     map.on("click", function (e) {
//       L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

//       L.Routing.control({
//         waypoints: [
//           L.latLng(41.37274500265018, 69.31095571079989),
//           L.latLng(e.latlng.lat, e.latlng.lng),
//         ],
//         lineOptions: {
//           styles: [
//             {
//               color: "#13a05e",
//               weight: 6,
//               opacity: 0.8,
//             },
//           ],
//         },

//         routeWhileDragging: true,
//         geocoder: L.Control.Geocoder.nominatim(),
//         addWaypoints: false,
//         draggableWaypoints: true,
//         fitSelectedRoutes: false,
//         showAlternatives: false,
//       })
//         .on("routesfound", function (e) {})
//         .addTo(map);
//       setMak({...mak, location:[e.latlng.lat, e.latlng.lng]});
//     });
//   }, [map]);
//   console.log(mak);
//   return null;
// };

// export default LeafletRoutingMachine;
