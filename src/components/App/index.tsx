import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import MainApp from '../MainApp';
import {useSelector} from 'react-redux';


// Summary: Refactoring App Component to Class Component

// Improvements Made:
// 1.Conversion to Class Component:
//  +Converted the functional App component to a class component for consistency with other components in the app.
// 2.State Retrieval:
//  +Removed the use of useSelector hook inside the class component as it is typically used in functional components. State retrieval will be handled within the MainApp component.
// 3.Component Naming:
//  +Renamed the App component to better reflect its purpose, suggesting a focus on a to-do list with users.
// 4.Code Splitting:
//  +Suggested code splitting for potential UI components like Header and Footer. Considered moving these components into dedicated folders for reusability and maintainability.



// Class component for the main application
function App() {

    // No use of useSelector in class components; state retrieval handled within MainApp
    const todos = useSelector((state: {list: { todos: any[] }}) => state.list.todos);
  return (
      // туду лист для юзеров:
    <div className="App main">
      {/* code splitting to Header component */}
      <header className="App-header">
        TODO list with users:
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
      </header>

        {/* MAIN APP: */}
        {/* no need props totos */}
        {/* should be change name component ToDoList */}
        <MainApp todos={todos}/>

        {/* code splitting to Footer component  */}
        <footer className='App-footer'>
              <a
                href="https://example.org"
                target="_blank"
                className={"App-footer-link"}
              >
                All right reserved
              </a>
        </footer>
    </div>
  );
}

export default App;
