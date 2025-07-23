import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddStudent() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [gpa, setGpa] = useState(0);
    const handleAdd = () => {
        if (!name || !studentClass || gpa === null || gpa === undefined) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        const newStudent = {
            name: name,
            class: studentClass,
            gpa: Number(gpa)
        };

        axios.post('http://localhost:8888/students', newStudent)
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error('Lỗi khi thêm học sinh:', error);
            });
    };

    return (
        <div className="container mt-4">
            <h3>Thêm học sinh mới</h3>

            <div className="mb-3">
                <label>Tên học sinh</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Nhập tên"
                />
            </div>

            <div className="mb-3">
                <label>Lớp</label>
                <input
                    type="text"
                    className="form-control"
                    value={studentClass}
                    onChange={e => setStudentClass(e.target.value)}
                    placeholder="Nhập lớp"
                />
            </div>

            <div className="mb-3">
                <label>GPA</label>
                <input
                    type="number"
                    step="0.1"
                    className="form-control"
                    value={gpa}
                    onChange={e => setGpa(e.target.value === '' ? 0 : Number(e.target.value))}
                    placeholder="Nhập GPA"
                />
                
            </div>
            <button className="btn btn-success" onClick={handleAdd}>Thêm mới</button>
            <button className="btn btn-secondary ms-2" onClick={() => navigate('/')}>Hủy</button>
        </div>
    );
}

export default AddStudent;
