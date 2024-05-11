import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Logo from '../../img/Logo_logo.svg';
import { useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import api from '../../config/configApi'

export const List = () =>{

    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null); // Estado para armazenar o usuário sendo editado

    useEffect(() => {
        fetchUsers();
    }, []);

        
    const handleProfileClick = (event) => {
        event.stopPropagation();
        setShowDiv(true);
    };


    const fetchUsers = async () => {
        try {
            const response = await api.get("/users");
            setUsers(response.data.users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleEdit = (user) => {
        setEditingUser({ ...user }); // Atualiza o estado com os dados do usuário sendo editado
    };

    const handleSave = async () => {
        try {
            await api.put(`/users/${editingUser.id}`, editingUser);
            // Atualizar a lista de usuários após a edição
            fetchUsers();
            setEditingUser(null); // Limpar o estado de edição
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleDelete = async (user) => {
        try {
            // Remover o usuário da lista
            setUsers(users.filter(u => u.id !== user.id));
            // Deletar o usuário do banco de dados
            await api.delete(`/users/${user.id}`);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleInputChange = (e, field) => {
        setEditingUser({ ...editingUser, [field]: e.target.value });
    };

    const [sidebarClosed, setSidebarClosed] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const toggleSidebar = () => {
        setSidebarClosed(!sidebarClosed);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const [showDiv, setShowDiv] = useState(false);

    return (
        <body className={darkMode ? 'dark' : ''}>
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
                    <Sidebar/>
                    <div className="container-fluid px-4">
                
                    <div className="bottom-data">
                            <div className="orders">
                                <div className="header">
                                    <i className='bx bx-receipt'></i>
                                    <h3>Listar Usuários</h3>
                                    <i className='bx bx-filter'></i>
                                    <i className='bx bx-search'></i>
                                </div>
                                <table>
                                    <thead className='thead-users'>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>E-mail</th>
                                            <th>Telefone</th>
                                            <th>Cep</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {users.map(user => (
                                    <tr key={user.id}>
                                      <th data-title="#ID" scope="row">{user.id}</th>
                                      <td data-title="Nome">{editingUser && editingUser.id === user.id ? <input type="text" value={editingUser.name} onChange={(e) => handleInputChange(e, "name")} /> : user.name}</td>
                                      <td data-title="E-mail">{editingUser && editingUser.id === user.id ? <input type="text" value={editingUser.email} onChange={(e) => handleInputChange(e, "email")} /> : user.email}</td>
                                      <td data-title="Telefone">{editingUser && editingUser.id === user.id ? <input type="text" value={editingUser.telefone} onChange={(e) => handleInputChange(e, "telefone")} /> : user.telefone}</td>
                                      <td data-title="Cep">{editingUser && editingUser.id === user.id ? <input type="text" value={editingUser.cep} onChange={(e) => handleInputChange(e, "cep")} /> : user.cep}</td>
                                      {editingUser && editingUser.id === user.id ? (
                                        <div className="btn-group" role="group" aria-label="Ações">
                                            <button type="button" className="btn btn-success" onClick={handleSave}>Salvar</button>
                                            <button type="button" className="btn btn-danger" onClick={() => handleDelete(user)}>Deletar</button>
                                        </div>
                                            ) : (
                                        <div aria-label="Ações">
                                            <button type="button" className="btn btn-primary" onClick={() => handleEdit(user)}>Editar</button>
                                        </div>
                                      )}
                                    </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            </div>

                    </div>
                </div>
            </section>
        </body>
    );
};

export default List