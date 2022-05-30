import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarUrl = React.createRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateAvatar(avatarUrl.current.value);
    avatarUrl.current.value = "";
    props.onClose();
  };

  return (
    <PopupWithForm name="edit-avatar" title="Change profile picture" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} textOnButton="Save">
      <label className="popup__field">
        <input type="url" className="popup__input popup__input_type_avatar-src" ref={avatarUrl} id="avatar-url-input" placeholder="Image link" name="avatar" required />
        <span className="popup__input-error avatar-url-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
