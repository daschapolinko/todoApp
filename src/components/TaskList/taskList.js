import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task';
import EditTaskForm from '../EditTaskForm';

function TaskList({ todos, onEdit, onToggleDone, onDelete, onEditLabel }) {
  const elements = todos.map((item) => {
    const { id, completed, editing, ...props } = item;
    let classN = '';
    if (completed) classN = 'completed';
    else if (editing) classN = 'editing';
    return (
      <li key={id} className={classN}>
        <Task
          {...props}
          onEdit={() => onEdit(id)}
          onToggleDone={() => onToggleDone(id)}
          onDelete={() => onDelete(id)}
        />
        {editing ? <EditTaskForm label={props.description} onEditLabel={(label) => onEditLabel(id, label)} /> : ''}
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.defaultProps = {
  todos: [],
  onToggleDone: () => {},
  onDelete: () => {},
  onEdit: () => {},
  onChangeLabel: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      creationTime: PropTypes.instanceOf(Date).isRequired,
      completed: PropTypes.bool,
      editing: PropTypes.bool,
    })
  ),
  onToggleDone: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onChangeLabel: PropTypes.func,
};

export default TaskList;
