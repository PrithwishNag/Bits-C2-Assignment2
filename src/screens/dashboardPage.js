import { useState } from "react";
import "reactjs-popup/dist/index.css";
import currentLocationIcon from "../images/currentLocationIcon.svg";
import { useNavigate } from "react-router-dom";
import "../css/dashboardPage.css";

const DashboardPage = () => {
  const [pickUpLocation, setPickUpLocation] = useState({
    set: false,
    latitude: null,
    longitude: null,
  });
  const [dropOffLocation, setDropOffLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [rideOptions, setRideOptions] = useState([]);
  const [showRideOptions, setShowRideOptions] = useState(false);
  const navigate = useNavigate();

  const myCurrentLocation = async () => {
    var pickUpLocationInput = document.querySelector("#pickUpLocation");
    pickUpLocationInput.value = "";
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPickUpLocation({
          set: true,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log(
          "Your location coordinates: \nLatitude:",
          position.coords.latitude, "\nLongitude",
          position.coords.longitude
        );
      },
      (err) => console.log(err)
    );
  };

  const getAddressFromCoordinates = (longitude, latitude) => {
    // Assumption: this method is a backend functionality, hardcoded
    // Conversion of address to coordinates is hardcoded but
    // longitude and latitude is fetched from the your curreent location
    return "21st Cross, 2nd Stage, Doddanna Industrial Area, Near Police Station, Bengaluru, Karnataka";
  };

  const getCoordinatesFromAddress = (address) => {
    // Assumption: this method is a backeend functionality, hardcoded
    if (address.length === 0) {
      return {
        longitude: null,
        latitude: null,
      };
    }
    return {
      longitude: 34.64666420059284,
      latitude: 23.005967580741434,
    };
  };

  const getRideOptions = (pickUp, dropoff) => {
    // Assumption: this data will come from backend
    var data = require("../json/rideOptions.json");
    return data;
  };

  const isEmpty = (x) => {
    if (x === null || x.length === 0) return true;
    return false;
  };

  return (
    <div className="container">
      <h1>RIDESHARE</h1>
      <div className="dashboard-search-block" style={{ marginBottom: "15px" }}>
        <div>Search for your ride</div>
        <div style={{ display: "flex", marginLeft: "47px" }}>
          <input
            id="pickUpLocation"
            style={{ width: "300px" }}
            placeholder={
              pickUpLocation.set
                ? getAddressFromCoordinates(
                    pickUpLocation.longitude,
                    pickUpLocation.latitude
                  )
                : "Pickup location"
            }
            onChange={(e) => {
              setPickUpLocation(getCoordinatesFromAddress(e.target.value));
            }}
          ></input>
          <img
            style={{ marginLeft: "15px" }}
            src={currentLocationIcon}
            width="30px"
            onClick={myCurrentLocation}
          ></img>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              border: "1px solid black",
              borderRadius: "25%",
            }}
          ></div>
          <div
            style={{
              width: "1px",
              height: "70px",
              backgroundColor: "black",
            }}
          ></div>
          <div
            style={{
              width: "20px",
              height: "20px",
              border: "1px solid black",
              borderRadius: "50%",
            }}
          ></div>
        </div>
        <input
          style={{ width: "300px" }}
          placeholder="Dropoff location"
          onChange={(e) => {
            setDropOffLocation(getCoordinatesFromAddress(e.target.value));
          }}
        ></input>
        <button
          onClick={() => {
            if (
              isEmpty(pickUpLocation.longitude) ||
              isEmpty(dropOffLocation.longitude)
            ) {
              alert("Enter both pickup and dropoff location before proceeding");
              return;
            }
            console.log(
              "Pick Up Coordinates: " +
                [pickUpLocation.longitude, pickUpLocation.latitude]
            );
            console.log(
              "Drop Off Coordinates: " +
                [dropOffLocation.longitude, dropOffLocation.latitude]
            );
            setShowRideOptions(true);
            setRideOptions(getRideOptions(pickUpLocation, dropOffLocation));
          }}
        >
          Search
        </button>
      </div>
      {showRideOptions ? (
        <div className="container">
          <div className="horizontal-line" style={{ width: "200%" }}></div>
          <div style={{ marginTop: "30px", marginBottom: "10px" }}>
            Choose from the below ride options
          </div>
          {rideOptions.map((option, key) => {
            return (
              <div
                key={key}
                className="dashboard-ride-options"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to confirm this ride options?"
                    )
                  ) {
                    navigate("/rideStatus", { state: { id: option.id } });
                  }
                }}
              >
                <div className="dashboard-ride-option">
                  {option.eta}
                  <div style={{ fontSize: "12px" }}>mins</div>
                </div>
                <div className="dashboard-ride-option">
                  <div style={{ fontSize: "12px" }}>Rs.</div>
                  {option.price}
                </div>
                <div className="dashboard-ride-option">
                  {option.drivers}
                  <div style={{ fontSize: "12px" }}>drivers</div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default DashboardPage;
