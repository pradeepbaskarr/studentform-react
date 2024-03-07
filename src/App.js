import logo from './logo.svg';
import './App.css';
import SideNavbar from './components/SideNavbar/SideNavbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Student from './components/Students/Student';
import Home from './components/Home/Home';
import Addstudent from './components/Crud/Addstudent';
import EditUsers from './components/Crud/Editusers';

function App() {
  return (
    <Router>
      <div className='container-fluid'>
        <section>
          <div className="row g-0 no-gutters">
            <SideNavbar />
            <div className="col-9 ">
              <div>
                <nav class="navbar navbar-light bg-light">
                  <a class="navbar-brand">AdminPanel</a>
                  <form class="form-inline">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                  </form>
                </nav>
              </div>
              <div>
                <Routes>
                  <Route path="/" element={<Student />} />
                  <Route path="/Home" element={<Home />} />
                  <Route path="/Student" element={<Student />} />
                  <Route path="/Addstudent" element={<Addstudent />} />
                  <Route path="/EditUsers/:id" element={<EditUsers />} />
                </Routes>
              </div>

            </div>
          </div>
        </section>
      </div>


    </Router>

  );
}

export default App;
