"use client";
import styles from "./page.module.css";
import Map, { Marker, Popup } from "react-map-gl";
import VideocamIcon from "@mui/icons-material/Videocam";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [pins, setPins] = useState([]);
  const [type, setType] = useState("");
  const [newPlace, setNewPlace] = useState();
  const [currentPlaceId, setCurrentPlaceId] = useState("");

  const handleAddClick = (e) => {
    const { lng, lat } = e.lngLat;
    setNewPlace({
      lat: lat,
      long: lng,
    });
  };

  useEffect(() => {
    const fetchPins = async () => {
      await axios
        .get("https://ibbapi.onrender.com/pins")
        .then((res) => {
          setPins(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchPins();
  }, []);

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
    console.log(id);
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`https://ibbapi.onrender.com/${id}`)
      .then((res) => {
        console.log(res.data);
        setPins(pins.filter((pin) => pin._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    const newPin = {
      type: type,
      long: newPlace.long,
      lat: newPlace.lat,
    };

    await axios
      .post("https://ibbapi.onrender.com/pins", newPin)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.home}>
      <Map
        mapboxAccessToken="pk.eyJ1IjoieGFiaWJ1bGxheWV2IiwiYSI6ImNtNm1sbXUwdTBmMmwycXM1YzF0dmYzbTAifQ.GpEPOgFdwsMfQ7Bi607zwA"
        initialViewState={{
          longitude: 59.60931980793001,
          latitude: 42.46222863340943,
          zoom: 10,
          doubleClickZoom: false,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onDblClick={handleAddClick}
      >
        {pins.map((pin) => (
          <React.Fragment key={pin._id}>
            <Marker longitude={pin.long} latitude={pin.lat} anchor="bottom">
              <div onClick={() => handleMarkerClick(pin._id)}>
                <VideocamIcon />
              </div>
            </Marker>

            {pin._id === currentPlaceId && (
              <Popup
                longitude={pin.long}
                latitude={pin.lat}
                anchor="bottom"
                closeOnClick={false}
                style={{ width: "200px" }}
              >
                <div className={styles.card}>
                  <p>{pin.type}</p>
                  <button onClick={() => handleDelete(pin._id)}>Oshiriw</button>
                </div>
              </Popup>
            )}
          </React.Fragment>
        ))}
        {newPlace && (
          <Popup
            longitude={newPlace.long}
            latitude={newPlace.lat}
            anchor="bottom"
            onClose={() => setNewPlace(null)}
          >
            <div className={styles.card}>
              <form onSubmit={handleSubmit}>
                <select onChange={(e) => setType(e.target.value)}>
                  <option value="" hidden>
                    Camera turi
                  </option>
                  <option value="hikvision">Hikvision</option>
                  <option value="skat">Skat</option>
                  <option value="lachin">Lachin</option>
                </select>
                <button>Saqlaw</button>
              </form>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
