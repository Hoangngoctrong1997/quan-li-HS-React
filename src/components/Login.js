import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Login() {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [listusers, setListusers] = useState([]);
    let [error, setError] = useState('');
    let navigate = useNavigate();

    const handleLogin = () => {
        axios.get('http://localhost:8888/users')
            .then(response => {
                let list = response.data;
                setListusers(list);
                let haveuser = listusers.find(
                    (x) => x.username === username && x.password === password
                );

                if (haveuser) {
                    navigate('/users');
                } else {
                    console.log('Sai tên đăng nhập hoặc mật khẩu');
                }

            })
            .catch(error => {
                console.error(error);
            });

    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="mb-4 text-center">Đăng nhập</h2>
            <div className="form-group mb-3">
                <label>Tên đăng nhập</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="form-group mb-3">
                <label>Mật khẩu</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button className="btn btn-primary w-100" onClick={handleLogin}>
                Đăng nhập
            </button>
        </div>
    );
}

export default Login;
