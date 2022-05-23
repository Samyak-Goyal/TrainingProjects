import { useEffect } from 'react';
import UserService from '../../Services/UserService';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ListBucket = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { buckets } = useSelector(state => state);

    const deleteBucket = (name) => {
        UserService.deleteBucket(name).then(res => {
            navigate('/s3/list')
        }).catch(err => {
            alert(err.message);
            console.log(err);
        })
    }


    useEffect(() => {
        UserService.getBuckets().then(res => {
            console.log(res.data);
            dispatch({ type: 'buckets', value: res.data })
        }).catch(err => {
            console.log('error in list' + err);
        })
    }, []);

    return (
        <div className='bucketlist'>
            <table className="table table-hover table-bordered table-dark">
                <thead className="thead-dark">
                    <tr>
                        <th>Bucket Name</th>
                        <th>Time Created</th>
                        <th>Actions Available</th>
                    </tr>
                </thead>
                <tbody>
                    {buckets.map(bucket => {
                        return <tr key={bucket.CreationDate}>
                            <td>{bucket.Name}</td>
                            <td>{bucket.CreationDate}</td>
                            <td>
                                <Link to={`/s3/listobj/${bucket.Name}`} className="btn btn-outline-info">List Files</Link>
                                <button type="button" className="btn btn-outline-danger" onClick={() => deleteBucket(bucket.Name)}>Delete</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            <div>
                <center><Link to='/s3/create' className="btn btn-outline-dark">Create New Bucket</Link>
                    <br /><br /> </center>
            </div>


        </div>
    )
}
export default ListBucket;