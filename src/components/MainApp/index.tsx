import React from 'react';
import { Form } from 'react-bootstrap';
import { InputNewTodo } from '../InputNewTodo';
import UserSelect from '../UserSelect';
import { connect } from 'react-redux';
import styles from './MainApp.module.css';



// A.Readability Improvements:
// Variable and function names should be clarified to enhance code readability:
// Index component is meaningless, switch to TodoList

// B.Code pattern, architect, creating and relation between component:

// ********DATA FLOW********

// Method 1:
// +we should control flow of state from this parent component, passing down to child as controlled component
// +from this component we mapping state and dispatch action creator to store to update state and get the latest state
// Benefit :central state in parent component, make it easy to predict flow of data
// Trade-off: if state go down more level below, will cause prop-drilling 

// Method 2:
// To prevent drop-drilling, we can connect component to store, and extract portion of state and action creator that fit component needs
// Benefit : easy to implement code, easy to observe state
// trade-off: we write more code, inside component, each child component we connect to store

// With the current code-base: it would be better to use Method 1:
// +because this is 1 level tree level
// +easy to maintain other child component file <InputNewTodo/> and <UserSelect/>

// DATA FlOW INSIDE APP COMPONENT:

// 1. List of To-Do List:
//  +<TodoList/> component (<Index/>) serves as the parent
//  +Retrieving the list of tasks from the store and passing each to-do item to TodoItem component as props.
//  +But if we splitting code into <TodoItem/> component,we will do a lot of modified app file and component :
// => so it's better to keep current structure code as it is in this file

// 2. User data:
// + There is an option list of users fetched from a remote API
// + This data can be shareable across child To-do-tem components. 
// => The user data is fetched inside this component (parent) and pass down to TodoItem component,
//  ensuring that the necessary data is readily available without causing unnecessary delays in the application flow.

// 3.Handling input Title Data when user make interaction with Input Form:
// +handleTodoTitle(name should be handleChangeValueTitle) handles user typing input data asynchronously.
// +Controlled component (<InputNewTodo/>) ensures that the state input value inside <InputNewTodo/> is controlled from the parent component (<TodoList/>). 
// This is achieved by passing state (todoTitle) and callback functions (handleTodoTitle) as props.

// 3.handleSubmitTodo data:
// Similar to handling input data changes, but specifically for form submission.
// Updates the to-do-list in the store by connecting to the Redux store through a dispatch action addTodo.

// 4. handleAssignUser:
// Controlled components <UserSelect/> manage the state of user assignment. 
// passing props todo.Id, callback function (handleAssignUser), and a list of users .
// Updates the to-do-list in the store by connecting to the Redux store through a dispatch action assignUser.

// 5. handleToogle:
// Similar data flow handleAssignUser.
// State is updated by dispatching the toggleTodo action.

// DATA IN COMPONENT INTERACT WITH STORE:
// mapStateToProps retrieves state from the store.
// mapDispatchToProps dispatches actions to update the store.
// The component is connected to the store using connect.

// C.APP LOGIC:
// + if all task is marked as done is trigger all all todos checkedbox
// + remove global state allTodosIsDone, this is make the latest item in todo when checked trigger the todos checkedbox


// adding a id for interface 
// this is important because in react using "key" props helps React identify which items have changedoptimize render
type Todo = {
    // id: unique value can be date.now()
    title: string,
    user?: number,
    isDone: boolean,
}

// name should be TodoProps
type MainAppProps = {
    todos: Todo[],
    // clarify t => todo
    addTodo: (t: Todo) => void,
    changeTodo: (todos: Todo[]) => void,
}

// name should be TodoState
type MainAppState = {
    todoTitle: string
};

// change Index for meaningful Name like TodoList
class Index extends React.Component<MainAppProps, MainAppState> {
    // constructa state in this component
    constructor(props: MainAppProps) {
        super(props);

        // add one more state list of user to passing a list of user down to children component
        // this.state = { todoTitle: '', users: [] };
        this.state = { todoTitle: '' }
    }

