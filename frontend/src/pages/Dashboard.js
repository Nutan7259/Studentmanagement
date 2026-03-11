import { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import StudentTable from "../components/StudentTable";
import StudentForm from "../components/StudentForm";
import "../App.css";

const API_URL = "http://localhost:3000/students";

function Dashboard({ setIsAuth }) {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentStudent, setCurrentStudent] = useState(null);

  /* FETCH STUDENTS */

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {

    try {

      const response = await axios.get(API_URL);
      setStudents(response.data);

    } catch (error) {

      console.error("Error fetching students:", error);
      alert("Failed to load students");

    } finally {

      setLoading(false);

    }

  };

  /* ADD STUDENT */

  const addStudent = async (student) => {

    try {

      const res = await axios.post(API_URL, student);
      setStudents((prev) => [...prev, res.data]);

      alert("Student added successfully");

    } catch (error) {

      console.error("Add error:", error);
      alert("Failed to add student");

    }

  };

  /* DELETE STUDENT */

  const deleteStudent = async (id) => {

    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {

      await axios.delete(`${API_URL}/${id}`);

    } catch (error) {

      if (error.response?.status === 404) {
        console.warn("Student already deleted on server");
      } else {
        console.error("Delete error:", error);
        alert("Failed to delete student");
        return;
      }

    }

    setStudents((prev) => prev.filter((student) => student.id !== id));

  };

  /* UPDATE STUDENT */

  const updateStudent = async (updatedStudent) => {

    try {

      await axios.patch(`${API_URL}/${updatedStudent.id}`, updatedStudent);

      setStudents((prev) =>
        prev.map((student) =>
          student.id === updatedStudent.id ? updatedStudent : student
        )
      );

      setCurrentStudent(null);

      alert("Student updated successfully");

    } catch (error) {

      console.error("Update error:", error);
      alert("Failed to update student");

    }

  };

  /* EXPORT EXCEL */

  const exportToExcel = () => {

    if (students.length === 0) {
      alert("No student data available to export");
      return;
    }

    const formattedData = students.map((s) => ({
      ID: s.id,
      Name: s.name,
      Email: s.email,
      Age: s.age,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(data, "students.xlsx");

  };

  /* LOGOUT */

  const logout = () => {

    localStorage.removeItem("auth");
    setIsAuth(false);

  };

  return (

    <div className="container">

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 className="title">Student Management System</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <StudentForm
        addStudent={addStudent}
        updateStudent={updateStudent}
        currentStudent={currentStudent}
      />

      <button className="export-btn" onClick={exportToExcel}>
        Export Excel
      </button>

      {loading ? (
        <p className="loading">Loading students...</p>
      ) : (
        <StudentTable
          students={students}
          deleteStudent={deleteStudent}
          editStudent={setCurrentStudent}
        />
      )}

    </div>

  );

}

export default Dashboard;