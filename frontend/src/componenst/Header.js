import React from 'react';
import logoMesto from '../images/header_logo.svg';
import { Routes, Route, Link } from 'react-router-dom';

function Header(props) {

  // const location = useLocation();

  return (
    <header className="header">
      <a className="header__logo" href="#"><img className="header__logo-image" src={logoMesto}
        alt="Лого Место" /></a>
      <Routes>
        <Route
          path="/"
          element={
            <div className="header__profile">
              <p className="header__email">{props.email}</p >
              <button className="header__redirect" onClick={props.onSignOut}>Выйти</button>
            </div >} />
        <Route
          path="/sign-in"
          element={
            <div className="header__profile">
              <Link to="/sign-up" className="header__redirect">Регистрация</Link>
            </div >} />
        <Route
          path="/sign-up"
          element={
            <div className="header__profile">
              <Link to="/sign-in" className="header__redirect">Войти</Link>
            </div >} />
      </Routes>
      {/* {location.pathname === "/" &&
        <div className="header__profile">
          <p className="header__email">{props.email}</p >
          <a className="header__redirect" onClick={props.onSignOut}>Выйти</a>
        </div >}
      {location.pathname === "/sign-in" &&
        <div className="header__profile">
          <Link to="/sign-up" className="header__redirect">Регистрация</Link>
        </div >}
      {location.pathname === "/sign-up" &&
        <div className="header__profile">
          <Link to="/sign-in" className="header__redirect">Войти</Link>
        </div >} */}
    </header>)
}

export default Header;