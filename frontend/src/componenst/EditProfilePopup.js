import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';


function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  function handleNameInputChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionInputChange(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    setName(currentUser.name ||'');
    setDescription(currentUser.about ||'')
  }, [currentUser])

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            className="popup__input popup__input_type_name"
            type="text"
            name="name"
            //            defaultValue="Жак-Ив Кусто"
            autoComplete="off"
            placeholder="Имя профиля"
            id="name-input"
            required
            minLength="2"
            maxLength="40"
            value={name}
            onChange={handleNameInputChange} />
          <span className="popup__input-error name-input-error" />
          <input
            className="popup__input popup__input_type_description"
            type="text"
            name="about"
            //            defaultValue="Исследователь океана"
            autoComplete="off"
            placeholder="Описание профиля"
            id="description-input"
            required
            minLength="2"
            maxLength="200"
            value={description}
            onChange={handleDescriptionInputChange} />
          <span className="popup__input-error description-input-error" />
        </>} />
  )
}

export default EditProfilePopup;