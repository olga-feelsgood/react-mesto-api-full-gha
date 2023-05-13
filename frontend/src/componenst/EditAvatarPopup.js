import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup(props) {

  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value/* Значение инпута, полученное с помощью рефа */,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonTitle="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            className="popup__input popup__input_type_source"
            type="url"
            name="avatar__source"
            placeholder="Ссылка на аватар"
            autoComplete="on"
            id="avatar-input"
            required
            ref={avatarRef} />
          <span className="popup__input-error avatar-input-error" />
        </>} />
  )
}

export default EditAvatarPopup;