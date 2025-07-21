import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
function ListStudent() {
    let navigate = useNavigate();
    let [studentlist, setStudentlist] = useState([]);
    useEffect(() => {
    const loadStudent = () => {
        axios.get('http://localhost:8888/students')
            .then(response => {
                setStudentlist(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };
        loadStudent()
    }, []);
    let handleDelete =(id)=>{
        let confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sinh viên này?");
        if(confirmDelete) {
            axios.delete(`http://localhost:8888/students/${id}`)
                .then(() => {
                    setStudentlist(studentlist.filter(student => student.id !== id));
                })
                .catch(error => {
                    console.error("Lỗi khi xóa sinh viên:", error);
                });
        }
    }
  return (
  <>
      <div className="container mt-4">
          <h3>Danh sách sinh viên</h3>
          {studentlist.length === 0 ? (
              <p>Không có dữ liệu.</p>
          ) : (
              <ul className="list-group">
                  {studentlist.map(student => (
                      <li key={student.id} className="list-group-item">
                          {student.name} - {student.class}
                          <button onClick={()=>handleDelete(student.id)}>Xóa</button>
                      </li>
                  ))}
              </ul>
          )}
          <button onClick={()=>{navigate('/addstudent')}}>Thêm mới</button>


      </div>
  </>
  );
}
export default ListStudent;
