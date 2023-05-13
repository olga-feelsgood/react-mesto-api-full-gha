import React from 'react';
import failed from '../images/failed.png';
import success from '../images/success.png';

function InfoTooltip(props) {
  const isSuccess = props.isSuccess

  return (
    <div className={`popup popup_type_infotooltip ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <img className="popup__image"
          alt={isSuccess ? "success" : "failed"}
          src={isSuccess ? success : failed} />
        <h2 className="popup__text">{isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
      </div>
    </div>)
}

export default InfoTooltip;