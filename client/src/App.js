import { useEffect, useState } from "react";

function App() {
  const API = process.env.REACT_APP_API_URL || "http://localhost:4000";

  const [people, setPeople] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null);

  // Load data
  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setPeople(data);
  };

  // Add or update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { name, age };

    if (editId) {
      await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setEditId(null);
    } else {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setName("");
    setAge("");
    fetchPeople();
  };

  // Delete
  const deletePerson = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchPeople();
  };

  // Edit
  const editPerson = (person) => {
    setName(person.name);
    setAge(person.age);
    setEditId(person._id);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Name & Age CRUD</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <hr />

      {people.map((p) => (
        <div key={p._id}>
          <strong>{p.name}</strong> — {p.age}
          <br />
          <button onClick={() => editPerson(p)}>Edit</button>
          <button onClick={() => deletePerson(p._id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
