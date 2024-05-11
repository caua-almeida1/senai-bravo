// import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
// import { Navigate } from "react-router-dom";

// const PrivateRoutes = ({ children, ...rest }) => {
//     const navigate = useNavigate();
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             setIsAuthenticated(true);
//             console.log("Usuário autenticado com sucesso!");
//         } else {
//             // Se o token não existir, redirecione o usuário para a página de login
//             navigate('/');
//         }
//     }, [navigate]);

//     return isAuthenticated ? children : <Navigate to="/" />;
// };

// export default PrivateRoutes;
