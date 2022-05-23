import React, { useState } from 'react';
import Data from './Components/Data';
import List from './Components/List';
import Form from './Components/BirthdayForm/Form'
import Newform from './Components/NewForm/Newform'

function App() {
    const [people, setPeople] = useState(Data);
    const dataSaveHandler=(userData)=>{
        setPeople((prevData)=>{
            return[userData,...prevData]
        })
    }
    return (
        <main>
            <React.Fragment>
                <Newform onRecieve={dataSaveHandler}/>
            </React.Fragment>
            <section className='container'>
                <h3>{people.length ? `${people.length} Birthdays Today` : "No Birthdays Today"}</h3>
                <List people={people} />
                <button onClick={() => setPeople([])}>clear all</button>
            </section>
        </main>
    );
}

export default App;