import React from 'react'
import "./footer.css"
import { footer } from '../Data/Data'

const Footer = () => {
  return (
    <>
      <section className="footerContact">
        <div className="container">
            <div className="send flex">
                <div className="text">
                    <h1>Do You Have Questions ? </h1>
                    <p>We'll help you to grow your career and growth.</p>
                </div>
                <button className='btn5'>Contact Us Today</button>
            </div>
        </div>
      </section>

      <footer>
        <div className="container">
            <div className="box">
                <div className="logo">
                    <img src="../images/logo2.png" alt=""/>
                    <h2>Do You Need Help With Anything? </h2>
                    <p>Receive updates, hot deals, tutorials, discounts sent straight in your inbox month</p>

                    <div className="input flex">
                        <input type="text" placeholder="Email Address" name="" id=""/>
                        <button>Subscribe</button>
                    </div>
                </div>
            </div>
            {footer.map((val)=>(
                <div className="box">
                    <h3>{val.title}</h3>
                    <ul>
                        {val.text.map((items)=>(
                            <li>{items.list}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
      </footer>
      <div className="legal">
        <span>© 2023 Portfolio Creator. Designd By Portfolio Creator.</span>
      </div>
    </>
  )
}

export default Footer
