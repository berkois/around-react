import React from "react";

function PopupWithForm(props) {
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close-button button" type="button" aria-label="close-button" onClick={props.onClose}></button>
        <h2 className="popup__header">{props.title}</h2>
        <form className={`popup__form popup__form_type_${props.name}`} name={props.name} formNoValidate>
          {props.children}
          <button type="submit" className="button popup__save-button" value="Save">
            {props.textOnButton}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
