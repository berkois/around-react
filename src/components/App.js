import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ErrorMessagePopup from './ErrorMessagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {
  // declaring state hooks
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isErrorMessagePopupOpen, setIsErrorMessagePopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isFormOnLoadingState, setIsFormOnLoadingState] = React.useState(false);
  // const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);

  // declaring handlers
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleErrorEvent = () => setIsErrorMessagePopupOpen(true);
  const handleCardClick = (card) => setSelectedCard(card);
  // const handleDeleteCardClick = () => setIsDeleteCardPopupOpen(true);

  const handleUpdateUser = (userData) => {
    setIsFormOnLoadingState(true);
    api
      .updateUserInfo(userData)
      .then((userData) => setCurrentUser(userData))
      .then(() => closeAllPopups())
      .catch((err) => handleErrorEvent(err));
  };

  const handleUpdateAvatar = (avatarUrl) => {
    setIsFormOnLoadingState(true);
    api
      .setUserAvatar(avatarUrl)
      .then((userData) => setCurrentUser(userData))
      .then(() => closeAllPopups())
      .catch((err) => handleErrorEvent(err));
  };

  const handleAddCard = ({ name, link }) => {
    setIsFormOnLoadingState(true);
    api
      .setNewCard({ name, link })
      .then((card) => setCards([card, ...cards]))
      .then(() => closeAllPopups())
      .catch((err) => handleErrorEvent(err));
  };

  const handleCardLike = (card, isLiked) => {
    api
      .changeLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
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
    setIsFormOnLoadingState(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsErrorMessagePopupOpen(false);
    setSelectedCard(null);
    // setIsDeleteCardPopupOpen(false);
  };

  // declaring effects
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => setCurrentUser(userData))
      .catch((err) => handleErrorEvent(err));
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => setCards(cards))
      .catch((err) => handleErrorEvent(err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        <Main
          cards={cards}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onErrorEvent={handleErrorEvent}
          // onDeleteClick={handleDeleteCardClick}
        />
        <Footer />
        <EditProfilePopup
          isLoading={isFormOnLoadingState}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isLoading={isFormOnLoadingState}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isLoading={isFormOnLoadingState}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCard}
        />
        {/* <PopupWithForm
          name='delete-card'
          title='Are you sure?'
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          textOnButton='Yes'
        /> */}
        <ErrorMessagePopup
          isOpen={isErrorMessagePopupOpen}
          onClose={closeAllPopups}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
