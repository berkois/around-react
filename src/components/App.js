import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isErrorMessagePopupOpen, setIsErrorMessagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);

  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);

  const handleDeleteCardClick = () => setIsDeleteCardPopupOpen(true);

  const handleErrorEvent = () => setIsErrorMessagePopupOpen(true);

  const handleCardClick = (card) => setSelectedCard(card);

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsErrorMessagePopupOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="page">
      <Header />
      <Main onEditProfileClick={handleEditProfileClick} onAddPlaceClick={handleAddPlaceClick} onEditAvatarClick={handleEditAvatarClick} onCardClick={handleCardClick} onErrorEvent={handleErrorEvent} onDeleteClick={handleDeleteCardClick} />
      <Footer />
      <PopupWithForm name="edit-profile" title="Edit profile" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} textOnButton="Save">
        <label className="popup__field">
          <input type="text" className="popup__input popup__input_type_name" id="name-input" name="name" minLength="2" maxLength="40" required />
          <span className="popup__input-error name-input-error"></span>
        </label>
        <label className="popup__field">
          <input type="text" className="popup__input popup__input_type_job" id="title-input" name="about" minLength="2" maxLength="200" required />
          <span className="popup__input-error title-input-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm name="edit-avatar" title="Change profile picture" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} textOnButton="Save">
        <label className="popup__field">
          <input type="url" className="popup__input popup__input_type_avatar-src" id="avatar-url-input" placeholder="Image link" name="avatar" required />
          <span className="popup__input-error avatar-url-input-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm name="add-card" title="New place" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} textOnButton="Create">
        <label className="popup__field">
          <input type="text" className="popup__input popup__input_type_place" id="place-input" placeholder="Title" name="name" minLength="1" maxLength="30" required />
          <span className="popup__input-error place-input-error"></span>
        </label>
        <label className="popup__field">
          <input type="url" className="popup__input popup__input_type_img-src" id="image-url-input" placeholder="Image link" name="link" required />
          <span className="popup__input-error image-url-input-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm name="delete-card" title="Are you sure?" isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} textOnButton="Yes" />
      <PopupWithForm name="error" title="An error occurred." isOpen={isErrorMessagePopupOpen} onClose={closeAllPopups} textOnButton="OK" />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
