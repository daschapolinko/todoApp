import React, { Component } from 'react';

import './App.css';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';

function toggleProperty(arr, id, propName) {
  const idx = arr.findIndex((item) => item.id === id);
  const oldItem = arr[idx];
  const value = !oldItem[propName];
  const item = { ...arr[idx], [propName]: value };
  return [...arr.slice(0, idx), item, ...arr.slice(idx + 1)];
}

export default class App extends Component {
  state = {
    items: [],
    filter: 'all',
    maxId: 0,
  };

  addSec = (id) => {
    this.setState((state) => {
      const arr = state.items;
      const idx = arr.findIndex((item) => item.id === id);
      const oldItem = arr[idx];
      const value = oldItem.timer + 1;
      const item = { ...arr[idx], timer: value };
      const items = [...arr.slice(0, idx), item, ...arr.slice(idx + 1)];
      return { items };
    });
  };

  onToggleDone = (id) => {
    this.setState((state) => {
      const items = toggleProperty(state.items, id, 'completed');
      return { items };
    });
  };

  onToggleTimer = (id) => {
    this.setState((state) => {
      const arr = state.items;
      const idx = arr.findIndex((item) => item.id === id);
      const oldItem = arr[idx];
      let timerNewId = null;
      if (oldItem.timerId) {
        clearInterval(oldItem.timerId);
      } else {
        timerNewId = setInterval(() => this.addSec(id), 1000);
      }
      const item = { ...arr[idx], timerId: timerNewId };
      const items = [...arr.slice(0, idx), item, ...arr.slice(idx + 1)];
      return { items };
    });
  };

  onEdit = (id) => {
    this.setState((state) => {
      const items = toggleProperty(state.items, id, 'editing');
      return { items };
    });
  };

  onDelete = (id) => {
    this.setState((state) => {
      const idx = state.items.findIndex((item) => item.id === id);
      const items = [...state.items.slice(0, idx), ...state.items.slice(idx + 1)];
      return { items };
    });
  };

  onClearCompleted = () => {
    this.setState((state) => {
      const items = state.items.filter((item) => !item.completed);
      return { items };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  onItemAdded = (label, timer) => {
    if (label.trim()) {
      this.setState((state) => {
        const newItem = {
          id: state.maxId + 1,
          description: label,
          creationTime: new Date(),
          timer,
          timerId: null,
          completed: false,
          editing: false,
        };
        const items = [...state.items, newItem];
        return { items, maxId: newItem.id };
      });
    }
  };

  onEditLabel = (id, label) => {
    if (label.trim()) {
      this.setState((state) => {
        const arr = state.items;
        const idx = arr.findIndex((item) => item.id === id);
        const oldItem = arr[idx];
        const value = !oldItem.editing;
        const item = { ...arr[idx], description: label, editing: value };
        const items = [...arr.slice(0, idx), item, ...arr.slice(idx + 1)];
        return { items };
      });
    }
  };

  filterItems(filter) {
    const { items } = this.state;
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
  }

  render() {
    const { items, filter } = this.state;
    const doneTodos = items.filter((item) => item.completed);
    const toDoCount = items.length - doneTodos.length;
    const visibleItems = this.filterItems(filter);
    return (
      <div className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm onItemAdded={this.onItemAdded} />
        </header>
        <TaskList
          todos={visibleItems}
          onToggleDone={this.onToggleDone}
          onToggleTimer={this.onToggleTimer}
          onDelete={this.onDelete}
          onEdit={this.onEdit}
          onEditLabel={this.onEditLabel}
        />
        <Footer
          itemsLeft={toDoCount}
          onClearCompleted={this.onClearCompleted}
          filter={filter}
          onFilterChange={this.onFilterChange}
        />
      </div>
    );
  }
}
