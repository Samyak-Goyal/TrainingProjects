import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';

import CreateBucket from './Components/S3/Create';
import ListBucket from './Components/S3/List';
import ListObjects from './Components/S3/ListObjects';

import ListInstances from './Components/Ec2/List'
import CreateInstance from './Components/Ec2/Create'
function App() {
    return (
        <div className="container">
            <Header />
            <br />
            <center><h1>Welcome to the SDK app</h1></center>
            <Routes>

                <Route path='/s3/create' element={<CreateBucket />} />
                <Route path='/s3/list' element={<ListBucket />} />
                <Route path='/s3/listobj/:name' element={<ListObjects />} />

                <Route path='/ec2/list' element={< ListInstances />} />
                <Route path='/ec2/create' element={< CreateInstance />} />

            </Routes>
        </div>
    );
}

export default App;
