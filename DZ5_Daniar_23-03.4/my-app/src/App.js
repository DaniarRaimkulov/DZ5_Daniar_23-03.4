import { useState } from 'react';
import classes from './App.module.css';
import Container from './components/Container/Container';
import Button from './components/Button/Button';
import TodoCard from './components/TodoCard/TodoCard';

function App() {
  const [isShow, setIsShow] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [search, setSearch] = useState('');
  const [currentEdit, setCurrentEdit] = useState(null);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Кодирование', completed: false },
    { id: 2, title: 'Ешь', completed: false },
    { id: 3, title: 'Sleep', completed: false },
    { id: 4, title: 'Кодирование', completed: false },
    { id: 5, title: 'Coding', completed: false },
  ]);
  const [filter, setFilter] = useState('все');

  const handleShow = () => setIsShow(!isShow);

  const handleAddTask = () => {
    if (newTask.length < 1) return;
    setTasks(prevState => [
      ...prevState,
      { id: Date.now(), title: newTask, completed: false },
    ]);
    setNewTask('');
    setIsShow(false);
  };

  const handleDone = id => {
    const newList = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      } else {
        return task;
      }
    });
    setTasks(newList);
  };

  const handleClearTasks = () => {
    setTasks([]);
    localStorage.clear();
  };

  const handleDelete = id => {
    const newList = tasks.filter(task => task.id !== id);
    setTasks(newList);
  };

  const handleEdit = editTask => {
    const newList = tasks.map(task =>
      task.id === editTask.id ? editTask : task
    );
    setTasks(newList);
    setCurrentEdit(null);
  };

  const filteredTasks = tasks
    .filter(task =>
      filter === 'выполнено'
        ? task.completed
        : filter === 'notCompleted'
        ? !task.completed
        : true
    )
    
    .filter(task => task.title.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <Container setFilter={setFilter} filter={filter}>
        <div className={classes.wrapper}>
          {filteredTasks.map(task => (
            <TodoCard
              handleDone={handleDone}
              handleDelete={handleDelete}
              handleSelectEdit={setCurrentEdit}
              handleEdit={handleEdit}
              isEdit={currentEdit === task.id}
              key={task.id}
              task={task}
            />
          ))}
        </div>
      </Container>
      <div className={classes.addTask}>
        <input
          type="text"
          placeholder="Добавить задачу"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
        <Button handleClick={handleAddTask}>Добавить</Button>
        <Button handleClick={handleShow}>
          {isShow ? 'Отмена' : 'Добавить'}
        </Button>
      </div>
      <Button handleClick={handleClearTasks}>Очистить все задачи</Button>
    </div>
  );
}

export default App;
