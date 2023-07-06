import './App.css';
import NewTaskForm from './components/NewTaskForm'
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import React, { Component } from 'react';


export default class App extends Component {

  state = {
    items: [],
    filter: 'all',
    maxId: 0
  }
  
  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((item) => item.id === id);
    const oldItem = arr[idx];
    const value = !oldItem[propName];

    const item = { ...arr[idx], [propName]: value } ;
    return [
      ...arr.slice(0, idx),
      item,
      ...arr.slice(idx + 1)
    ];
  };

  onToggleDone = (id) => {
    this.setState((state) => {
      const items = this.toggleProperty(state.items, id, 'completed');
      return { items };
    });
  };

  onEdit = (id) => {
    this.setState((state) => {
      const items = this.toggleProperty(state.items, id, 'editing');
      return { items };
    });
  };

  onDelete = (id) => {
    this.setState((state) => {
      const idx = state.items.findIndex((item) => item.id === id);
      const items = [
        ...state.items.slice(0, idx),
        ...state.items.slice(idx + 1)
      ];
      return { items };
    });
  };

  onClearCompleted = () => {
    this.setState((state) => {
      const items = state.items.filter((item) => !item.completed)
      return { items };
    });
  };

  filterItems(items, filter) {
    if (filter === 'all') {
      return items;
    } else if (filter === 'active') {
      return items.filter((item) => (!item.completed));
    } else if (filter === 'completed') {
      return items.filter((item) => item.completed);
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  onItemAdded = (label) => {
    this.setState((state) => {
      const newItem = {
        id: state.maxId + 1,
        description: label, 
        creationTime: new Date(), 
        completed: false, editing: false
      }
      const items = [...state.items, newItem];
      return { items,  maxId: newItem.id };
    });
  }

  onEditLabel = (id, label) => {
    this.setState((state) => {
    const arr = state.items
    const idx = arr.findIndex((item) => item.id === id);
    const oldItem = arr[idx];
    const value = !oldItem.editing;
    const item = { ...arr[idx], description: label, editing: value } ;
    const items = [
      ...arr.slice(0, idx),
      item,
      ...arr.slice(idx + 1)
    ]
    return { items };
  })
  }

  render() {
    const { items, filter } = this.state;
    const doneTodos = items.filter((item) => item.completed)
    const toDoCount = items.length - doneTodos.length;
    const visibleItems = this.filterItems(items, filter);
    return (
    <div className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <NewTaskForm onItemAdded={this.onItemAdded} />
      </header>
      <TaskList 
        todos={visibleItems}
        onToggleDone={this.onToggleDone}
        onDelete={this.onDelete}
        onEdit={this.onEdit} 
        onEditLabel={this.onEditLabel} />
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