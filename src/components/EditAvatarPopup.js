import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;
  const avatarUrl = React.createRef();

  const hundleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(avatarUrl.current.value);
    avatarUrl.current.value = "";
    onClose();
  };

  return (
    <PopupWithForm name="edit-avatar" title="Change profile picture" isOpen={isOpen} onClose={onClose} onSubmit={hundleSubmit} textOnButton="Save">
      <label className="popup__field">
        <input type="url" className="popup__input popup__input_type_avatar-src" ref={avatarUrl} id="avatar-url-input" placeholder="Image link" name="avatar" required />
        <span className="popup__input-error avatar-url-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
