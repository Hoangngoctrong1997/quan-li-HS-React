import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import ListProduct from'./components/ListProduct'
import Login from'./components/Login'
import ListStudent from "./components/ListStudent";
import AddSutdent from "./components/AddSutdent";

function App() {
    return (
        <>
             <Routes>
                <Route path="/" element={<ListStudent />} />
                <Route path="/login" element={<Login />} />
                 <Route path="/addstudent" element={<AddSutdent/>} />

            </Routes>
        </>
    );
}

export default App;