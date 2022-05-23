import logo from './logo.svg';
import './App.css';
import Todos from './Components/Todos/Todos';
import NewTodo from "./Components/NewTodo/NewTodo"
import { useState } from "react";
function App() {
    const INITIAL_TODO = [
        {
            id: 't1',
            title: "this is the first title",
            priority: "High",
            date: new Date(2022, 7, 11)
        },
        {
            id: 't2',
            title: "this is the second title",
            priority: "Low",
            date: new Date(2022, 8, 11)
        },
        {
            id: 't3',
            title: "this is the third title",
            priority: "Low",
            date: new Date(2022, 7, 5)
        },
        {
            id: 't4',
            title: "this is the fourth title",
            priority: "Medium",
            date: new Date(2022, 7, 15)
        },
    ]

    const [allTodos, setAllTodos] = useState(INITIAL_TODO)
    const dataSaveHandler = (usertodo) => {

        console.log(usertodo)
        setAllTodos((prevData) => {
            return [usertodo, ...prevData]
        })
    }
    return (
        <div>
            <NewTodo onDataRecieve={dataSaveHandler} />
            <Todos todo={allTodos} />



            {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
        </div>
    );
}

export default App;
