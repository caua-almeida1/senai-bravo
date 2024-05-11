import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../config/configApi'
import Sidebar from '../../components/Sidebar';
import { Icon } from '@iconify/react';
import Logo from '../../img/Logo_logo.svg'

export const Form = () => {
    const [sidebarClosed, setSidebarClosed] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        telefone: '',
        cep: '',
        estado: '',
        cidade: '',
        bairro: '',
        rua: '',
    });
    const [message, setMessage] = useState('');

    
    const handleProfileClick = (event) => {
        event.stopPropagation();
        setShowDiv(true);
    };


    const toggleSidebar = () => {
        setSidebarClosed(!sidebarClosed);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const [showDiv, setShowDiv] = useState(false);

    const valueInput = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const fetchAddressByCEP = async (cep) => {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const { uf, localidade, bairro, logradouro } = response.data;
            setData({
                ...data,
                estado: uf,
                cidade: localidade,
                bairro: bairro,
                rua: logradouro,
            });
        } catch (error) {
            console.error('Erro ao buscar endereço:', error);
        }
    };

    const addUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        const headers = {
            'Content-Type': 'application/json',
        };

        try {
            const response = await api.post('/users', data, { headers });
            setMessage(response.data.mensagem);
            setData({
                name: '',
                email: '',
                password: '',
                telefone: '',
                cep: '',
                estado: '',
                cidade: '',
                bairro: '',
                rua: '',
            });
        } catch (err) {
            if (err.response && err.response.data && err.response.data.mensagem) {
                setMessage(err.response.data.mensagem);
            } else {
                setMessage('Error: Tente novamente mais tarde');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddressByCEP(data.cep);
    }, []);

    return (
            <body className={darkMode ? 'dark' : ''}>
                    <Sidebar />
                  <section className='home'>
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
                      <div className='container'>

                        
            <form action="#" class="form" onSubmit={addUser}>
              <div class="input-box">
                <label>Nome</label>
                <input
                    type='text'
                    className='form-control form-control-lg bg-light fs-6'
                    placeholder='Digite Seu Nome...'
                    name='name'
                    value={data.name}
                    onChange={valueInput}
                />
              </div>

            <div className="column">
              <div class="input-box">
                <label>Email</label>
                <input
                    type='email'
                    className='form-control form-control-lg bg-light fs-6'
                    placeholder='Digite Seu Email...'
                    name='email'
                    value={data.email}
                    onChange={valueInput}
                />
              </div>

              <div class="input-box">
                <label>Senha</label>
                <input
                    type='password'
                    className='form-control form-control-lg bg-light fs-6'
                    placeholder='Digite Sua Senha...'
                    name='password'
                    value={data.password}
                    onChange={valueInput}
                />
                </div>
              </div>

              <div class="column">
                <div class="input-box">
                  <label>Número</label>
                <input
                    type='number'
                    className='form-control form-control-lg bg-light fs-6'
                    placeholder='Digite Seu Número...'
                    name='telefone'
                    value={data.telefone}
                    onChange={valueInput}
                />
                </div>

                <div class="input-box">
                  <label>CEP</label>
                <input
                    type='text'
                    className='form-control form-control-lg bg-light fs-6'
                    placeholder='Digite Seu Cep...'
                    name='cep'
                    value={data.cep}
                    onChange={(e) => {
                        const cep = e.target.value.replace(/\D/g, '');
                        setData({ ...data, cep });
                        if (cep.length === 8) {
                            fetchAddressByCEP(cep);
                        }
                    }}
                />
                </div>
              </div>

              <div class="input-box address">
                <label>Endereço</label>
                <input
                    type='text'
                    className='form-control form-control-lg bg-light fs-6'
                    placeholder='Digite Seu Estado...'
                    name='estado'
                    value={data.estado}
                    onChange={valueInput}
                />
                <input
                    type='text'
                    className='form-control form-control-lg bg-light fs-6'
                    placeholder='Digite Sua Cidade...'
                    name='cidade'
                    value={data.cidade}
                    onChange={valueInput}
                />
                <div class="column">
                <input
                    type='text'
                    className='form-control form-control-lg bg-light fs-6'
                    placeholder='Digite Seu Bairro...'
                    name='bairro'
                    value={data.bairro}
                    onChange={valueInput}
                />
                <input
                    type='text'
                    className='form-control form-control-lg bg-light fs-6'
                    placeholder='Digite Sua Rua...'
                    name='rua'
                    value={data.rua}
                    onChange={valueInput}
                />
                </div>
              </div>
              {message ? <p className='message-form'>{message}</p> : ''}
              <button type='submit' disabled={loading}>{loading ? <>Carregando...</> : 'Cadastrar Usuário'}</button>
            </form>
                      </div>
            </section>
            </body>
    );
};

export default Form;
