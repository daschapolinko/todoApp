import React, { useState } from 'react';

import './App.css';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';

export default function App() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [maxId, setMaxId] = useState(0);

  function toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((item) => item.id === id);
    const oldItem = arr[idx];
    if (oldItem.timerId) {
      clearInterval(oldItem.timerId);
    }
    const value = !oldItem[propName];
    const item = { ...arr[idx], [propName]: value };
    return [...arr.slice(0, idx), item, ...arr.slice(idx + 1)];
  }

  const addSec = (id) => {
    setItems((arr) => {
      const idx = arr.findIndex((item) => item.id === id);
      const oldItem = arr[idx];
      const value = oldItem.timer + 1;
      const item = { ...arr[idx], timer: value };
      const newItems = [...arr.slice(0, idx), item, ...arr.slice(idx + 1)];
      return newItems;
    });
  };

  const onToggleDone = (id) => {
    const newItems = toggleProperty(items, id, 'completed');
    setItems(newItems);
  };

  const onToggleTimer = (id) => {
    const idx = items.findIndex((item) => item.id === id);
    const oldItem = items[idx];
    let timerNewId = null;
    if (oldItem.timerId) {
      clearInterval(oldItem.timerId);
    } else {
      timerNewId = setInterval(() => addSec(id), 1000);
    }
    const item = { ...items[idx], timerId: timerNewId };
    const newItems = [...items.slice(0, idx), item, ...items.slice(idx + 1)];
    setItems(newItems);
  };

  const onEdit = (id) => {
    const newItems = toggleProperty(items, id, 'editing');
    setItems(newItems);
  };

  const onDelete = (id) => {
    const idx = items.findIndex((item) => item.id === id);
    const newItems = [...items.slice(0, idx), ...items.slice(idx + 1)];
    setItems(newItems);
  };

  const onClearCompleted = () => {
    const newItems = items.filter((item) => !item.completed);
    setItems(newItems);
  };

  const onItemAdded = (label, timer) => {
    if (label.trim()) {
      const newItem = {
        id: maxId + 1,
        description: label,
        creationTime: new Date(),
        timer,
        timerId: null,
        completed: false,
        editing: false,
      };
      const newItems = [...items, newItem];
      setItems(newItems);
      setMaxId(newItem.id);
    }
  };

  const onEditLabel = (id, label) => {
    if (label.trim()) {
      const idx = items.findIndex((item) => item.id === id);
      const oldItem = items[idx];
      const value = !oldItem.editing;
      const item = { ...items[idx], description: label, editing: value };
      const newItems = [...items.slice(0, idx), item, ...items.slice(idx + 1)];
      setItems(newItems);
    }
  };

  const filterItems = () => {
    if (filter === 'all') {
      return items;
    }
    if (filter === 'active') {
      return items.filter((item) => !item.completed);
    }
    if (filter === 'completed') {
      return items.filter((item) => item.completed);
    }
    return false;
  };

  const doneTodos = items.filter((item) => item.completed);
  const toDoCount = items.length - doneTodos.length;
  const visibleItems = filterItems();

  return (
    <div className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <NewTaskForm onItemAdded={onItemAdded} />
      </header>
      <TaskList
        todos={visibleItems}
        onToggleDone={onToggleDone}
        onToggleTimer={onToggleTimer}
        onDelete={onDelete}
        onEdit={onEdit}
        onEditLabel={onEditLabel}
      />
      <Footer
        itemsLeft={toDoCount}
        onClearCompleted={onClearCompleted}
        filter={filter}
        onFilterChange={(newFilter) => setFilter(newFilter)}
      />
    </div>
  );
}
