import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Login } from '../../login/src/pages/login';
import { Register } from "./pages/register";
import {Dashboard} from './pages/dashboard';
import {List} from './pages/list';
import {Form} from "./pages/form";
import {View} from "./pages/view";
import {NewPass} from "./pages/newPass"
import {ProfileEdit} from "./pages/profileEdit"
import {Chat} from './components/Chat';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path = '/' Component={Login}/>
          <Route path = '/register' Component={Register}/>
          <Route path = '/newPass' Component={NewPass}/>
          <Route path = '/dashboard' Component={Dashboard}/>
          <Route path ='/list' Component={List}/>
          <Route path = '/form' Component={Form}/>
          <Route path = '/view' Component={View}/>
          <Route path='/profileEdit' Component={ProfileEdit}/>
          <Route path='/Chat' Component={Chat}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// import React from 'react'
// import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import { Login } from '../../login/src/pages/login';
// import { Register } from "./pages/register";
// import {Dashboard} from './pages/dashboard';
// import {List} from './pages/list';
// import {Form} from "./pages/form";
// import {View} from "./pages/view";
// import {NewPass} from "./pages/newPass"
// import PrivateRoutes from './components/PrivateRoutes';

// function App() {
//   return (
//     <div>
//       <Router>
//         <Routes>
//           <Route element={<PrivateRoutes />}>
//             <Route element={<Dashboard/>} path='/dashboard'/>
//             <Route element={<List/>} path='/list'/>
//             <Route element={<Form/>} path='/form'/>
//             <Route element={<View/>} path='/view'/>
//           </Route>

//             <Route path = '/' element={<Login/>}/>
//             <Route path = '/register' element={<Register/>}/>
//             <Route path = '/newpass' element={<NewPass/>}/>
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;