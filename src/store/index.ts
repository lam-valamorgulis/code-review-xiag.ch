import { configureStore } from '@reduxjs/toolkit'

// Summary: Improving Redux Store with Redux Toolkit

// Problem Statement:
// Writing reducers directly in the store.js file can become challenging to maintain as the app grows.
// Manually coding action types is error-prone and can lead to typos.
// Directly mutating the state breaks the principle of immutability, making it harder to predict state flow and introducing bugs.

// Improvements Using Redux Toolkit:
// 1.Code Splitting:
//  +Separate the logic into a dedicated file, such as todoSlice.ts, promoting a modular and organized structure.
// 2.todoSlice.ts File:
//  +Create a todoSlice.ts file to simplify the process of defining Redux reducers, actions, and action creators.
// 3.Action Creators:
//  +Leverage Redux Toolkit's createSlice to auto-generate action creators like addTodo, removeTodo, and changeTodos.
// 4.Reducers Export:
//  +Export the default todosReducer from todoSlice.ts. This reducer handles the list sof updated to-do items.
// 5.Selector Export:
//  +Export a selector, such as selectTodos, for retrieving todos data from the state.

// Benefits:
// Improved code organization and maintainability.
// Reduced chances of typos and errors in action types.
// Adherence to Redux best practices, including immutability.
// Enhanced predictability of state flow, reducing bugs and making the codebase more robust.

export default configureStore({
    reducer: {
        list: (state = {todos: []}, action) => {
            switch (action.type) {
                // don't mutate state, using spread operator , and copy new object of state
                case 'ADD_TODO': {
                    const newState = state;
                    newState.todos.push(action.payload);
                    return newState;
                }
            
                case 'REMOVE_TODO': {
                    return {
                        ...state,
                        todos: state.todos.filter((t: any, index: number) => index !== action.payload),
                    };
                }
                case 'CHANGE_TODOS': {
                    return {
                        todos: action.payload,
                    };
                }
                default:
                    return state;
            }
        }
    }
})
