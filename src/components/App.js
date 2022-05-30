import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isErrorMessagePopupOpen, setIsErrorMessagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => setCurrentUser(userData))
      .catch((err) => handleErrorEvent(err));
  }, []);

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);

  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);

  const handleDeleteCardClick = () => setIsDeleteCardPopupOpen(true);

  const handleErrorEvent = () => setIsErrorMessagePopupOpen(true);

  const handleCardClick = (card) => setSelectedCard(card);

  const handleUpdateUser = (userData) => {
    api
      .updateUserInfo(userData)
      .then((userData) => setCurrentUser(userData))
      .catch((err) => handleErrorEvent(err));
  };

  const handleUpdateAvatar = (avatarUrl) => {
    api
      .setUserAvatar(avatarUrl)
      .then((userData) => setCurrentUser(userData))
      .catch((err) => handleErrorEvent(err));
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsErrorMessagePopupOpen(false);
    setSelectedCard(null);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main onEditProfileClick={handleEditProfileClick} onAddPlaceClick={handleAddPlaceClick} onEditAvatarClick={handleEditAvatarClick} onCardClick={handleCardClick} onErrorEvent={handleErrorEvent} onDeleteClick={handleDeleteCardClick} />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
