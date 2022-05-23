import Form from '../BirthdayForm/Form'
import './Newform.css'
import {Fragment} from 'react'

const Newform = (props) => {
    const getData=(userData)=>{
        const formData={
            ...userData,
            id: Math.random().toString()
        }
        props.onRecieve(formData)
    }
    return (
        <Fragment>
            <Form dataSave={getData} />
        </Fragment>
    )
}

export default Newform