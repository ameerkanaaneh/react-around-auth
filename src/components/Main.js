import React from "react";
import { api } from "../utils/api";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Main(props) {
  const [cards, setCards] = React.useState([]);
  const currentUser = React.useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    isLiked
      ? api
          .unlikeCard(card._id)
          .then((newCard) =>
            setCards((state) =>
              state.map((currentCard) =>
                currentCard._id === card._id ? newCard : currentCard
              )
            )
          )
      : api
          .likeCard(card._id)
          .then((newCard) =>
            setCards((state) =>
              state.map((currentCard) =>
                currentCard._id === card._id ? newCard : currentCard
              )
            )
          );
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) =>
        state.filter((currentCard) => currentCard._id !== card._id)
      );
    });
  }

  // componentDidMount?
  React.useEffect(() => {
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
              src={avatar}
              alt="profile picture"
              className="profile__image"
            />
            <div className="profile__overlay"></div>
          </div>

          <div className="profile__info">
            <div className="profile__head">
              <h1 className="profile__name">{name}</h1>
              <button
                onClick={props.onEditProfileClick}
                type="button"
                className="profile__edit-button"
                src="./images/EditButton.png"
              ></button>
            </div>

            <p className="profile__interest">{about}</p>
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
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        ))}
      </section>
      {props.children}
    </main>
  );
}
