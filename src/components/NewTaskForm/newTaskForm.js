import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function newTaskForm({ onItemAdded }) {
  const [label, setLabel] = useState('');
  const [mins, setMins] = useState('');
  const [secs, setSecs] = useState('');

  const onSubmit = () => {
    onItemAdded(label, Number(mins) * 60 + Number(secs));
    setLabel('');
    setMins('');
    setSecs('');
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit} onKeyDown={onKeyDown}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={(e) => setLabel(e.target.value)}
        name="label"
        value={label}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Min"
        autoFocus
        onChange={(e) => setMins(e.target.value)}
        name="mins"
        value={mins}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Sec"
        autoFocus
        onChange={(e) => setSecs(e.target.value)}
        name="secs"
        value={secs}
      />
    </form>
  );
}

newTaskForm.defaultProps = {
  onItemAdded: () => {},
};

newTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
};
