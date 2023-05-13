import React from 'react';


function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <h2 className="popup__heading">{props.title}</h2>
        <form className="popup__form popup__profile-editing" name={props.name} onSubmit={props.onSubmit}>
          {props.children}
          <button className="popup__save-button" type="submit">{props.buttonTitle}</button>
        </form>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
      </div>
    </div>)
}

export default PopupWithForm;