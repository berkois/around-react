import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddCardPopup from "./AddCardPopup";
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
  const [cards, setCards] = React.useState([]);

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

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => setCards(cards))
      .catch((err) => handleErrorEvent(err));
  }, [cards]);

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

  const handleAddCard = ({ name, link }) => {
    api
      .setNewCard({ name, link })
      .then((card) => setCards([card, ...cards]))
      .catch((err) => handleErrorEvent(err));
  };

  const handleCardLike = (card, isLiked) => {
    api
      .changeLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((currentCard) => (currentCard._id === card._id ? newCard : currentCard)));
      })
      .catch((err) => handleErrorEvent(err));
  };

  const handleCardDelete = ({ _id: id }) => {
    api
      .deleteCard(id)
      .then(() => {
        const filteredCards = cards.filter((cardItem) => cardItem._id !== id);
        setCards(filteredCards);
      })
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
        <Main cards={cards} onEditProfileClick={handleEditProfileClick} onAddPlaceClick={handleAddPlaceClick} onEditAvatarClick={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onErrorEvent={handleErrorEvent} onDeleteClick={handleDeleteCardClick} />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddCardPopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard} />
        <PopupWithForm name="delete-card" title="Are you sure?" isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} textOnButton="Yes" />
        <PopupWithForm name="error" title="An error occurred." isOpen={isErrorMessagePopupOpen} onClose={closeAllPopups} textOnButton="OK" />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
