import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
function ListUsers() {
    let navigate = useNavigate();
    let [userlist, setUserlist] = useState([]);
    useEffect(() => {
        const loadUsers = () => {
            axios.get('http://localhost:8888/users')
                .then(response => {
                    setUserlist(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        };
        loadUsers()
    }, []);
    let handleDelete =(id)=>{
        let confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa user viên này?");
        if(confirmDelete) {
            axios.delete(`http://localhost:8888/users/${id}`)
                .then(() => {
                    setUserlist(userlist.filter(user => user.id !== id));
                })
                .catch(error => {
                    console.error("Lỗi khi xóa sinh viên:", error);
                });
        }
    }
    return (
        <>
            <div className="container mt-4">
                <h3>Danh sách tài khoản</h3>
                {userlist.length === 0 ? (
                    <p>Không có dữ liệu.</p>
                ) : (
                    <ul className="list-group">
                        {userlist.map(user => (
                            <li key={user.id} className="list-group-item">
                                {user.name} - {user.department}
                                <button onClick={()=>navigate(`/view-user/${user.id}`)}>Chi tiết</button>
                                <button onClick={()=>handleDelete(user.id)}>Xóa</button>
                            </li>
                        ))}
                    </ul>
                )}
                <button onClick={()=>{navigate('/add-user')}}>Đăng kí</button>


            </div>
        </>
    );
}
export default ListUsers;
