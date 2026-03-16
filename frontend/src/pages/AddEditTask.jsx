import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

const AddEditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({ title: "", description: "", status: "pending" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      API.get(`/backend/${id}`).then(({ data }) => setForm(data));
    }
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isEdit) {
        await API.put(`/backend/${id}`, form);
      } else {
        await API.post("/backend/add", form);
      }
      navigate("/tasks");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
      <div className="card border-0 shadow-sm p-4" style={{ width: "100%", maxWidth: "480px" }}>
        <h5 className="fw-semibold mb-4">{isEdit ? "Edit Task" : "New Task"}</h5>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-muted small">Title</label>
            <input type="text" name="title" className="form-control" value={form.title} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label text-muted small">Description</label>
            <textarea name="description" className="form-control" rows={3} value={form.description} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="form-label text-muted small">Status</label>
            <select name="status" className="form-select" value={form.status} onChange={handleChange}>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-dark w-100">{isEdit ? "Update" : "Add Task"}</button>
            <button type="button" className="btn btn-outline-secondary w-100" onClick={() => navigate("/tasks")}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditTask;