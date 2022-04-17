import React from "react";

import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";
import CurrentUserContext from "./../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

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

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

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

  React.useEffect(() => {
    api
      .loadUserInfo()
      .then((data) => setCurrentUser(data))
      .catch((err) => console.log(err));
  }, []);

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

  function handleUpdateUser({ name, about }) {
    api.editProfileData(name, about).then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    });
  }

  function handleUpdateAvatar({ avatar }) {
    api.changeProfileAvatar(avatar).then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    });
  }

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

  function handleAddPlaceSubmit({ title, url }) {
    api.addNewCard(title, url).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatarClick={handleEditAvatarClick}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        >
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
          />

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

          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
          />
          <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        </Main>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
