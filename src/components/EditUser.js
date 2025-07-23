import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mỗi trường là một state riêng
    const [name, setName] = useState('');

    // Lấy dữ liệu người dùng ban đầu
    useEffect(() => {
        axios.get(`http://localhost:8888/users/${id}`)
            .then(res => {
                setName(res.data.name);
            })
            .catch(err => {
                console.error(err);
            });
    }, [id]);

    const handleEdit = () => {
        axios.put(`http://localhost:8888/users/${id}`, {
            name,
        })
            .then(() => {
                alert('Cập nhật thành công!');
                navigate('/users');
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <div className="container mt-4" style={{ maxWidth: '500px' }}>
            <h3>Chỉnh sửa tài khoản</h3>
            <div className="mb-3">
                <label className="form-label">Tên</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <button className="btn btn-success" onClick={handleEdit}>Sửa</button>
            <button className="btn btn-secondary ms-2" onClick={() => navigate(-1)}>Hủy</button>
        </div>
    );
}

export default EditUser;
