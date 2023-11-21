import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import "./mix.css"

const Login = () => {
    const [passShow, setPassShow] = useState(false);

    const [inpval, setInpval] = useState({
        email: "",
        password: "",

    });

    const history = useNavigate();


    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const loginuser = async (e) => {
        e.preventDefault();

        const { email, password } = inpval;


        if (email === "") {
            alert("please enter your email");
        } else if (!email.includes("@")) {
            alert("enter valide email")
        } else if (password === "") {
            alert("enter your password")
        } else if (password.length < 6) {
            alert("password must be 6 char")
        }
        else {
            //console.log("user registration succesfully done");



            const data = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });

            const res = await data.json();
            console.log(res);
            if(res.success){
                localStorage.setItem('token',res.AuthToken);
                history("/");
                alert("Successfully login","success")
            }
            else{
                alert("Wrong Credentials","danger")
            }

        }

    }
    return (

        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Portfolio Creator, Log In</h1>
                        <p>Hi, we are you glad you are back. Please login.</p>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={inpval.email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={loginuser}>Login</button>
                        <p>Don't have an Account? <NavLink to="/register">Sign Up</NavLink> </p>
                    </form>

                </div>
            </section>

        </>
    );
};


export default Login 