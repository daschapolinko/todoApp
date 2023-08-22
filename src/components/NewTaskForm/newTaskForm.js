import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class newTaskForm extends Component {
  state = {
    label: '',
    mins: '',
    secs: '',
  };

  onLabelChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = () => {
    const { onItemAdded } = this.props;
    const { label, mins, secs } = this.state;
    this.setState({ label: '', mins: '', secs: '' });
    onItemAdded(label, Number(mins) * 60 + Number(secs));
  };

  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.onSubmit();
    }
  };

  render() {
    const { label, mins, secs } = this.state;
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit} onKeyDown={this.onKeyDown}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChange}
          name="label"
          value={label}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          onChange={this.onLabelChange}
          name="mins"
          value={mins}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          onChange={this.onLabelChange}
          name="secs"
          value={secs}
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
