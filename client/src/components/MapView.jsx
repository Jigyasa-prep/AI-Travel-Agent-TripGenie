import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapView({ destination }) {

  const [position, setPosition] = useState(null);


  useEffect(() => {

    const getLocation = async () => {

      try {

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${destination}`
        );


        const data = await response.json();


        console.log("Map Location:", data);


        if(data.length > 0){

          setPosition([
            Number(data[0].lat),
            Number(data[0].lon)
          ]);

        }


      } catch(error){

        console.log("Map Error:", error);

      }

    };


    getLocation();


  }, [destination]);



  if(!position){

    return (

      <div className="bg-white rounded-3xl shadow-xl p-6 mb-10 text-center">

        Loading Map...

      </div>

    );

  }



  return (

    <div className="bg-white rounded-3xl shadow-xl p-6 mb-10">


      <h2 className="text-3xl font-bold text-blue-700 mb-5">

        🗺️ Trip Map

      </h2>


      <MapContainer

        center={position}

        zoom={12}

        style={{
          height:"400px",
          width:"100%"
        }}

      >


        <TileLayer

          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"

        />


        <Marker position={position}>

          <Popup>

            {destination}

          </Popup>

        </Marker>


      </MapContainer>


    </div>

  );

}


export default MapView;