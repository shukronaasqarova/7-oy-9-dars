import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addStudent, deleteStudent, clearAllStudents, updateStudent } from './redux/studentsSlice';
import Modal from 'react-modal';
import './App.css';

Modal.setAppElement('#root');

function App() {
  const students = useSelector(state => state.students.students);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !age) {
      alert("Iltimos, ismingiz va yoshingizni kiriting.");
      return;
    }
    const newStudent = {
      id: Date.now(),
      name,
      age: parseInt(age),
    };

    dispatch(addStudent(newStudent));
    resetForm();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedStudent = {
      id: currentStudentId,
      name,
      age: parseInt(age),
    };

    dispatch(updateStudent(updatedStudent));
    resetForm();
  };

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
  };

  const handleClear = () => {
    dispatch(clearAllStudents());
  };

  const openEditModal = (student) => {
    setName(student.name);
    setAge(student.age);
    setCurrentStudentId(student.id);
    setIsEditing(true);
    setModalIsOpen(true);
  };

  const resetForm = () => {
    setName("");
    setAge("");
    setCurrentStudentId(null);
    setIsEditing(false);
    setModalIsOpen(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-6">Talabalar Ro'yxati</h1>
      <button 
        onClick={() => setModalIsOpen(true)} 
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Talaba qo'shish
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={resetForm}
        contentLabel="Talaba qo'shish"
        className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">{isEditing ? "Talabani Yangilash" : "Yangi Talaba Qo'shish"}</h2>
        <form onSubmit={isEditing ? handleUpdate : handleAdd} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Talaba ismini kiriting"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            placeholder="Talaba yoshini kiriting"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button 
            type="submit" 
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 transform hover:scale-105"
          >
            {isEditing ? "Yangilash" : "Qo'shish"}
          </button>
          <button 
            type="button" 
            onClick={resetForm} 
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 transform hover:scale-105"
          >
            Yopish
          </button>
        </form>
      </Modal>
      <h2 className="text-2xl font-bold mt-6">Ro'yxatdagi talabalar:</h2>
      <ul className="mt-4 space-y-2">
        {students.map(student => (
          <li key={student.id} className="flex justify-between items-center bg-gray-100 p-2 rounded-md shadow">
            <span>{student.name} - {student.age} yosh</span>
            <div>
              <button 
                onClick={() => openEditModal(student)} 
                className="bg-yellow-400 text-white px-2 py-1 rounded-md hover:bg-yellow-500 transition duration-200"
              >
                Tahrirlash
              </button>
              <button 
                onClick={() => handleDelete(student.id)} 
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition duration-200 ml-2"
              >
                O'chirish
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button 
        onClick={handleClear} 
        className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200"
      >
        Barcha talabalarni tozalash
      </button>
    </div>
  );
}

export default App;
