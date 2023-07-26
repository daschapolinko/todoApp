import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class editTaskForm extends Component {
  state = {
    label: '',
  };

  componentDidMount() {
    const { label } = this.props;
    this.setState({
      label,
    });
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { onEditLabel } = this.props;
    const { label } = this.state;
    this.setState({ label: '' });
    onEditLabel(label);
  };

  onExit = () => {
    const { label, onEditLabel } = this.props;
    this.setState({ label: '' });
    onEditLabel(label);
  };

  render() {
    const { label } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" className="edit" autoFocus onChange={this.onLabelChange} value={label} />
        <button type="button" className="icon icon-destroy" onClick={this.onExit} />
      </form>
    );
  }
}

editTaskForm.defaultProps = {
  onEditLabel: () => {},
};

editTaskForm.propTypes = {
  onEditLabel: PropTypes.func,
};
