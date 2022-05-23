import { Link } from "react-router-dom"
const Header = () => {
    return <>
    <ul class="nav nav-pills nav-fill">
  <li class="nav-item">
  <Link to='/' className="nav-link badge-dark" >Home</Link>

  </li>
  <li class="nav-item">
  <Link to='/s3/list' className="nav-link " color="black">S3 Buckets</Link>
  </li>

  <li class="nav-item">
  <Link to='/ec2/list' className="nav-link ">EC2 Instances</Link>
  </li>
</ul>
    </>
}
export default Header;

