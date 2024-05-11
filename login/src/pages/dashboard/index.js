import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import api from "../../config/configApi";
import Sidebar from '../../components/Sidebar';
import Dropdown from '../../components/Dropdown.js';
import axios from 'axios';
import Logo from '../../img/Logo_logo.svg'
import Chat from '../../components/Chat.js';



export const Dashboard = () => {
    const [isClosingTask, setIsClosingTask] = useState(false); // Estado para controlar o fechamento da tarefa
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null); // Estado para armazenar o usuário sendo editado
    const [userData, setUserData] = useState({ totalUsers: 0, users: [] });
    const [showOverlay, setShowOverlay] = useState(false); // Estado para controlar a div preta
    const [showSpinner, setShowSpinner] = useState(false); // Estado para controlar o spinner
    const [showChat, setShowChat] = useState(false);
    const [chatOpacity, setChatOpacity] = useState(0);



    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get("/users");
            setUsers(response.data.users);
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };



    const handleInputChange = (e, field) => {
        setEditingUser({ ...editingUser, [field]: e.target.value });
    };

    const [showDiv, setShowDiv] = useState(false);
    const [alertCount, setAlertCount] = useState(3);

    const handleProfileClick = (event) => {
        event.stopPropagation();
        setShowDiv(true);
    };

    const handleCloseTask = (event) => {
        const taskElement = event.currentTarget.parentElement;
        taskElement.classList.add('fade-out'); // Adicione a classe de animação
        setTimeout(() => {
            taskElement.style.display = 'none';
            const taskList = taskElement.parentElement;
            const tasks = taskList.children;
            let i = Array.from(tasks).indexOf(taskElement);
            const removedTaskHeight = taskElement.offsetHeight;
            while (i < tasks.length - 1) {
                tasks[i + 1].style.transform = `translateY(-${removedTaskHeight}px)`;
                i++;
            }
            setTimeout(() => {
                i = Array.from(tasks).indexOf(taskElement) + 1;
                while (i < tasks.length) {
                    tasks[i].style.transform = 'none';
                    i++;
                }
            }, 250); // Tempo da animação em milissegundos
            setAlertCount((prevCount) => prevCount - 1); // Atualize o contador de alertas
        }, 250); // Tempo da animação em milissegundos
    };

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

    const handleChatIconClick = () => {
        setShowChat(!showChat);
        setChatOpacity(showChat ? 0 : 1);
    };

    return (
        <body>
            <Sidebar />
            <section className='home'>
                <div id="page-content-wrapper">

                <div class="nav">
                <input type="checkbox" id="nav-check"/>
                <div class="nav-header">
                    <img src={Logo}/>
                </div>
                <div class="nav-btn">
                    <label for="nav-check">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                </div>
  
                <div class="nav-links">
                    <a href="/dashboard">Dashboard</a>
                    <a href="/list">Listar</a>
                    <a href="/form">Formulário</a>
                    <a href="/view">Visualizar</a>
                    <a className="nav-link dropdown-toggle second-text fw-bold" href="#" id="navbarDropdown"
                                        role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <Icon icon="mingcute:user-4-fill" width="24" height="24" />
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="#" onClick={(event) => handleProfileClick(event)}>Perfil</a></li>
                                        <li><a className="dropdown-item" href="/">Sair</a></li>
                                    </ul>
                </div>
                </div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                        <div className="d-flex align-items-center">
                            <h2 className="fs-2 m-0">Dashboard</h2>
                        </div>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse dropdown-nav" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle second-text fw-bold" href="#" id="navbarDropdown"
                                        role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <Icon icon="mingcute:user-4-fill" width="24" height="24" />
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="#" onClick={(event) => handleProfileClick(event)}>Perfil</a></li>
                                        <li><a href onClick={() => setShowOverlay(true)} className='dropdown-item'>Sair</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <Dropdown
                        handleProfileClick={handleProfileClick}
                        showDiv={showDiv}
                        setShowDiv={setShowDiv}
                    />

                    <div id="main-content" className={showDiv ? 'no-click' : ''}>
                        <div className="container-fluid px-4">
                            <div className="row g-3 my-2">
                                <div className="col-md-3">
                                    <div className="p-3 shadow-sm d-flex justify-content-around align-items-center rounded dashboard-card "  style={{backgroundColor:"#CC4E97"}}>
                                        <div>
                                        <h3 className="fs-2">{userData.totalUsers}</h3>
                                            <p className="fs-5">Usuários</p>
                                        </div>
                                        <Icon icon="ph:users-fill" width="24" height="24" className='icon'/>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="p-3 shadow-sm d-flex justify-content-around align-items-center rounded dashboard-card "  style={{backgroundColor:"#7859C0"}}>
                                        <div>
                                            <h3 className="fs-2">10</h3>
                                            <p className="fs-5">Entregas</p>
                                        </div>
                                        <Icon icon="iconamoon:delivery-fast-fill" width="24" height="24" className='icon'/>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="p-3 shadow-sm d-flex justify-content-around align-items-center rounded dashboard-card "  style={{backgroundColor:"#5AA4E3"}}>
                                        <div>
                                            <h3 className="fs-2">12</h3>
                                            <p className="fs-5">Completas</p>
                                        </div>
                                        <Icon icon="ic:round-check-circle" width="24" height="24" className="icon" />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="p-3 shadow-sm d-flex justify-content-around align-items-center rounded dashboard-card "  style={{backgroundColor:"#F9A936"}}>
                                        <div className='alerts-dash'>
                                            <h3 className="fs-2">{alertCount}</h3>
                                            <p className="fs-5">Alertas</p>
                                        </div>
                                        <Icon icon="zondicons:exclamation-solid" width="24" height="24" className='icon' />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bottom-data">
                            <div className="orders">
                                <div className="header">
                                    <i className='bx bx-receipt'></i>
                                    <h3>Usuários Recentes</h3>
                                    <i className='bx bx-filter'></i>
                                    <i className='bx bx-search'></i>
                                </div>
                                <table>
                                    <thead className='thead-users'>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>E-mail</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {users.map(user => (
                                    <tr key={user.id}>
                                      <th data-title="#ID" scope="row">{user.id}</th>
                                      <td data-title="Nome">{editingUser && editingUser.id === user.id ? <input type="text" value={editingUser.name} onChange={(e) => handleInputChange(e, "name")} /> : user.name}</td>
                                      <td data-title="E-mail">{editingUser && editingUser.id === user.id ? <input type="text" value={editingUser.email} onChange={(e) => handleInputChange(e, "email")} /> : user.email}</td>
                                    </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="reminders">
                                <div className="header">
                                    <h3>Alertas</h3>
                                </div>
                                <ul className="task-list">
                                    <li className="completed">
                                        <div className="task-title">
                                            <Icon icon="tabler:mood-happy-filled" className='icon happy'/>
                                            <p>Um usuário foi cadastrado!</p>
                                        </div>
                                        <Icon icon="flowbite:close-circle-solid" className='icon close' onClick={handleCloseTask} />
                                    </li>
                                    <li className="info">
                                        <div className="task-title">
                                            <Icon icon="ph:info-fill" className='icon info' />
                                            <p>Um usuário foi editado</p>
                                        </div>
                                        <Icon icon="flowbite:close-circle-solid" className='icon close' onClick={handleCloseTask} />
                                    </li>
                                    <li className="not-completed">
                                        <div className="task-title">
                                            <Icon icon="tabler:mood-sad-filled" className='icon sad'/>
                                            <p>Um usuário foi deletado!</p>
                                        </div>
                                        <Icon icon="flowbite:close-circle-solid" className='icon close' onClick={handleCloseTask} />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                        <div className='chat-icon' onClick={handleChatIconClick}>
                            <Icon icon='icon-park-solid:message' width='24' height='24' className='icon msg' />
                        </div>

                    <div className="chat-container" style={{ opacity: chatOpacity }}>
                        <Chat/>
                    </div>
                </div>

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
            </section>
        </body>
    );
};

export default Dashboard;