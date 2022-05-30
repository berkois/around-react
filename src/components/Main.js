import React, { useContext } from "react";
import avatarIcon from "../images/edit_icon.svg";
import api from "../utils/api";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
  const [cards, setCards] = React.useState([]);
  const currentUser = useContext(CurrentUserContext);
  const handleCardLike = (card, isLiked) => {
    api
      .changeLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((currentCard) => (currentCard._id === card._id ? newCard : currentCard)));
      })
      .catch((err) => props.onErrorEvent(err));
  };
  const handleCardDelete = ({ _id: id }) => {
    api
      .deleteCard(id)
      .then(() => {
        const filteredCards = cards.filter((cardItem) => cardItem._id !== id);
        setCards(filteredCards);
      })
      .catch((err) => props.onErrorEvent(err));
  };

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => setCards(cards))
      .catch((err) => props.onErrorEvent(err));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div id="profile-avatar" className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
          <div className="profile__avatar-cover">
            <img id="edit-avatar-icon" className="profile__avatar-edit" src={avatarIcon} alt="Edit icon that covers the user's profile avatar" onClick={props.onEditAvatarClick} />
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__name-line">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="button profile__edit-button" type="button" aria-label="edit-button" onClick={props.onEditProfileClick}></button>
          </div>
          <p className="profile__title">{currentUser.about}</p>
        </div>
        <button className="button profile__add-button" type="button" aria-label="add-button" onClick={props.onAddPlaceClick}></button>
      </section>
      <section className="photos-grid">
        <ul className="photos-grid__list">
          {cards.map((card) => {
            return <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />;
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
