import React, { useState} from 'react';
import PopupWithForm from './PopupWithForm';


function AddPlacePopup(props) {

  const [placeName, setPlaceName] = useState('')
  const [placeSource, setPlaceSource] = useState('')

  function handlePlaceNameInputChange(e) {
    setPlaceName(e.target.value);
  }

  function handlePlaceSourceInputChange(e) {
    setPlaceSource(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name: placeName,
      link: placeSource
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonTitle="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            className="popup__input popup__input_type_place"
            type="text"
            name="place__name"
            placeholder="Название"
            autoComplete="on"
            id="place-input"
            required
            minLength="2"
            maxLength="30"
            value={placeName}
            onChange={handlePlaceNameInputChange} />
          <span className="popup__input-error place-input-error" />
          <input
            className="popup__input popup__input_type_source"
            type="url"
            name="place__source"
            placeholder="Ссылка на картинку"
            autoComplete="on"
            id="url-input"
            required
            value={placeSource}
            onChange={handlePlaceSourceInputChange} />
          <span className="popup__input-error url-input-error" />
        </>} />
  )
}

export default AddPlacePopup;