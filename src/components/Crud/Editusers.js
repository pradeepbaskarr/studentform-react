import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";




function EditUsers() {

    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [fathername, setFathername] = useState('');
    const [age, setAge] = useState('');

    const [singleUserList, setsingleUserList] = useState([]);

    const [initialname, setinitialname] = useState('');
    const [initialfathername, setinitialfathername] = useState('');
    const [initialage, setinitialage] = useState('');

    let { id } = useParams();
    const [globalId, setGlobalId] = useState(id);



    const handleChangeInput = (event) => {

        let id = event.target.id;
        let value = event.target.value;

        if (id == "Name") {
            setName(value)
            setinitialname('')

        }
        if (id == "FatherName") {
            setFathername(value)
            setinitialfathername('')
        }
        if (id == "Age") {
            setAge(value)
            setinitialage('')
        }

        // console.log('name', name);
    }

    useEffect(() => {
        //Runs only on the first render

        // const userId = globalId;
        console.log('globalId globalId', globalId);

        axios.get(`http://localhost:5000/Crud/getstudent/${globalId}`)
            .then(function (response) {
                console.log(response);
                setsingleUserList(response.data.data);
                // Handle the received data here
            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);

    // console.log('Nameeeee', singleUserList.Name);

    // const Submit = () => {
    //     axios.post(`http://localhost:5000/Crud/updatestudent/${globalId}`, {
    //     // axios.post('http://localhost:5000/Crud/updatestudent', {

    //             Name: name,
    //             FatherName: fathername,
    //             Age: age

    //     })
    //         .then(function (response) {
    //             console.log(response);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }


    const Submit = () => {
        const dataToUpdate = {
            Name: name,
            FatherName: fathername,
            Age: age
        };

        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire("Saved!", "", "success");

                axios.put(`http://localhost:5000/Crud/updatestudent/${globalId}`, dataToUpdate)
                    .then(function (response) {
                        console.log(response);
                        navigate('/Student');
                    })
                    .catch(function (error) {
                        console.log(error);
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong!",
                            footer: '<a href="#">Why do I have this issue?</a>'
                        });
                    });

            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
                navigate('/Student');
            }
        });



        // axios.put(`http://localhost:5000/Crud/updatestudent/${globalId}`, dataToUpdate)
        //     .then(function (response) {
        //         console.log(response.data);
        //     })
        //     .catch(function (error) {
        //         console.error('Error updating student:', error);
        //     });

    };



    // const Submit = () => {
    //     const dataToUpdate = {
    //         Name: name,
    //         FatherName: fathername,
    //         Age: age
    //     };

    //     axios.post('http://localhost:5000/Crud/updatestudent', {
    //         id: globalId, // Include the ID as part of the payload
    //         ...dataToUpdate // Spread the other data to update
    //     })
    //     .then(response => {
    //         console.log(response);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
    // };


    useEffect(() => {

        setinitialname(singleUserList.Name)
        setinitialfathername(singleUserList.FatherName)
        setinitialage(singleUserList.Age)

        console.log('Nameeeee', singleUserList.Name);
    }, [singleUserList]);


    // console.log('singleUserListsingleUserList', singleUserList);



    return (
        <>
            <section>
                <form>
                    <div class="row mt-5">
                        <div class="col">
                            <input type="text" name id="Name" onChange={handleChangeInput} value={initialname || name} class="form-control" placeholder="Name" />
                        </div>
                        <div class="col">
                            <input type="text" id="FatherName" onChange={handleChangeInput} value={initialfathername || fathername} class="form-control" placeholder="Father Name" />
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col">
                            <input type="number" id="Age" onChange={handleChangeInput} value={initialage || age} class="form-control" placeholder="Age" />
                        </div>
                        <div class="col">
                        </div>
                    </div>
                </form>

                <div className="" style={{ float: "right" }}>
                    <button type="button" onClick={Submit} class="ml-2 btn btn-outline-success"> Submit </button>
                </div>


            </section>
        </>
    )
}

export default EditUsers