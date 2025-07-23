import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Register() {
    let [name, setName] = useState('');
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');
    let [error, setError] = useState('');
    let navigate = useNavigate();

    let handleRegister = () => {
        if (!username || !password || !confirmPassword) {
            setError('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp.');
            return;
        }

        let newUser = { name ,username, password };
        axios.post('http://localhost:8888/users', newUser)
            .then(() => {
                navigate('/login');
            })
            .catch(error => {
                console.error('Lỗi khi thêm tài khoản:', error);
            });
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="mb-4 text-center">Đăng ký</h2>

            <div className="form-group mb-3">
                <label>Tên hiển thị</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên để hiển thị"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
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

            <div className="form-group mb-3">
                <label>Xác nhận mật khẩu</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Xác nhận lại mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button className="btn btn-success w-100" onClick={handleRegister}>
                Đăng ký
            </button>
        </div>
    );
}

export default Register;
