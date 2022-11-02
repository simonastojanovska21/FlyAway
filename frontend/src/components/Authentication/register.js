import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAt, faLock, faUser} from "@fortawesome/free-solid-svg-icons";

const Register=(props)=>{

    const [formData, updateFormData] = React.useState({
        username: "",
        password:"",
        repeatedPassword:"",
        name:"",
        surname:"",
        phoneNumber:"",
        address:""
    })

    const handleChange=(e)=>{
        updateFormData({
            ...formData,
            [e.target.name] : e.target.value.trim()
        })
    }

    const onFormSubmit=(e)=>{
        e.preventDefault();

        const username=formData.username;
        const password=formData.password;
        const repeatedPassword=formData.repeatedPassword;
        const name=formData.name;
        const surname=formData.surname;

        props.onRegisterUser(username,password,repeatedPassword,name,surname);

        setTimeout(()=>{
            props.hideWindow()
        },500)
    }

    (function () {

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        let forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }

                    form.classList.add('was-validated')
                }, false)
            })
    })()
    return(
        <div className={"container mb-5"}>
            <div className={"ps-3 pe-3"}>
                <h1 className={"title text-center"}>Register</h1>
                <hr/>

                { localStorage.getItem("passwordDoNotMatch") === "yes" &&
                <div className="alert alert-danger" id="passwordDoNotMatch" role="alert">
                    Passwords you entered do not match.
                </div>
                }

                { localStorage.getItem("userExists") === "yes" &&
                <div className="alert alert-danger" id="userExists" role="alert">
                    User with that username already exists
                </div>
                }

                <form id={"registerData"} className="row g-3 needs-validation" noValidate onSubmit={onFormSubmit}>
                    <div className="col-md-12">
                        <label htmlFor="username" className="form-label">Email</label>
                        <div className="input-group has-validation">
                                <span className="input-group-text" id="inputGroupEmail">
                                    <FontAwesomeIcon icon={faAt} size={"lg"}/>
                                </span>
                            <input type="text" className="form-control" id="username" name="username"
                                   aria-describedby="inputGroupEmail" placeholder="someone@example.com"
                                   onChange={handleChange}
                                   required/>
                            <div className="invalid-feedback" id={"emptyEmail"}>
                                Please enter your email address.
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPassword">
                                <FontAwesomeIcon icon={faLock} size={"lg"}/>
                            </span>
                            <input type="password" className="form-control" id="password" name="password"
                                   aria-describedby="inputGroupPassword" placeholder="Your password"
                                   onChange={handleChange}
                                   required/>
                            <div className="invalid-feedback" id={"emptyPassword1"}>
                                Please enter you password.
                            </div>

                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="repeatedPassword" className="form-label">Repeated password</label>
                        <div className="input-group has-validation">
                                <span className="input-group-text" id="inputGroupEmail">
                                    <FontAwesomeIcon icon={faLock} size={"lg"}/>
                                </span>
                            <input type="password" className="form-control" id="repeatedPassword" name="repeatedPassword"
                                   aria-describedby="inputGroupEmail" placeholder="Repeat password"
                                   onChange={handleChange}
                                   required/>
                            <div className="invalid-feedback" id={"emptyRepeatedPassword"}>
                                Please enter your password again.
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Name</label>
                        <div className="input-group has-validation">
                                <span className="input-group-text" id="inputGroupEmail">
                                    <FontAwesomeIcon icon={faUser} size={"lg"}/>
                                </span>
                            <input type="text" className="form-control" id="name" name="name"
                                   aria-describedby="inputGroupEmail" placeholder="Name"
                                   onChange={handleChange}
                                   required/>
                            <div className="invalid-feedback" id={"emptyName"}>
                                Please enter your name.
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="surname" className="form-label">Surname</label>
                        <div className="input-group has-validation">
                                <span className="input-group-text" id="inputGroupEmail">
                                    <FontAwesomeIcon icon={faUser} size={"lg"}/>
                                </span>
                            <input type="text" className="form-control" id="surname" name="surname"
                                   aria-describedby="inputGroupEmail" placeholder="Surname"
                                   onChange={handleChange}
                                   required/>
                            <div className="invalid-feedback" id={"emptySurname"}>
                                Please enter your surname.
                            </div>
                        </div>
                    </div>

                    <div className={"d-grid gap-2 col-md-12 mt-4"}>
                        <button id="registerSubmit" name={"registerSubmit"} type="submit"
                                className="btn btn-block text-white fw-bold" style={{backgroundColor: '#BB0422'}}>
                            Register
                        </button>
                    </div>

                </form>

            </div>
        </div>
    )

}

export default Register;