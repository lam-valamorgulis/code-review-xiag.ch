import React from 'react';
import styles from './InputNewTodo.module.css'


// this code missing part of async DOM input value is controlled by the InputNewTodo's state and updated through callbacks.


// Defining TypeScript types for the component's props and state
type InputNewTodoProps = {
    todoTitle: string,
    onChange: (todoTitle: string) => void,
    onSubmit: (todo: any) => void,

}
type InputNewTodoState = {
    value: string
}

// Defining the InputNewTodo class component
export class InputNewTodo extends React.Component<InputNewTodoProps, InputNewTodoState> {
    // Constructor initializes the component's state with the todoTitle received through props
    // this way we controled state todoTitle from parent,and controlled input value from DOM via callback onChange function
    //   constructor(props: InputNewTodoProps) {
    //     super(props);
    //     this.state = {
    //       value: props.todoTitle,
    //     };
    //   }
    
    // The componentDidUpdate lifecycle method updates the local state if the todoTitle prop changes
    componentDidUpdate(prevProps: Readonly<InputNewTodoProps>, prevState: Readonly<InputNewTodoState>, snapshot?: any) {
        if (this.props.todoTitle !== prevProps.todoTitle) {
            this.setState({value: this.props.todoTitle})
        }
    }

    // handleChange: Updates the local state on input change and calls the onChange prop
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(e.target.value);
    }
        
    // handleKeyDown: Handles the Enter key press, prevents the default behavior, trims the
    // input value, and calls the onSubmit prop with a new todo object.
    handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.keyCode !== 13) {
            return;
        }

        event.preventDefault();

        var val = this.state.value.trim();

        if (val) {
            this.props.onSubmit({
                // add id
                title: this.state.value,
                isDone: false,
            });
            this.props.onChange('');
        }
    }

    render() {
        return (
            <input
                className={styles['new-todo']}
                type="text"
                value={this.props.todoTitle}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                placeholder="What needs to be done?"
            />
        );
    }
}
