import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class newTaskForm extends Component {
  state = {
    label: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { label } = this.state;
    const { onItemAdded } = this.props;
    this.setState({ label: '' });
    onItemAdded(label);
  };

  render() {
    const { label } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChange}
          value={label}
        />
      </form>
    );
  }
}

newTaskForm.defaultProps = {
  onItemAdded: () => {},
};

newTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
};
