import { useState, useEffect } from 'react';
import React from 'react';
import { Icon } from '@iconify/react';
import Sidebar from '../../components/Sidebar';
import Dropdown from '../../components/Dropdown.js';
import Logo from '../../img/Logo_logo.svg'

export const View = () => {
  const [sidebarClosed, setSidebarClosed] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showDiv, setShowDiv] = useState(false); 

  const toggleSidebar = () => {
      setSidebarClosed(!sidebarClosed);
  };

  const toggleDarkMode = () => {
      setDarkMode(!darkMode);
  };

  const [users, setUsers] = useState([]);
  const [visibleData, setVisibleData] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // DropDown
  const handleProfileClick = (event) => {
    event.stopPropagation();
    setShowDiv(true);
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8081/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const toggleDataVisibility = (data) => {
    if (visibleData === data) {
      setVisibleData(null);
    } else {
      setVisibleData(data);
    }
  };

  return (
    <body className={darkMode ? 'dark' : ''}>

      {/* Sidebar */}
        <Sidebar /> 

      {/* Container Da tela */}
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

          <Dropdown
              handleProfileClick={handleProfileClick}
              showDiv={showDiv}
              setShowDiv={setShowDiv}
          />

          <div className="container-fluid px-4">
            <div className="row my-5 table-responsive" id="no-more-tables">
              <div className="col">
                <table className="table bg-white rounded shadow-sm  table-hover">
                  <thead className='thead-users'>
                    <tr>
                      <th>#ID</th>
                      <th>Nome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <React.Fragment key={index}>
                        <tr>
                          <td data-title="id">{user.id}</td>
                          <td data-title="name">{user.name}
                            <Icon
                              icon="ep:arrow-down-bold"
                              className='icondown'
                              onClick={() => toggleDataVisibility(user.id)}
                            />
                          </td>
                        </tr>
                        {visibleData === user.id && (
                          <tr>
                            <td colSpan="4">
                              <div className='table-data'>
                                <div><strong>Nome: </strong> {user.name}<br/></div>
                                <div><strong>E-mail: </strong> {user.email}<br/></div>
                                <div><strong>Telefone: </strong> {user.telefone}<br/></div>
                                <div><strong>Cep: </strong> {user.cep}</div>
                                <div><strong>Cidade: </strong> {user.cidade}</div>
                                <div><strong>Bairro: </strong> {user.bairro}</div>
                                <div><strong>Rua: </strong> {user.rua}</div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
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
}

export default View;
