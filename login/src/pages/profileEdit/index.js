import { useState, useEffect } from 'react';
import React from 'react';
import { Icon } from '@iconify/react';
import Logo from '../../img/Logo_logo.svg';

export const ProfileEdit = () => {
  const [sidebarClosed, setSidebarClosed] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => {
      setSidebarClosed(!sidebarClosed);
  };

  const toggleDarkMode = () => {
      setDarkMode(!darkMode);
  };

  return (
    <body className={darkMode ? 'dark' : ''}>
      <nav className={`sidebar ${sidebarClosed ? 'close' : ''}`}>
                <header>
                    <div className='image-text'>
                        <span className='image'>
                            <img src={Logo} alt='logo'></img>
                        </span>

                        <div className='text header-text'>
                            <span className='name'>Cauã Almeida</span>
                        </div>
                    </div>

                    <Icon icon="iconamoon:arrow-right-2-duotone" className='toggle' width="22" height="22" onClick={toggleSidebar} />
                </header>

                <div className='menu-bar'>
                    <div className='menu'>
                        <li className='search-box'>
                            <Icon icon="ic:sharp-search" width="24" height="24" className='icon'/>
                            <input type='search' placeholder='Pesquisar...'></input>
                        </li>
                        <ul className='menu-links'>
                            <li className='nav-link'>
                                <a href='/dashboard'>
                                    <Icon icon="ri:dashboard-line" width="24" height="24" className='icon' />
                                    <span className='text nav-text'>Dashboard</span>
                                </a>
                            </li>
                            <li className='nav-link'>
                                <a href='/list'>
                                    <Icon icon="ph:list-bold" width="24" height="24" className='icon' />
                                    <span className='text nav-text'>Listar</span>
                                </a>
                            </li>
                            <li className='nav-link'>
                                <a href='/form'>
                                    <Icon icon="icon-park-outline:form-one" width="24" height="24" className='icon' />
                                    <span className='text nav-text'>Formulário</span>
                                </a>
                            </li>
                            <li className='nav-link'>
                                <a href='/view'>
                                    <Icon icon="octicon:eye-16" width="24" height="24" className='icon' />
                                    <span className='text nav-text'>Visualizar</span>
                                </a>
                            </li>
                            <li className='nav-link'>
                                <a href='/alerts'>
                                    <Icon icon="fluent:alert-12-regular" width="24" height="24" className='icon' />
                                    <span className='text nav-text'>Alertas</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='bottom-content'>
                        <li className=''>
                            <a href='/'>
                                <Icon icon="material-symbols:logout" width="24" height="24" className='icon' />
                                <span className='text nav-text'>Sair</span>
                            </a>
                        </li>

                        <li className='mode'>
                            <div className='moon-sun' onClick={toggleDarkMode}>
                                <Icon icon="ph:moon-bold" width="24" height="24" className={`icon moon ${darkMode ? 'active' : ''}`} />
                                <Icon icon="ph:sun-bold" width="24" height="24" className={`icon sun ${!darkMode ? 'active' : ''}`} />
                            </div>
                            <span className='mode-text text'>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>

                            <div className='toggle-switch'>
                                <span className={`switch ${darkMode ? 'dark' : ''}`}></span>
                            </div>
                        </li>
                    </div>
                </div>
            </nav>

      <section className='home'>
        <div id="page-content-wrapper">
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
            <div className="d-flex align-items-center">
                <i className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle"></i>
                <h2 className="fs-2 m-0">Meu Perfil</h2>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle second-text fw-bold" href="#" id="navbarDropdown"
                            role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <Icon icon="mingcute:user-4-fill" width="24" height="24" />Cauã
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="#">Perfil</a></li>
                            <li><a className="dropdown-item" href="#">Configurações</a></li>
                            <li><a className="dropdown-item" href="/">Sair</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
        </div>
      </section>
    </body>
  );
}

export default ProfileEdit;
