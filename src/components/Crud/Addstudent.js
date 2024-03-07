import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";




function Addstudent() {

    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [fathername, setFathername] = useState('');
    const [age, setAge] = useState('');
    const [nameError, setNameError] = useState(false);
    const [nameLengthError, setNameLengthError] = useState(false);
    const [fatherNameError, setfatherNameError] = useState(false);
    const [fatherLengthError, setfatherLengthError] = useState(false);
    const [ageError, setageError] = useState(false);
    const [ageLengthError, setageLengthError] = useState(false);


    const handleChangeInput = (event) => {

        let id = event.target.id;
        let value = event.target.value;

        if (id == "Name") { setName(value) }
        if (id == "FatherName") { setFathername(value) }
        if (id == "Age") { setAge(value) }

        // console.log('name', name);
    }

    useEffect(() => {
        //Runs only on the first render
    }, []);

    const validateForm = () => {

        let emailPattern = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        let passwordPattern = /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

        let Name = name;
        let Fathername = fathername;
        let Age = age;
        if (Name == '') {
            setNameError(true);
            setNameLengthError(false);
        } else {
            if (Name.length <= 3) {
                setNameLengthError(true);
                setNameError(false);
            }
            else {
                setNameLengthError(false)
            }
            setNameError(false);
        }

        if (Fathername == '') {
            setfatherLengthError(false);
            setfatherNameError(true);
        } else {
            if (Fathername.length <= 3) {
                setfatherLengthError(true);
            }
            else {
                setfatherLengthError(false);
            }
            setfatherNameError(false);
        }


        if (Age == '') {
            setageLengthError(false);
            setageError(true);
            // console.log('Age.length',Age.length);
        } else {
            if (Age > 100) {
                setageLengthError(true);
            }
            else {
                setageLengthError(false);
            }
            setageError(false);
        }

        // if (Age == '') {
        //     setageError(true);
        //     setageLengthError(false);
        // } else {
        //     if (Age.length != 100) {
        //         setageLengthError(true);
        //     } else {
        //         setageLengthError(false);
        //     }
        //     setageError(false);
        // }

        // console.log('fghkgjcnmbn');
    }

    const Submit = () => {

        validateForm()

        if (name && fathername && age && !nameError && !nameLengthError && !fatherNameError && !fatherLengthError && !ageError && !ageLengthError) {
            // Your code here

            axios.post('http://localhost:5000/Crud/createuser', {
                Name: name,
                FatherName: fathername,
                Age: age
            })
                .then(function (response) {
                    console.log(response);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });

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

        }

        // console.log('haiii');
    }

    return (
        <>
            <section>
                <form>
                    <div class="row mt-5">
                        <div class="col">
                            <input type="text" name id="Name" onChange={handleChangeInput} value={name} class="form-control" placeholder="Name" />
                            {nameError ?
                                <span style={{ color: 'red', fontSize: '13px' }}>Name is required</span> : ''
                            }
                            {nameLengthError ?
                                <span style={{ color: 'red', fontSize: '13px' }}>Enter valid name</span> : ''
                            }
                        </div>
                        <div class="col">
                            <input type="text" id="FatherName" onChange={handleChangeInput} value={fathername} class="form-control" placeholder="Father Name" />
                            {fatherNameError ?
                                <span style={{ color: 'red', fontSize: '13px' }}>FatherName is required</span> : ''
                            }
                            {fatherLengthError ?
                                <span style={{ color: 'red', fontSize: '13px' }}>Enter valid FatherName</span> : ''
                            }
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col">
                            <input type="number" id="Age" onChange={handleChangeInput} value={age} class="form-control" placeholder="Age" />
                            {ageError ?
                                <span style={{ color: 'red', fontSize: '13px' }}>Age is required</span> : ''
                            }
                            {ageLengthError ?
                                <span style={{ color: 'red', fontSize: '13px' }}>Enter valid Age</span> : ''
                            }
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

export default Addstudent