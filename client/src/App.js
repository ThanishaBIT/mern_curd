import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';

// ✅ USE ENV VARIABLE (NO localhost)
const API = process.env.REACT_APP_API_URL;

function App() {

  const [people, setPeople] = useState([]);
  const [form, setForm] = useState({ name: "", age: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadPeople();
  }, []);

  const loadPeople = async () => {
    try {
      const res = await axios.get(API);
      setPeople(res.data);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  // ADD
  const addPerson = async () => {
    if (!form.name || !form.age) {
      alert("Enter name and age!");
      return;
    }

    try {
      const res = await axios.post(API, {
        name: form.name,
        age: Number(form.age),
      });

      setPeople([...people, res.data]);
      setForm({ name: "", age: "" });
    } catch (err) {
      console.error("Add error", err);
    }
  };

  // START EDIT
  const startEdit = (p) => {
    setEditId(p._id);
    setForm({ name: p.name, age: p.age });
  };

  // UPDATE
  const updatePerson = async () => {
    try {
      const res = await axios.put(`${API}/${editId}`, {
        name: form.name,
        age: Number(form.age),
      });

      setPeople(
        people.map((p) => (p._id === editId ? res.data : p))
      );
      setEditId(null);
      setForm({ name: "", age: "" });
    } catch (err) {
      console.error("Update error", err);
    }
  };

  // DELETE
  const deletePerson = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setPeople(people.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  return (
    <>
      <h3>MERN STACK CRUD APPLICATION</h3>

      <input
        type="text"
        placeholder="Enter Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Enter Age"
        value={form.age}
        onChange={(e) =>
          setForm({ ...form, age: e.target.value })
        }
      />

      {editId ? (
        <button onClick={updatePerson}>Update</button>
      ) : (
        <button onClick={addPerson}>Add</button>
      )}

      <hr />

      {people.map((p) => (
        <div key={p._id}>
          <b>{p.name}</b> - {p.age}
          <button onClick={() => startEdit(p)}>Edit</button>
          <button onClick={() => deletePerson(p._id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default App;
