import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



function Student() {

    const [studentList, setstudentList] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        //Runs only on the first render

        axios.get('http://localhost:5000/Crud/getuser', {
        })
            .then(function (response) {
                setstudentList(response.data.data)
                // console.log(response.data.data);
                // console.log('heloooo check...',studentList);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const editUser = (_id) => {
        console.log('_id:', _id);
        navigate(`/EditUsers/${_id}`);
    };

    const deleteUser = (_id) => {
        console.log('_id:', _id);
      
        axios.delete(`http://localhost:5000/Crud/deletesinglestudent/${_id}`)
          .then(function (response) {
            console.log(response);
            // Handle successful response here
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
                }
              });
          })
          .catch(function (error) {
            console.log(error);
            // Handle error here
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
          });
      };
      


    const tableDatas = studentList.map((eachdata, index) => {

        return (
            <tr key={index}>
                <th scope="row">{index}</th>
                <td>{eachdata.Name}</td>
                <td>{eachdata.FatherName}</td>
                <td>{eachdata.Age}</td>
                <td>
                    <button type="button" className="btn btn-outline-primary" onClick={() => editUser(eachdata._id)}>Edit</button>
                    <button type="button" className="ml-2 btn btn-outline-danger" onClick={() => deleteUser(eachdata._id)}>Delete</button>
                </td>
            </tr>
        );
    });


    return (
        <>
            <section>
                <table class="table table-hover">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">#ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Father Name</th>
                            <th scope="col">Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableDatas}
                    </tbody>
                </table>

                <div className="" style={{ float: "right" }}>
                    <button type="button" class="ml-2 btn btn-outline-success"> <Link to="/Addstudent">Add</Link> </button>
                </div>

            </section>
        </>
    )
}

export default Student;