import React from "react";
import axios from 'axios';

//Realizando Conexão Do Servidor Com a Programação Back-End
export default axios.create({
    //baseURL: 'http://localhost:8081' codigo anterior
    baseURL: 'http://192.168.1.104:8081' 
}
)       