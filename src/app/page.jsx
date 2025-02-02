"use client";
import styles from "./page.module.scss";
import Map, { Marker, Popup } from "react-map-gl";
import VideocamIcon from "@mui/icons-material/Videocam";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import RefResh from "@/components/refresh/RefResh";
import Link from "next/link";
import RecentActorsIcon from "@mui/icons-material/RecentActors";

export default function Home() {
  const [pins, setPins] = useState([]);
  const [type, setType] = useState("");
  const [newPlace, setNewPlace] = useState();
  const [currentPlaceId, setCurrentPlaceId] = useState("");
  const [address, setAddress] = useState("");

  const [selectedType, setSelectedType] = useState("all");
  const [filteredPins, setFilteredPins] = useState(pins);

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
    e.preventDefault();

    let title = "";
    switch (type) {
      case "ptz":
        title = "ПТЗ камера";
        break;
      case "obz":
        title = "Обзорний камера";
        break;
      case "lis":
        title = "Распознавание лиц";
        break;
      case "avto":
        title = "Распознавание авто номер";
        break;
      case "radar":
        title = "Радар";
        break;
      default:
        break;
    }

    const newPin = {
      address: address,
      title: title,
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

  useEffect(() => {
    if (selectedType === "all") {
      setFilteredPins(pins);
    } else {
      setFilteredPins(pins.filter((pin) => pin.type === selectedType));
    }
  }, [selectedType, pins]);

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
        {filteredPins.map((pin) => (
          <React.Fragment key={pin._id}>
            <Marker longitude={pin.long} latitude={pin.lat} anchor="bottom">
              <div onClick={() => handleMarkerClick(pin._id)}>
                {pin.type === "ptz" ? (
                  <img src="ptz.png" alt="" className={styles.cameraIcon} />
                ) : pin.type === "lis" ? (
                  <img src="lis.png" alt="" className={styles.cameraIcon} />
                ) : pin.type === "avto" ? (
                  <img src="avto.png" alt="" className={styles.cameraIcon} />
                ) : pin.type === "radar" ? (
                  <img src="radar.png" alt="" className={styles.cameraIcon} />
                ) : (
                  <VideocamIcon />
                )}
              </div>
            </Marker>

            {pin._id === currentPlaceId && (
              <Popup
                longitude={pin.long}
                latitude={pin.lat}
                anchor="bottom"
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className={styles.delete}>
                  <p>{pin.title}</p>
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
                <label htmlFor="">Kamera</label>
                <input
                  type="text"
                  placeholder="Obiekt"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <select onChange={(e) => setType(e.target.value)}>
                  <option value="" hidden>
                    Kamera turi
                  </option>
                  <option value="ptz">ПТЗ камера</option>
                  <option value="obz">Обзорний камера</option>
                  <option value="lis">Распознавание лиц</option>
                  <option value="avto">Распознавание авто номер</option>
                  <option value="radar">Радар</option>
                </select>
                <button>Saqlaw</button>
              </form>
            </div>
          </Popup>
        )}

        <div className={styles.top}>
          <div className={styles.left}>
            <div className={styles.all}>
              <VideocamIcon />
              <p>{filteredPins.length}</p>
            </div>

            <div className={styles.type}>
              <select
                name=""
                id=""
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">Ҳәммеси</option>
                <option value="ptz">ПТЗ камера</option>
                <option value="obz">Обзорний камера</option>
                <option value="lis">Распознавание лиц</option>
                <option value="avto">Распознавание авто номер</option>
                <option value="radar">Радар</option>
              </select>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.users}>
              <Link href="/users">
                <RecentActorsIcon />
              </Link>
            </div>
          </div>
        </div>

        <RefResh />
      </Map>
    </div>
  );
}
