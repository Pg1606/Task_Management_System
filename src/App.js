import './App.css';
import React, {useState, useEffect} from 'react';
import CreateNewTask from './components/task/task';
import TaskList from './components/taskList/taskList';

const App = ()  => {
  const [flag, setFlag] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  const saveToStorage = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    saveToStorage(updatedTasks);
  };

  const addTask = (newTask) => {
    if(editTask) {
      const updatedTask = tasks.map(
        (task) => task.taskName === editTask.taskName ? newTask : task
      );
      setTasks(updatedTask);
      saveToStorage(updatedTask);
      setEditTask(null);
    }
    else {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTask];
        saveToStorage(updatedTasks);
        return updatedTasks;
      });
    }
  }

  const handleEditTask = (task) => {
    setEditTask(task);
    setFlag(true);
  }

  const clearTasks = () => {
    setTasks([]);
    localStorage.removeItem('tasks'); // Clear local storage
  }

  return (
    <div className='app-container'>
      <div>
        <h1 className='title'>Task Management System</h1>
        <button className='add-btn' onClick={() => setFlag(!flag)}>
          {flag ? 'Cancel' : 'Add Task'}
        </button>
        {
          flag && <CreateNewTask addTask={addTask} editTask={editTask} />
        }
      </div>

      <div>
        <TaskList tasks={tasks} onEdit={handleEditTask} deleteTask={deleteTask} />
      </div>
      <div>
        <button className='clear-btn' onClick={clearTasks}>Clear All Tasks</button>
      </div>
    </div>
  );
};

export default App;