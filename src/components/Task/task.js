import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

function Task({ description, timer, completed, creationTime, onToggleDone, onToggleTimer, onDelete, onEdit }) {
  return (
    <div className="view">
      <input className="toggle" type="checkbox" onClick={onToggleDone} checked={completed} onChange={() => {}} />
      <label>
        <span className="title">{description}</span>
        <span className="description">
          <button type="button" className="icon icon-play" onClick={onToggleTimer} disabled={!!completed} />
          <button type="button" className="icon icon-pause" onClick={onToggleTimer} disabled={!!completed} />
          {`${Math.floor(timer / 60)}:${timer % 60}`}
        </span>
        <span className="description">
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
  onToggleTimer: () => {},
  onDelete: () => {},
  onEdit: () => {},
};

Task.propTypes = {
  description: PropTypes.string.isRequired,
  creationTime: PropTypes.instanceOf(Date),
  onToggleDone: PropTypes.func,
  onToggleTimer: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default Task;
