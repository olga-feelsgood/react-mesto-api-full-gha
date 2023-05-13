import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRoute from './ProtectedRoute.js';
import { registerNewUser, loginUser, getContent } from '../utils/Auth.js'

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isInfotoolTipOpen, setInfotoolTipOpen] = useState(false);
  const [isSuccessInfotoolTip, setSuccessInfotoolTip] = useState(true);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, [])

  useEffect(() => {
     loggedIn && 
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData)
      })
      .catch((err) => { console.log(err) })
  }, [loggedIn])

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
    setImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setInfotoolTipOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {

        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => { console.log(err) })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => { if (!(c._id === card._id)) { return c } })
        )
      })
      .catch((err) => { console.log(err) })
  }

  function handleUpdateUser({ name, about }) {
    api.setUserInfo({ name, about })
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => { console.log(err) })
  }

  function handleUpdateAvatar({ avatar }) {
    api.updateProfileAvatar({ avatar })
      .then((newavatar) => {
        setCurrentUser(newavatar);
        closeAllPopups();
      })
      .catch((err) => { console.log(err) })
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.createCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => { console.log(err) })
  }

  function handleRegisterUser({ email, password }) {
    registerNewUser({ email, password })
      .then(() => {
        handleSuccessInfotoolTipOpen();
        navigate('/sign-in', { replace: true })
      })
      .catch((err) => {
        handleFailInfotoolTipOpen();
        console.log(err)
      })
  }

  function handleLoginUser({ email, password }) {
    loginUser({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          setUserEmail(email);
            
          navigate('/', { replace: true })
        }
      })
      .catch((err) => {
        handleFailInfotoolTipOpen();
        console.log(err)
      })
  }

  function checkToken() {
    const token = localStorage.getItem('token')
    if (token) {
      getContent(token)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          navigate("/", { replace: true })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  function signOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserEmail('');
    navigate("/sign-in");
  }

  function handleSuccessInfotoolTipOpen() {
    setInfotoolTipOpen(true);
    setSuccessInfotoolTip(true);
  }

  function handleFailInfotoolTipOpen() {
    setInfotoolTipOpen(true);
    setSuccessInfotoolTip(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={userEmail} onSignOut={signOut} />
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute
              path="/"
              loggedIn={loggedIn}
              element={
                Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />} />
          <Route path="/sign-up" element={<Register onRegisterUser={handleRegisterUser} />} />
          {/* <Route path="/sign-up" element={<InfoTooltip isOpen={'true'} isSuccess={false}/>} /> */}
          <Route path="/sign-in" element={<Login onLoginUser={handleLoginUser} />} />
        </Routes>
        <InfoTooltip
          isOpen={isInfotoolTipOpen}
          isSuccess={isSuccessInfotoolTip}
          onClose={closeAllPopups} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen} />
        <Footer />
      </div>
    </CurrentUserContext.Provider>)
}

export default App;