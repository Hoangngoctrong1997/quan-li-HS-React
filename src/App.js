import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import ListProduct from'./components/ListProduct'
import Login from'./components/Login'
import ListStudent from "./components/ListStudent";
import AddSutdent from "./components/AddSutdent";
import ListUsers from "./components/ListUsers";
import Register from "./components/Register ";
import UsersDetails from "./components/UsersDetails";
import EditUser from "./components/EditUser";

function App() {
    return (
        <>
             <Routes>
                <Route path="/" element={<ListStudent />} />
                <Route path="/login" element={<Login />}/>
                <Route path="users" element={<ListUsers />}/>
                <Route path="add-user" element={<Register />}/>
                <Route path="view-user/:id" element={<UsersDetails />}/>
                 <Route path="/edit-user/:id" element={<EditUser />} />
            </Routes>
        </>
    );
}

export default App;