import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UserDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [userdetails, setUserdetails] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8888/users/${id}`);
                setUserdetails(response.data);
            } catch (err) {
                console.error(err);
                setError('Không thể tải dữ liệu người dùng.');
            }
        };

        loadUser();
    }, [id]);

    return (
        <div className="container mt-4">
            <h3>Chi tiết tài khoản</h3>

            {error && <div className="alert alert-danger">{error}</div>}

            {userdetails ? (
                <ul className="list-group">
                    <li key={userdetails.id} className="list-group-item">
                        <strong>Tên:</strong> {userdetails.name}
                    </li>
                </ul>
            ) : (
                <p>Đang tải dữ liệu...</p>
            )}

            <button className="btn btn-primary mt-3" onClick={() => navigate(`/edit-user/${userdetails.id}`)}>
                Sửa tài khoản
            </button>
        </div>
    );
}

export default UserDetails;
