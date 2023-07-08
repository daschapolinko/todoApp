import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../TasksFilter/taskFilter';

function Footer({ itemsLeft, onClearCompleted, filter, onFilterChange }) {
  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} items left</span>
      <TaskFilter filter={filter} onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  itemsLeft: 0,
  filter: 'all',
  onClearCompleted: () => {},
  onFilterChange: () => {},
};

Footer.propTypes = {
  itemsLeft: PropTypes.number,
  filter: PropTypes.oneOf(['all', 'active', 'completed']),
  onClearCompleted: PropTypes.func,
  onFilterChange: PropTypes.func,
};

export default Footer;
