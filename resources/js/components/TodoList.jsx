import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function TodoList() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [showAll, setShowAll] = useState(true);

    const handleTaskChange = (event) => {
        setTask(event.target.value);
    };

    const handleAddTask = (event) => {
        event.preventDefault();
        if (task.trim() === '') return; // Prevent adding empty tasks

        // Check for duplicate tasks
        const isDuplicate = tasks.some(t => t.name.toLowerCase() === task.toLowerCase());
        if (isDuplicate) {
            alert('Task already exists!');
            return;
        }

        const newTask = {
            id: tasks.length + 1,
            name: task,
            status: ''
        };
        setTasks([...tasks, newTask]);
        setTask(''); // Clear input field
    };

    const handleTaskStatusChange = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, status: task.status === 'Done' ? '' : 'Done' } : task
        ));
    };

    const handleDeleteTask = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            setTasks(tasks.filter(task => task.id !== id));
        }
    };

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    const filteredTasks = showAll ? tasks : tasks.filter(task => task.status === 'Pending');

    return (
        <div className="container gap-3">
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header text-center">
                            <h2>Laravel React ToDo List</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleAddTask}>
                                <div className='row'>
                                    <div className='col-8'>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="todo"
                                                placeholder="Task name"
                                                value={task}
                                                onChange={handleTaskChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <button type="submit" className="btn btn-primary">Add task</button>
                                    </div>
                                </div>
                            </form>
                            <hr />
                            <button onClick={toggleShowAll} className="btn btn-secondary mb-3">
                                {showAll ? 'Show Incomplete Tasks Only' : 'Show All Tasks'}
                            </button>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Task</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTasks.map(task => (
                                        <tr key={task.id}>
                                            <th scope="row">{task.id}</th>
                                            <td>{task.name}</td>
                                            <td>{task.status}</td>
                                            <td>
                                            {task.status === 'Done' ? (
                                                ''
                                            ) : (
                                                <button
                                                    className='btn btn-success'
                                                    onClick={() => handleTaskStatusChange(task.id)}
                                                >
                                                    ✓
                                                </button>
                                            )}
                                                <button
                                                    className='btn btn-danger'
                                                    onClick={() => handleDeleteTask(task.id)}
                                                >
                                                    x
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodoList;

if (document.getElementById('app')) {
    const Index = ReactDOM.createRoot(document.getElementById("app"));
    Index.render(
        <React.StrictMode>
            <TodoList />
        </React.StrictMode>
    );
}
