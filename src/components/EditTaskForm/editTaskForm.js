import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function editTaskForm({ label, onEditLabel }) {
  const [input, setInput] = useState(label);

  const onSubmit = (e) => {
    e.preventDefault();
    setInput('');
    onEditLabel(input);
  };

  const onExit = () => {
    setInput('');
    onEditLabel(label);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" className="edit" autoFocus onChange={(e) => setInput(e.target.value)} value={input} />
      <button type="button" className="icon icon-destroy" onClick={onExit} />
    </form>
  );
}

editTaskForm.defaultProps = {
  onEditLabel: () => {},
};

editTaskForm.propTypes = {
  onEditLabel: PropTypes.func,
};
