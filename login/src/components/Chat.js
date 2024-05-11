import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import api from '../config/configApi'
import { Icon } from '@iconify/react';

export const Chat = () => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [userData, setUserData] = useState(null); // Estado para informações do usuário logado

    useEffect(() => {
        const newSocket = io('http://localhost:8081');
        setSocket(newSocket);

        newSocket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        fetchUserInfo(); // Chame a função para buscar informações do usuário

        return () => {
            newSocket.disconnect();
        };
    }, []);

    // Função para buscar informações do usuário logado
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

    const sendMessage = () => {
        if (socket && messageInput.trim() !== '') {
            const messageToSend = `${userData.name}: ${messageInput}`; // Adicione o nome do usuário à mensagem
            socket.emit('chat message', messageToSend);
            setMessageInput('');
        }
    };

    return (
        <div className="chat-container">
            <header>
                <h2>Pizza World's Chat</h2>
            </header>
            <ul className="message-list">
                {messages.map((msg, index) => (
                    <li key={index} className={msg.startsWith(userData.name) ? 'sent-message chat' : 'received-message chat'}>
                        {msg}
                    </li>
                ))}
            </ul>
            <textarea type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
            <button onClick={sendMessage}><Icon icon="mingcute:send-fill" width="24" height="24" /></button>
        </div>
    );
};

export default Chat;
