import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
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
    api.loadUserInfo().then((data) => {
      const { name, about, avatar } = data;
      setUserName(name);
      setUserAvatar(avatar);
      setUserDescription(about);
    });
    // load cards
    api.getInitialCards().then((loadedCards) => {
      setCards([...cards, ...loadedCards]);
    });
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

      <PopupWithForm
        isOpen={props.isEditProfilePopupOpen}
        handleCloseClick={props.onClose}
        title="Edit profile"
        name="profile"
      >
        <input
          className="popup__input popup__input_type_name"
          type="text"
          id="name-input"
          name="name"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="name-input-error popup__input-error"></span>

        <input
          className="popup__input popup__input_type_hobby"
          type="text"
          id="hobby-input"
          name="hobby"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="hobby-input-error popup__input-error"></span>

        <input className="popup__button" type="submit" value="Save" />
      </PopupWithForm>

      <PopupWithForm
        isOpen={props.isAddPlacePopupOpen}
        handleCloseClick={props.onClose}
        title="New place"
        name="card"
      >
        <input
          className="popup__input popup__input_type_title"
          placeholder="Title"
          type="text"
          id="title-input"
          required
          name="title"
          minLength="1"
          maxLength="30"
        />
        <span className="title-input-error popup__input-error"></span>

        <input
          placeholder="Image link"
          className="popup__input popup__input_type_link"
          type="url"
          id="image-link-input"
          required
          name="image_link"
        />
        <span className="image-link-input-error popup__input-error"></span>

        <input className="popup__button" type="submit" value="Create" />
      </PopupWithForm>

      <PopupWithForm title="Are you sure?" name="confirm" modifier="confirm">
        <input
          className="popup__button popup__button_confirm"
          type="submit"
          value="Yes"
        />
      </PopupWithForm>

      <PopupWithForm
        isOpen={props.isEditAvatarPopupOpen}
        handleCloseClick={props.onClose}
        title="Change profile picture"
        name="avatar"
      >
        <input
          className="popup__input popup__input_type_url"
          placeholder="profile image link"
          type="url"
          id="url-input"
          required
          name="url"
        />
        <span className="url-input-error popup__input-error"></span>
        <input className="popup__button" type="submit" value="Save" />
      </PopupWithForm>
      <ImagePopup onClose={props.onClose} card={props.selectedCard} />
    </main>
  );
}
