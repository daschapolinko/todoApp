import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

function Task({ description, completed, creationTime, onToggleDone, onDelete, onEdit }) {
  return (
    <div className="view">
      <input className="toggle" type="checkbox" onClick={onToggleDone} checked={completed} onChange={() => {}} />
      <label onClick={onToggleDone}>
        <span className="description">{description}</span>
        <span className="created">
          created {formatDistanceToNow(creationTime, { addSuffix: true, includeSeconds: true })}
        </span>
      </label>
      <button type="button" className="icon icon-edit" onClick={onEdit} />
      <button type="button" className="icon icon-destroy" onClick={onDelete} />
    </div>
  );
}

Task.defaultProps = {
  creationTime: Date.now(),
  onToggleDone: () => {},
  onDelete: () => {},
  onEdit: () => {},
};

Task.propTypes = {
  description: PropTypes.string.isRequired,
  creationTime: PropTypes.instanceOf(Date),
  onToggleDone: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default Task;
