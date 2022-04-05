import React from "react";

import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatarClick={handleEditAvatarClick}
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onCardClick={handleCardClick}
      >
        <PopupWithForm
          isOpen={isEditProfilePopupOpen}
          handleCloseClick={closeAllPopups}
          title="Edit profile"
          name="profile"
          buttonText="Save"
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
        </PopupWithForm>

        <PopupWithForm
          isOpen={isAddPlacePopupOpen}
          handleCloseClick={closeAllPopups}
          title="New place"
          name="card"
          buttonText="Create"
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
        </PopupWithForm>

        <PopupWithForm
          title="Are you sure?"
          name="confirm"
          modifier="confirm"
          buttonText="Save"
        >
          <input
            className="popup__button popup__button_confirm"
            type="submit"
            value="Yes"
          />
        </PopupWithForm>

        <PopupWithForm
          isOpen={isEditAvatarPopupOpen}
          handleCloseClick={closeAllPopups}
          title="Change profile picture"
          name="avatar"
          buttonText="Save"
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
        </PopupWithForm>
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      </Main>
      <Footer />
    </div>
  );
}

export default App;
