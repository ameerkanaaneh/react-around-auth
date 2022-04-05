import React from "react";
import { api } from "../utils/api";
import Card from "./Card.js";

export default function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  // componentDidMount?
  React.useEffect(() => {
    // load user data
    api
      .loadUserInfo()
      .then((data) => {
        const { name, about, avatar } = data;
        setUserName(name);
        setUserAvatar(avatar);
        setUserDescription(about);
      })
      .catch((err) => console.log(err));
    // load cards
    api
      .getInitialCards()
      .then((loadedCards) => {
        setCards([...cards, ...loadedCards]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <div
            className="profile__overlay-container"
            onClick={props.onEditAvatarClick}
          >
            <img
              src={userAvatar}
              alt="profile picture"
              className="profile__image"
            />
            <div className="profile__overlay"></div>
          </div>

          <div className="profile__info">
            <div className="profile__head">
              <h1 className="profile__name">{userName}</h1>
              <button
                onClick={props.onEditProfileClick}
                type="button"
                className="profile__edit-button"
                src="./images/EditButton.png"
              ></button>
            </div>

            <p className="profile__interest">{userDescription}</p>
          </div>
        </div>

        <button
          onClick={props.onAddPlaceClick}
          type="button"
          className="profile__add-button"
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={props.onCardClick} />
        ))}
      </section>
      {props.children}
    </main>
  );
}
