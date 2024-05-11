import { Icon } from '@iconify/react';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; 
import api from "../config/configApi";

const Dropdown = ({ handleProfileClick, showDiv, setShowDiv }) => {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cidade, setCidade] = useState('');
    const [message, setMessage] = useState('');

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const cidadeRef = useRef(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/user-info', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const userData = response.data.user;
                setUserData(userData);
            } catch (error) {
                console.error('Erro ao buscar informações do usuário:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
        setName(userData.name);
        setEmail(userData.email);
        setCidade(userData.cidade);
    };

    const handleSaveClick = async () => {
        try {
            const updatedUserData = { name, email, cidade};
            await api.put('/users/' + userData.id, updatedUserData);

            setMessage('Informações atualizadas com sucesso, atualize o site!');
            setTimeout(() => {
                setMessage('');
            }, 5000);

            setIsEditing(false);
        } catch (error) {
            console.error('Erro ao salvar informações:', error);
        }
    };

    const handleOutsideClick = (event) => {
        const cardProfile = document.getElementById('cardProfile');
        if (cardProfile && !cardProfile.contains(event.target)) {
            setShowDiv(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [setShowDiv]);

    return (
        <>
            {showDiv && (
                <div className="black-overlay">
                    <div className="card-profile" id="cardProfile">
                        {userData && (
                            <>
                                {isEditing ? (
                                    <>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            ref={nameRef}
                                            className='input-edit h2'
                                        />
                                        <input
                                            type="text"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            ref={emailRef}
                                            className='input-edit'
                                        />
                                        <input
                                            type="text"
                                            value={cidade}
                                            onChange={(e) => setCidade(e.target.value)}
                                            ref={cidadeRef}
                                            className='input-edit'
                                        />
                                    </>
                                ) : (
                                    <>
                                        <h2>{userData.name}</h2>
                                        <p>{userData.email}</p>
                                        <p>{userData.cidade}</p>
                                    </>
                                )}

                                <div className='links'>
                                    <a href={userData.instagram} target='_blank'><Icon icon="skill-icons:instagram" width="40" height="40" className='icon'/></a>
                                    <a href={userData.linkedin} target='_blank'><Icon icon="skill-icons:linkedin" width="40" height="40" className='icon' /></a>
                                    <a href={userData.github} target='_blank'><Icon icon="skill-icons:github-dark" width="40" height="40" className='icon'/></a>
                                </div>

                                {isEditing ? (
                                    <button className='btn-save-profile' onClick={handleSaveClick}>Salvar</button>
                                ) : (
                                    <button className='btn-edit-profile' onClick={handleEditClick}>Editar</button>
                                )}

                                {message && <p>{message}</p>}
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Dropdown;
