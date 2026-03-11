import { useState, useEffect } from "react";

const StudentForm = ({ addStudent, updateStudent, currentStudent }) => {

  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: ""
  });

  const [errors, setErrors] = useState({});

  /* ===== PREFILL DATA WHEN EDITING ===== */

  useEffect(() => {
    if (currentStudent) {
      setStudent(currentStudent);
    }
  }, [currentStudent]);

  /* ===== HANDLE INPUT CHANGE ===== */

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  /* ===== VALIDATION ===== */

  const validate = () => {

    const newErrors = {};

    if (!student.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!student.email.trim()) {
      newErrors.email = "Email is required";
    } 
    else if (!/\S+@\S+\.\S+/.test(student.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!student.age) {
      newErrors.age = "Age is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ===== SUBMIT ===== */

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!validate()) return;

    if (student.id) {
      updateStudent(student);
    } else {
      addStudent(student);
    }

    setStudent({
      name: "",
      email: "",
      age: ""
    });
  };

  return (

    <form onSubmit={handleSubmit} className="student-form">

      <input
        name="name"
        value={student.name}
        onChange={handleChange}
        placeholder="Name"
      />
      {errors.name && <p className="error">{errors.name}</p>}

      <input
        name="email"
        value={student.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <input
        name="age"
        value={student.age}
        onChange={handleChange}
        placeholder="Age"
        type="number"
      />
      {errors.age && <p className="error">{errors.age}</p>}

      <button type="submit">
        {student.id ? "Update Student" : "Add Student"}
      </button>

    </form>
  );
};

export default StudentForm;