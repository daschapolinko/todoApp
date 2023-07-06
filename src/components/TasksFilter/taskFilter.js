import React from "react";
import PropTypes from 'prop-types'

const filterButtons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' }
  ];
  
const TaskFilter = ({ filter, onFilterChange }) => {

    const filters = filterButtons.map(({ name, label }) => {
        return (
            <li key={name}>
                <button className={name === filter ? "selected" : ''} onClick={() => onFilterChange(name)}>{label}</button>
            </li>
        )
    })
    
    return (
        <ul className="filters">
            {filters}
        </ul>
    )
};

TaskFilter.defaultProps = {
    filter: 'all',
    onFilterChange: () => {}
}

TaskFilter.propTypes = {
    filter: PropTypes.oneOf(['all', 'active', 'completed']),
    onFilterChange: PropTypes.func

}

export default TaskFilter;