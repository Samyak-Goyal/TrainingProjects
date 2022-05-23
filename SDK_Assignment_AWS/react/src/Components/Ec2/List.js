import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserService from "../../Services/UserService";

const ListInstance = () => {
    const [lists, setList] = useState([]);
    const navigate = useNavigate();
    const changeState = (state, id) => {
        console.log(state, id);
        UserService.changeStatus(state, id).then(res => {
            navigate('/ec2/list')
        }).catch(err => {
            console.log(err);
        })
    }
    const deleteInstance = (id) => {
        console.log(id);
        UserService.terminateInstance(id).then(res => {
            console.log(res);
            navigate('/ec2/list')
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        UserService.getInstance().then(res => {
            setList(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    return <>
        <div className='bucketlist'>
            {lists.length === 0 ? <p>No instance is created yet.</p> : <>
                <table className="table table-hover table-bordered table-dark">
                    <thead>
                        <tr>
                            <th>Created At</th>
                            <th>InstanceId</th>
                            <th>Name</th>
                            <th>InstanceType</th>
                            <th>state</th>
                            <th>Action</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                    
                         {lists.map(list => {
                            return list.Instances.map(inst => {

                                return <tr key={inst.LaunchTime}>
                                    <td>{inst.LaunchTime}</td>
                                    <td>{inst.InstanceId}</td>
                                    <td>{inst.InstanceType}</td>
                                    <td>{inst.State.Name}</td>
                                    <td>
                                        <button disabled={inst.State.Name === 'terminated' ? true : false} type="button" className="btn btn-danger" onClick={() => changeState(inst.State.Name === 'stopped' ? 'START' : 'STOP', inst.InstanceId)}>{inst.State.Name === 'stopped' ? 'START' : 'STOP'}</button>
                                    </td>
                                    <td>
                                        <button disabled={inst.State.Name === 'terminated' ? true : false} type="button" className="btn btn-danger" onClick={() => deleteInstance(inst.InstanceId)}>Terminate Instance</button>
                                    </td>
                                </tr>
                            })

                        })} 

                    </tbody>
                </table>
            </>}
        </div>
        <div>
            <center><Link to='/ec2/create' className="btn btn-outline-dark">Create New Instance</Link></center>
        </div>
    </>
};
export default ListInstance;