    // --------REMOTE API--------
    // using component life cycle method in class component
    // using componentDidMount() to fetch user from remote API, when success this.setState({ users }))
    // --------------------------

    // --------EVENT HANDLER--------

    // handleInputTitle:async user input value to the app state
    handleTodoTitle = (todoTitle: string) => {
        this.setState({ todoTitle })
    }
    // handleSubmit: user submit form to do input
    // typescript is Todo schema 
    handleSubmitTodo = (todo: any) => {
        this.props.addTodo(todo)
    }
    // handleAssignUser(todoId, userId) as parameter 
    // logic to dispatch action assignUser with payload {todoId, userId} to store

    // handleToggleTodo(todoId) as parameter 
    // logic to dispatch action assignUser with payload {todoId} to store

    // ------------------------------


    render() {
        // selectTodos to get todos from store via mapDispatchToProps
        // extract action creator addTodo,toggleTodo,assignUser from todoSlice

        // destructure this.state 
        // const { todoTitle, users } = this.state;
        const { todoTitle } = this.state;


        // this line of code fail logic. Should not take a global state
        // create allTodosAreDone is boolean, which check all to do item if all item isDone
        window.allTodosIsDone = true;
        this.props.todos.map(t => {
            if (!t.isDone) {
                window.allTodosIsDone = false
            } else {
                window.allTodosIsDone = true
            }
        });
        // ------------

        return (
            <div>
                {/* passing allTodosAreDone to checked props checked=allTodosAreDone */}
                <Form.Check type="checkbox" label="all todos is done!" checked={window.allTodosIsDone}/>

                <hr/>

                {/* Controlled <InputNewTodo/> component, controled state input value to the app state */}
                <InputNewTodo todoTitle={todoTitle} onChange={this.handleTodoTitle} onSubmit={this.handleSubmitTodo}/>

                {/* when maping element should not use index buil-in in map function  */}
                {/* because it not stablelist can be change sequence that affect perform optimize */}
                {/* replace t => todo for clarify */}
                {this.props.todos.map((t, idx) => (

                    // -----------------------
                    // it would be better if we code splitting this block of code into TodoItem component
                    // <TodoItem key={idx} todo={todo} users={users} />
                    // For simplify and void breaking maintain code we could keep the structure code below, and make refactor UserSelect

                    // adding key={t.id} to this div for optimze perform render
                    <div className={styles.todo} >
                        {t.title}

                        {/* passing todo data contain unique id won't cause bugs and,unpridictable state change */}
                        {/* passing callback function handleAssignUser as props to control state from parent for consistency */}
                        {/* <UserSelect todoId={todo.id} users={users} onAssignUser={handleAssignUser}/>*/}
                        <UserSelect user={t.user} idx={idx}/>

                        {/* passing callback function handleAssignUser as props to control state from parent for consistency */}
                        {/* <UserSelect todo={todo} users={users} onAssignUser={handleAssignUser}/>*/}
                        <Form.Check
                            style={{ marginTop: -8, marginLeft: 5 }}
                            type="checkbox" checked={t.isDone} 
                            // redundant props todos and map function
                            // onChange={() => this.handleToggleTodo(todo.id)}
                            onChange={(e) => {
                            const changedTodos = this.props.todos.map((t, index) => {
                                const res = { ...t }
                                if (index == idx) {
                                    res.isDone = !t.isDone;
                                }
                                return res;

                            })
                            this.props.changeTodo(changedTodos)
                        }}
                        />
                    </div>
                    // ------------------------
                ))}
                
            </div>
        );
    }
}

// code spliting 2 variable and passing all to connect() :
//  mapStateToProps: map a state to props of a React component
//  mapDispatchToProps(dispatch) : map action creators to the props of a React component.

// export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
export default connect(
    (state) => ({}),
    (dispatch) => ({
        addTodo: (todo: any) => {
            dispatch({type: 'ADD_TODO', payload: todo});
        },
        changeTodo: (todos: any) => dispatch({type: 'CHANGE_TODOS', payload: todos}),
        removeTodo: (index: number) => dispatch({type: 'REMOVE_TODOS', payload: index}),
    })

)(Index);
