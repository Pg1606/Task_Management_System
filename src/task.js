import React, {useState, useEffect} from 'react';

import './task.css';

const CreateNewTask = ({addTask, editTask}) => {

  const [taskName, setTaskName] = useState('');
  const [taskStatus, setTaskStatus] = useState('pending');
  const [assignedTo, setAssignedTo] = useState('');
  
  useEffect(() => {
    if (editTask) {
      setTaskName(editTask.taskName);
      setTaskStatus(editTask.taskStatus);
      setAssignedTo(editTask.assignedTo);
    }
  }, [editTask]);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskName && assignedTo) {
      const newTask = {taskName, taskStatus, assignedTo};

      addTask(newTask);

      setTaskName('');
      setTaskStatus('pending');
      setAssignedTo('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='task-name'>
          <label>Task Name: </label>
          <input type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)} 
            required
          />
        </div>
        <div className='task-status'>
          <label>Task Status: </label>
          <select
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className='assign-to'>
          <label>Assign To: </label>
          <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
          />
        </div>
        <button type='submit'>{editTask ? 'Update Task' : 'Submit Task'}</button>
      </form>
    </div>
  );
};

export default CreateNewTask;