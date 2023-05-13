import React, { useState } from 'react';

function Login(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailInputChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordInputChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onLoginUser({email, password});
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <h1 className="auth__heading">Вход</h1>
        <form className="auth__form" name="Log-in" onSubmit={handleSubmit}>
        <input
            className="auth__input"
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="on"
            id="email-input"
            required
            value={email}
            onChange={handleEmailInputChange}
            />
          <span className="popup__input-error" />
          <input
            className="auth__input"
            type="password"
            name="password"
            placeholder="Пароль"
            autoComplete="on"
            id="password-input"
            required
            value={password}
            onChange={handlePasswordInputChange}/>
          <span className="popup__input-error" />
          <button className="auth__save-button" type="submit">Войти</button>
        </form>
      </div>
    </div>)
}

export default Login;