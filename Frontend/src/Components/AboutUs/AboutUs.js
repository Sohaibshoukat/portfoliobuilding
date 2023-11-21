import React from "react"
import Back from "../Back"
import Heading from "../header/Heading"
import "./about.css"
import img from "../images/v.png"
import Footer from "../footer/footer"


const About = () => {
  return (
    <>
      <div class="container my-4">
        <div className="row">
          <div className="col-md-8">
            <div class="blog-post">
              <h2>Welcome to Our CV Builder Service</h2>
              <p>We are passionate about helping individuals create professional and tailored resumes to succeed in their career endeavors. Our team consists of dedicated professionals committed to simplifying the resume-building process and providing you with the tools necessary to stand out in the job market.</p>
            </div>

            <div class="blog-post">
              <h2>Our Mission</h2>
              <p>Our mission is to empower individuals in their job search by offering a user-friendly platform to craft outstanding resumes. We understand the importance of a well-crafted CV and aim to make the process efficient and stress-free, ensuring that you can present your skills and experiences effectively to potential employers.</p>
            </div>
          </div>
          <div className="col-md-4" style={{maxWidth:"300px"}}>
            <img src="./images/About.png" alt="" style={{width:"100%"}}/>
          </div>
        </div>

        <div class="blog-post">
          <h2>Why Choose Us?</h2>
          <p>At our CV builder, we value simplicity, efficiency, and personalization. We offer a range of templates and tools tailored to various industries, ensuring that your resume reflects your unique strengths. With our service, you can create a professional CV that enhances your job application and boosts your chances of landing your dream job.</p>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default About