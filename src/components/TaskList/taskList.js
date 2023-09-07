import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Task from '../Task';
import EditTaskForm from '../EditTaskForm';

export default function TaskList({ todos, onEdit, onToggleDone, onToggleTimer, onDelete, onEditLabel }) {
  const elements = todos.map((item) => {
    const { id, completed, editing, ...props } = item;
    const classN = classNames({
      completed,
      editing,
    });
    return (
      <li key={id} className={classN}>
        <Task
          {...props}
          completed={completed}
          onEdit={() => onEdit(id)}
          onToggleDone={() => onToggleDone(id)}
          onToggleTimer={() => onToggleTimer(id)}
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
  onToggleTimer: () => {},
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
      timer: PropTypes.number,
      completed: PropTypes.bool,
      editing: PropTypes.bool,
    })
  ),
  onToggleDone: PropTypes.func,
  onToggleTimer: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onChangeLabel: PropTypes.func,
};
