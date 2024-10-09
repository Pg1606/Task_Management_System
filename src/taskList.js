import React from "react";

import './taskList.css';

const TaskList = ({tasks, onEdit, deleteTask}) => {
  return (
    <div>
      <h2>Task List</h2>
      {tasks.length > 0 && (
        <table className="task-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.taskName}</td>
                <td>{task.taskStatus}</td>
                <td>{task.assignedTo}</td>
                <td>
                  <button className="delete-btn" onClick={() => deleteTask(index)}>Delete</button>
                  <button className="edit-btn" onClick={() => onEdit(task)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TaskList;