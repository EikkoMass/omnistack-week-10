/* eslint-disable no-unreachable */
import React, {useState} from 'react';
import api from '../../services/api';


export default function Login({ history }) {

  const [email, setEmail] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await api.post('/sessions', {email});
    const { _id } = res.data;

    localStorage.setItem('user', _id);
    history.push('/dashboard');
  }

  return (
  <>
    <p>
      Ofereça <b>spots</b> para programadores e encontre <b>talentos</b> para sua empresa
    </p>
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="email"
      >E-MAIL *</label>

      <input
        type="email"
        id="email"
        placeholder="Seu melhor e-mail"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />

      <button type="submit" className="btn">Entrar</button>
    </form>
  </>
  );
}