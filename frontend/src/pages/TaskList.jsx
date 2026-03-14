import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

const statusBadge = { pending: "secondary", "in-progress": "warning", completed: "success" };

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/backend");
      setTasks(data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;
    await API.delete(`/backend/${id}`);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div className="container py-5" style={{ maxWidth: "720px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-semibold mb-0">My Tasks</h5>
        <Link to="/tasks/add" className="btn btn-dark btn-sm">+ Add Task</Link>
      </div>

      {loading ? (
        <p className="text-muted">Loading...</p>
      ) : tasks.length === 0 ? (
        <p className="text-muted">No tasks yet. Add one!</p>
      ) : (
        <ul className="list-group list-group-flush">
          {tasks.map((task) => (
            <li key={task._id} className="list-group-item px-0 py-3 d-flex justify-content-between align-items-start">
              <div>
                <p className="mb-1 fw-medium">{task.title}</p>
                <p className="mb-1 text-muted small">{task.description}</p>
                <span className={`badge bg-${statusBadge[task.status] || "secondary"} text-capitalize`}>
                  {task.status}
                </span>
              </div>
              <div className="d-flex gap-2 ms-3">
                <Link to={`/tasks/edit/${task._id}`} className="btn btn-outline-secondary btn-sm">Edit</Link>
                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(task._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;