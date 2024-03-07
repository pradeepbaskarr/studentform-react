import { Link } from "react-router-dom";

const SideNavbar = () => {
    return(
        <div className="col-3 ">
                        <div class="card" style={{ height: '90vh' }}>
                            <div class="card-header">
                                Featured
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"> <Link to="/Home">Home</Link> </li>
                                <li class="list-group-item"> <Link to="/Student">Student</Link>  </li>
                                <li class="list-group-item">Dashboard</li>
                                
                            </ul>
                        </div>
                    </div>
    )
}

export default SideNavbar;