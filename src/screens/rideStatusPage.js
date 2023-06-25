import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import mapImg from "../images/map.jpg";
import FeedbackModal from "../utils/feedbackModal";

const Map = ({ style }) => {
  return (
    <img src={mapImg} alt="Ride status (Map)" width="600px" style={style}></img>
  );
};

const RideStatus = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const getDriver = (rideOptionId) => {
    // Assumption: this is a backend feature
    if (rideOptionId === "1") return "Harrison Marquez";
    if (rideOptionId === "2") return null;
    if (rideOptionId === "3") return "Bernardo Barrera";
    if (rideOptionId === "4") return "Matthew Park";
  };

  const driver = getDriver(location.state.id);

  return (
    <div className="container">
      <h1>RIDESHARE</h1>
      {driver == null ? (
        <div className="container">
          <div>No drivers found for the selected ride option</div>
          <div style={{ marginTop: "10px" }}>Please select other ride option</div>
          <button
            style={{ marginTop: "30px" }}
            onClick={() => navigate("/dashboard")}
          >
            Go Back
          </button>
        </div>
      ) : (
        <div className="container">
          <div>
            Your driver is <span style={{ fontSize: "20px" }}>{driver}</span>
          </div>
          <div style={{ marginTop: "6px", fontSize: "13px" }}>
            Arriving at your pickup location soon
          </div>
          <Map style={{ marginTop: "30px" }} />
          <button
            style={{ marginTop: "30px" }}
            onClick={() => {
              if (window.confirm("Are you sure you want to cancel ride?")) {
                navigate("/dashboard");
              }
            }}
          >
            Cancel Ride
          </button>
          <button
            style={{ marginTop: "30px", width: "120px" }}
            onClick={() => setShowFeedbackModal(true)}
          >
            Complete Ride
          </button>
          <FeedbackModal
            show={showFeedbackModal}
            onClose={() => setShowFeedbackModal(false)}
          />
        </div>
      )}
    </div>
  );
};

export default RideStatus;
