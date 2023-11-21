import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"

function NavBar() {
  const history = useNavigate();
  return (

    <div style={{ backgroundColor: '#fff', color: '#07588a', zIndex: 10 }}>
      <nav className="navbar navbar-expand-lg navbar-light p-0 m-0 " style={{ backgroundColor: '#fff', color: 'white' }} >
        <div className="container-fluid  ">
          <div className="navbar-brand d-flex align-items-center" style={{ color: '#07588a', fontSize: '25px', fontWeight: "600" }}>
            <div className='logo'>
              <img src="../images/logo2.png" alt="" />
            </div>
            <div></div>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse  " id="navbarSupportedContent">
            <div className='flex-grow-1'></div>
            <div className="navbar-nav mb-2 ms-5 ">
              <li className="nav-item">
                {/* /*this link will show the Home page */}
                <Link to='/' className="nav-link active me-4" style={{ textDecoration: 'none', fontSize: "20px", fontWeight: '600' }}>Home</Link>
              </li>
              <li className="nav-item">
                {/* this link will show the MyResume page displaying the preview of the resume created by the user. */}
                <Link to='/templates' className="nav-link active me-4" style={{ textDecoration: 'none', fontSize: "20px", fontWeight: '600' }}>Templates</Link>
              </li>
              {/* <li className="nav-item">
                <Link to='/myresume' className="nav-link active me-4" style={{ textDecoration: 'none', fontSize: "20px", fontWeight: '600' }} >My Resume</Link>
              </li> */}

              <li className="nav-item">
                {/* this link will show the About Us page. */}
                <Link to='/mine' className="nav-link active me-4" style={{ textDecoration: 'none', fontSize: "20px", fontWeight: '600' }} >Mine</Link>

              </li>
              <li className="nav-item">
                {/* this link will show the About Us page. */}
                <Link to='/about' className="nav-link active me-4" style={{ textDecoration: 'none', fontSize: "20px", fontWeight: '600' }} >About</Link>

              </li>
              <li className="nav-item">
                {/* this link will show the About Us page. */}
                <Link to='/contact' className="nav-link active me-4" style={{ textDecoration: 'none', fontSize: "20px", fontWeight: '600' }} >Contact</Link>

              </li>

              <li className="nav-item">
                {!localStorage.getItem("token") ?
                  (
                    <Link to='/login' className="nav-link active me-4" style={{ textDecoration: 'none', fontSize: "20px", fontWeight: '600' }} >Login / SignUp</Link>
                  )
                    :
                    (
                      <div 
                        className="nav-link active me-4" 
                        style={{ textDecoration: 'none', fontSize: "20px", fontWeight: '600', cursor:"pointer" }} 
                        onClick={()=>{
                          localStorage.removeItem("token")
                          history("/login")
                        }}
                      >Logout
                      </div>
                    )
                }

              </li>

            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar