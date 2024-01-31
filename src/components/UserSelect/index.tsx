import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UserSelect.module.css';


// + convert to class component
// + don't use hook inside function component
// + no need useEffect or componentDidMount because we passing the users props 
// + UserSelect receive : todo , users, onAssignUser props
// + callback function handleChange take todoId and userId as an argument and lift state up via onAssignUser 
// this component pattern same with InputNewTodo => refer this file


// modify this type base on props passing from parent
// <UserSelect todoId={todo.id} users={users} onAssignUser={handleAssignUser}/>

type UserSelectProps = {
    user?: number,
    idx: number,
}
// few note for refactor all code from line 27
// -switch to class component
// -this is select option 1 time => we no need init a state inside this component to control value change from brower DOM,
// => just using value change directly from DOM and lift state up with handleAssignUser
// -delete code from line 30-44 
// -re-write handleChange callbackfucntion
// -re-write <select> element 

function UserSelect(props: UserSelectProps) {
    const dispatch = useDispatch();
    const todos = useSelector((state: {list: { todos: any[] }}) => state.list.todos);

    React.useEffect(
        () => {
            console.log('userSelect');
            fetch('https://jsonplaceholder.typicode.com/users/').then(
                (users) => users.json(),
            ).then(users => setOptions(users))
        },
        [],
    )
    const [options, setOptions] = React.useState([]);

    const { idx } = props;

    // callback function handleChange :
    // + received user.id value when user select 
    // + lift state up handleAssignUser(user.id, e.target.value))
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const changedTodos = todos.map((t, index) => {
            const res = { ...t }
            if (index == idx) {
                console.log('props.user', props.user);
                res.user = e.target.value;
            }
            return res;
        })
        dispatch({type: 'CHANGE_TODO', payload: changedTodos})
    }

    return (
        // <select> adding value attribute which is user.id or default is empty if userId is empty
        // add special props "key" 
        <select name="user" className={styles.user} onChange={handleChange}>
            {options.map((user: any) => <option value={user.id}>{user.name}</option>)}
        </select>
    );
}

export default UserSelect;
