import React from 'react'
import Mainlogo from'../assets/Logo-REALAXE.png'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='header'>
        <div className='header_ul'>
        <img className="mainlogo" src={Mainlogo} alt="" />
        </div>
        <Link to="/">
        <ul>L'ASSOCIATION</ul>
      </Link>
      <a
        href="https://www.realaxe.fr/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ul>ACTUS</ul>
      </a>
      <ul>COURS</ul>
      <a
        href="https://www.realaxe.fr/contact/"
        target="_blank"
        rel="noopener noreferrer"
      >
          <ul>CONTACT</ul>
      </a>
      <a
        href="https://www.helloasso.com/associations/realaxe/evenements/inscription-saison-2023-2024"
        target="_blank"
        rel="noopener noreferrer"
      >
      <ul>ABONNEMENT</ul>
      </a>
    </div>
  )
}

export default Header