import React, { useState } from 'react'
import { NavLink,useNavigate } from "react-router-dom"
import "./mix.css"

const Register = () => {

    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);
    const history = useNavigate();

    const [inpval, setInpval] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    });


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

    const addUserdata = async(e) => {
        e.preventDefault();

        const { name, email, password, cpassword } = inpval;

        if (name === "") {
            alert("please enter your name");
            
        } else if (email === "") {
            alert("please enter your email");
        } else if (!email.includes("@")) {
            alert("enter valide email")
        } else if (password === "") {
            alert("enter your password")
        } else if (password.length < 6) {
            alert("password must be 6 char")
        }else if (cpassword === "") {
            alert("enter your cpassword")
        
        }else if (cpassword.length < 6) {
            alert("cpassword must be 6 char")
        
            
        } else if(password !== cpassword){
            alert("password and comfirm password not match")
        }else{
             //console.log("user registration succesfully done");

             const data = await fetch("http://localhost:5000/api/auth/creatuser", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password
                })
            });

            const res = await data.json();
            console.log(res)
             
            if(res.success){
                localStorage.setItem("token",res.AuthToken)
                history("/");
                alert("Account Created Successfuly","success")
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
                        <h1>Sign Up</h1>
                        <p>We are glad that you will be using Portfolio app</p>.
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="name">Name</label>
                            <input type="text" onChange={setVal} value={inpval.name} name="name" id="name" placeholder='Enter Your Name' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" onChange={setVal} value={inpval.email} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} value={inpval.password} onChange={setVal} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <div className="form_input">
                            <label htmlFor="password">Confirm Password</label>
                            <div className="two">
                                <input type={!cpassShow ? "password" : "text"} value={inpval.cpassword} onChange={setVal} name="cpassword" id="cpassword" placeholder='Confirm password' />
                                <div className="showpass" onClick={() => setCPassShow(!cpassShow)}>
                                    {!cpassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={addUserdata}>Sign Up</button>
                        <p>Already have an account? <NavLink to="/login">Log In</NavLink></p>
                    </form>
                    
                </div>
            </section>
        </>
    )
}



export default Register