import React, { useState } from "react";
import { Link } from 'react-router-dom';
import api from "../../config/configApi";
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useEffect } from "react";
import Logo from "../../img/Logo_Alt (1).svg"
import Back from "../../img/undraw_join_re_w1lh.svg"

export const Login = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const [loading, setLoading] = useState(false);

    const valueInput = e => setUser({ ...user, [e.target.name]: e.target.value });

    const loginSubmit = async e => {
        e.preventDefault();
        setLoading(true);

        const headers = {
            'Content-Type': 'application/json'
        };

        await api.post('/users-login', user, { headers })
            .then((response) => {
                const token = response.data.token;
                localStorage.setItem('token', token);
                setStatus({
                    type: 'success',
                    mensagem: response.data.message
                });
                setLoading(false);
                // Redireciona para o chat após o login bem-sucedido
                navigate('/dashboard');
            })
            .catch((error) => {
                if (error.response) {
                    setStatus({
                        type: 'error',
                        mensagem: error.response.data.message
                    });
                } else {
                    setStatus({
                        type: 'error',
                        mensagem: "Erro ao conectar, tente novamente mais tarde!"
                    });
                }
                setLoading(false);
            });
    };

    return (
        <form className="bodyScreen" onSubmit={loginSubmit}>
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <img src={Logo} alt="Logo" title="Logo" className="logoLogin"/>
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
            <div className="featured-image mb-3">
                <img src={Back} className="img-fluid" style={{width: "250px"}}></img>
            </div>
            <p className="text-white fs-4" style={{ fontWeight: "550" }}>Faça Seu Login</p>
            <small className="text-white text-wrap text-center" style={{ width: "20rem" }}>E tenha uma ótima experiência em nossa plataforma!</small>
        </div>

        <div className="col-md-6 right-box">
            <div className="row align-items-center">
                <div className="header-text mb-3">
                    <h2>Olá, novamente!</h2>
                    <p> Estamos felizes por tê-lo de volta.</p>
                </div>
                <div className="input-group mb-3">
                    <input type="email" className="form-control form-control-lg bg-light fs-6" placeholder="Digite Seu email..." name= "email" onChange={valueInput} />
                </div>
                    <div className="input-group mb-1">
                        <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Digite Sua senha..." name= "password" onChange={valueInput} />
                    </div>
                <div className="input-group mb-2 d-flex justify-content-between">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="formCheck"/>
                        <label htmlFor="formCheck" className="form-check-label text-secondary"><small>Lembre De Mim</small></label>
                    </div>
                    <div className="forgot">
                        <small><a href="/newPass">Esqueceu sua Senha?</a></small>
                    </div>
                </div>
                <div className="input-group mb-3">
                    {status.type === 'success'? <p>{status.mensagem}</p> : ""}
                    {status.type === 'error' && <p className="text-danger">{status.mensagem}</p>}
                    <button className={`btn btn-lg btn-primary w-100 fs-6 loginBtn ${loading ? 'disabled' : ''}`} type="submit" disabled={loading}>
                        {loading ? 'Carregando...' : 'Entrar'}
                    </button>
                </div>
                <div className="input-group mb-1">
                    <button className="btn btn-lg btn-light w-100 fs-6"><Icon icon="flat-color-icons:google" style={{fontSize: "25px", marginRight:"10px"}} /><small>Conecte-se Com Google</small></button>
                </div>
                <div className="row">
                    <small>Não possui uma conta?<a href="/register">Cadastre-se</a></small>
                </div>
            </div>
        </div>
        </div>

        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
        <div className="wave wave4"></div>
    </div>
    </form>

    );
}

export default Login;