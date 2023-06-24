import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import currentLocationIcon from "../images/currentLocationIcon.svg";
import "../css/dashboardPage.css";

const Star = ({ fill, onClick }) => {
  return (
    <label className="star" onClick={onClick}>
      <svg
        width="58"
        height="58"
        viewBox="0 0 24 24"
        fill={fill ? "#393939" : "none"}
        stroke="#393939"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    </label>
  );
};

const Rating = () => {
  const [rating, setRating] = useState(0);
  let n = 5;
  var stars = [];
  for (let i = 0; i < n; i++) {
    stars.push(
      <Star
        key={i}
        fill={i < rating ? true : false}
        onClick={() => {
          setRating(i + 1);
        }}
      />
    );
  }
  return <div style={{ display: "flex", marginTop: "20px" }}>{stars}</div>;
};

const FeedbackModal = ({ show, onClose }) => {
  return (
    <Popup open={show} onClose={onClose} modal nested>
      {(close) => (
        <div
          className="modal"
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0px",
            padding: "10px",
            alignItems: "center",
            backgroundColor: "#fdfd96",
          }}
        >
          <div className="header" style={{ fontSize: "20px" }}>
            Modal Title
          </div>
          <div
            className="content"
            style={{
              marginTop: "10px",
            }}
          >
            You have completed your ride!
          </div>
          <div>Please rate us</div>
          <Rating />
          <input style={{marginTop: "20px", width: "300px"}}></input>
          <div className="actions" style={{marginTop: "20px"}}>
            <button className="button" onClick={() => close()}>
              Submit
            </button>
            <button
              className="button"
              onClick={() => close()}
              style={{
                marginTop: "10px",
                marginLeft: "10px",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

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
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const myCurrentLocation = async () => {
    var pickUpLocationInput = document.querySelector("#pickUpLocation");
    pickUpLocationInput.value = "";
    navigator.geolocation.getCurrentPosition(
      (position) =>
        setPickUpLocation({
          set: true,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
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
          {rideOptions.map((option) => {
            return (
              <div
                className="dashboard-ride-options"
                onClick={() => setShowFeedbackModal(true)}
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
      <FeedbackModal
        show={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
      />
    </div>
  );
};

export default DashboardPage;
