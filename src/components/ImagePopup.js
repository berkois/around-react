import React from "react";

function ImagePopup(props) {
  return (
    <section className={`picture-popup popup ${props.card ? "popup_opened" : ""}`}>
      <div className="picture-popup__popup-container">
        <img className="picture-popup__popup-image" src={props.card ? props.card.link : ""} alt={props.card?.name} />
        <button className="popup__close-button button" type="button" aria-label="close-button" onClick={props.onClose}></button>
        <p className="picture-popup__popup-text">{props.card ? props.card.name : ""}</p>
      </div>
    </section>
  );
}

export default ImagePopup;
