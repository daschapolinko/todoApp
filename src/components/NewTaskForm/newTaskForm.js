import React, { Component } from "react";
import PropTypes from "prop-types";

export default class newTaskForm extends Component {

    state = {
        label: ''
    }

    static defaultProps = {
        onItemAdded: () => {}
    }

    static propTypes = {
        onItemAdded: PropTypes.func
    }

    onLabelChange = (e) => {
      this.setState({
        label: e.target.value
      })
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { label } = this.state;
        this.setState({ label: '' });
        this.props.onItemAdded(label);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text"
                        className="new-todo" 
                        placeholder="What needs to be done?" 
                        autoFocus 
                        onChange={this.onLabelChange} 
                        value={this.state.label} />
            </form>
        )
    }
};