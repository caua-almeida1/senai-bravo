import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Logo from '../img/Logo_logo.svg';

function Sidebar() {
    const [sidebarClosed, setSidebarClosed] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [showOverlay, setShowOverlay] = useState(false); // Estado para controlar a div preta
    const [showSpinner, setShowSpinner] = useState(false); // Estado para controlar o spinner

    const toggleSidebar = () => {
        setSidebarClosed(!sidebarClosed);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        const path = window.location.pathname;
        const currentPageName = path.substring(1);
        setCurrentPage(currentPageName || 'dashboard'); // Defina 'dashboard' como a página padrão
    }, []);

    const handleLogout = (url) => {
        setShowOverlay(true); // Mostra a div preta
        setShowSpinner(true); // Mostra o spinner
    
        // Adiciona uma pequena pausa para que a animação fade-out seja visível
        setTimeout(() => {
            setShowOverlay(false); // Esconde a div preta
            setShowSpinner(false); // Esconde o spinner
            window.location.href = url; // Redireciona para a URL especificada após a animação
        }, 2000); // Tempo em milissegundos (2 segundos, correspondente à duração do delay)
    };

    return (
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
                    <li className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}>
                            <a href='/dashboard' className='link-button'>
                                <Icon icon="ri:dashboard-line" width="24" height="24" className='icon' />
                                <span className='text nav-text'>Dashboard</span>
                            </a>
                        </li>
                        <li className={`nav-link ${currentPage === 'list' ? 'active' : ''}`}>
                            <a href='/list' className='link-button'>
                                <Icon icon="ph:list-bold" width="24" height="24" className='icon' />
                                <span className='text nav-text'>Listar</span>
                            </a>
                        </li>
                        <li className={`nav-link ${currentPage === 'form' ? 'active' : ''}`}>
                            <a href='/form' className='link-button'>
                                <Icon icon="icon-park-outline:form-one" width="24" height="24" className='icon' />
                                <span className='text nav-text'>Formulário</span>
                            </a>
                        </li>
                        <li className={`nav-link ${currentPage === 'view' ? 'active' : ''}`}>
                            <a href='/view' className='link-button'>
                                <Icon icon="octicon:eye-16" width="24" height="24" className='icon' />
                                <span className='text nav-text'>Visualizar</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='bottom-content'>
                    <li className='sair-btn'>
                        <a href onClick={() => setShowOverlay(true)}>
                            <Icon icon="material-symbols:logout" width="24" height="24" className='icon' />
                            <span className='text nav-text'>Sair</span>
                        </a>
                    </li>
                </div>
            </div>

            {/* Div preta condicional */}
            {showOverlay && (
                <div className='overlay'>
                    {showSpinner ? (
                        <div className='spinner-overlay'>
                            <Icon icon="line-md:loading-twotone-loop" width="40" height="40" className='icon'/>
                        </div>
                    ) : (
                        <div className='overlay-content'>
                            <p>Deseja realmente sair?</p>
                            <button onClick={() => setShowOverlay(false)}>Cancelar</button>
                            <button onClick={() => handleLogout('/')}>Sair</button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Sidebar;