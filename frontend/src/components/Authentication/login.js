import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAt, faLock, faUser} from "@fortawesome/free-solid-svg-icons";


const Login=(props)=>{

    const [formData, updateFormData] = React.useState({
        username: "",
        password:""
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

        props.onLoginUser(username,password);

        setTimeout(()=>{
            props.hideWindow()
        },500)
    }

    (function () {

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')

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
        <div id={"loginForm"} className={"container mb-5 w-75"}>
            <div className={"ps-3 pe-3"}>
                <h1 className={"title text-center"}>Login</h1>
                <hr/>
                { localStorage.getItem("loginError") === "yes" &&
                <div className="alert alert-danger" id="invalidData" role="alert">
                    Invalid username or password.
                </div>
                }
                <form id={"loginData"} className="row g-3 needs-validation" noValidate onSubmit={onFormSubmit}>
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

                    <div className="col-md-12">
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

                    <div className={"d-grid gap-2 col-md-12 mt-4"}>
                        <button id="loginSubmit" type="submit" className="btn btn-block text-white fw-bold"
                                style={{backgroundColor: '#BB0422'}}>
                            Login
                        </button>
                    </div>


                </form>
            </div>
        </div>
    )

}

export default Login;