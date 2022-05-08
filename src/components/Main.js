import React from "react";
import avatarIcon from "../images/edit_icon.svg";
import api from "../utils/api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, getCards] = React.useState([]);
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        getCards(cards);
      })
      .catch((err) => props.onErrorEvent(err));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div id="profile-avatar" className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }}>
          <div className="profile__avatar-cover">
            <img id="edit-avatar-icon" className="profile__avatar-edit" src={avatarIcon} alt="Edit icon that covers the user's profile avatar" onClick={props.onEditAvatarClick} />
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__name-line">
            <h1 className="profile__name">{userName}</h1>
            <button className="button profile__edit-button" type="button" aria-label="edit-button" onClick={props.onEditProfileClick}></button>
          </div>
          <p className="profile__title">{userDescription}</p>
        </div>
        <button className="button profile__add-button" type="button" aria-label="add-button" onClick={props.onAddPlaceClick}></button>
      </section>
      <section className="photos-grid">
        <ul className="photos-grid__list">
          {cards.map((card) => {
            return <Card key={card.id} card={card} onCardClick={props.onCardClick} />;
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
