import React, {useState} from "react";
import api from "../../config/configApi"
import {useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Icon } from '@iconify/react';
import Logo from "../../img/Logo_Alt (1).svg"
import Back from "../../img/undraw_forgot_password_re_hxwm.svg"


export const NewPass = ()=>{
    const navigate = useNavigate()


const [user, setUser] = useState({

    email: '',
    password: ''

})

const [status, setStatus] = useState({

type: '',
mensagem:''

})

const valueInput = e => setUser({...user, [e.target.name]: e.target.value})

const loginSubmit = async e =>{
    e.preventDefault();
    //console.log(user.email)
    //console.log(user.password)

    const headers ={

        'Content-Type': 'application/json'
    }

    await api.post('/login', user, {headers})

    .then((response) =>{
        setStatus({
            type:'success',
            mensagem:response.data.mensagem
        })
        
        return navigate ("/dashboard")

    })
    .catch((error) =>{

        if (error.response) {
            
            setStatus({
                type:'error',
                mensagem: error.response.data.mensagem
            })
        } else {
            setStatus({
                type: 'error',
                mensagem: "Erro ao conectar, tente novamente mais tarde!"
            })
        }
        })
}


return(
    <form className="bodyScreen">
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <img src={Logo} alt="Logo" title="Logo" className="logoLogin register"/>
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{ backgroundColor: "#7096D1" }}>
            <div className="featured-image mb-3">
                <img src={Back} className="img-fluid" style={{width: "250px"}}></img>
            </div>
            <p className="text-white fs-4" style={{ fontWeight: "550" }}>Redefine Sua Senha</p>
            <small className="text-white text-wrap text-center" style={{ width: "20rem" }}>E tenha uma ótima experiência em nossa plataforma!</small>
        </div>

        <div className="col-md-6 right-box">
            <div className="row align-items-center">
                <div className="header-text mb-4">
                    <h2>Esqueceu Sua Senha?</h2>
                    <p>Digite seu email e aguarde uma resposta.</p>
                </div>
                <div className="input-group mb-3">
                    <input type="email" className="form-control form-control-lg bg-light fs-6" placeholder="Digite Seu email..." name= "email"/>
                </div>
                <div className="input-group mb-4 d-flex justify-content-between">
                </div>
                <div className="input-group mb-3">
                    {status.type === 'success'? <p>{status.mensagem}</p> : ""}
                    {status.type === 'error'? <p>{status.mensagem}</p> : ""}
                    <button className="btn btn-lg btn-primary w-100 fs-6 loginBtn" type="submit">Esqueci minha senha</button>
                </div>
                <div className="input-group mb-3">
                    <button className="btn btn-lg btn-light w-100 fs-6"><Icon icon="flat-color-icons:google" style={{fontSize: "25px", marginRight:"10px"}} /><small>Conecte-se Com Google</small></button>
                </div>
                <div className="row">
                    <small>Já possui uma conta?  <a href="/">Faça Seu Login</a> ou <a href="/register">Cadastre-se</a></small>
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
)

}



export default NewPass