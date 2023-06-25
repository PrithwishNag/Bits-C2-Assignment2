import Popup from "reactjs-popup";
import { useState } from "react";

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

const Rating = ({ rating, setRating }) => {
  let n = 5;
  var stars = [];
  for (let i = 0; i < n; i++) {
    stars.push(
      <Star
        key={i}
        fill={rating === null ? false : i < rating ? true : false}
        onClick={() => {
          setRating(i + 1);
        }}
      />
    );
  }
  return <div style={{ display: "flex", marginTop: "20px" }}>{stars}</div>;
};

const FeedbackModal = ({ show, onClose }) => {
  const [rating, setRating] = useState(null);
  return (
    <>
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
              Feedback
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
            <Rating rating={rating} setRating={setRating} />
            <input style={{ marginTop: "20px", width: "300px" }}></input>
            <div className="actions" style={{ marginTop: "20px" }}>
              <button
                className="button"
                onClick={() => {
                  if (rating !== null)
                    alert("THANK YOU!\nYour feedback has been submitted");
                  close();
                }}
              >
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
    </>
  );
};

export default FeedbackModal;