import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import LeafletGeocoder from "src/components/branchMap/LeafletGeocoder";
import LeafletRoutingMachine from "src/components/branchMap/LeafletRoutingMachine";

const Page = () => {
  const position = [41.37274500265018, 69.31095571079989];

  return (
    <>
      <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="mapC">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/*  <LeafletGeocoder /> */}
        <LeafletRoutingMachine />
      </MapContainer>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
