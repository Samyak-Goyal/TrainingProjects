import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import UserService from "../../Services/UserService";

const ListObjects = () => {
    const params = useParams();
    const [lists, setList] = useState([]);
    useEffect(() => {
        UserService.getObjects(params.name).then(res => {
            console.log(res);
            var xyz= res.data;

            setList(xyz.Contents);
        }).catch(err => {
            console.log(err);
        })
    }, []);
    return <>
        <div className='bucketlist'>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Modified At</th>
                    </tr>
                </thead>
                <tbody>
                    {lists.map(list => {
                        return <tr key={list.LastModified}>
                            <td>{list.Key}</td>
                            <td>{list.LastModified}</td>
                        </tr>
                    })}
                    {lists.length === 0 && <p>No file to show</p>}
                </tbody>
            </table>
        </div>
    </>
}

export default ListObjects