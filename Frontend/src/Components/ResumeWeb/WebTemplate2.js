import { data } from 'autoprefixer'
import React from 'react'
import { useSelector } from 'react-redux'
import "./style.css"


const WebTemplate2 = () => {
    const dataStore = useSelector(state => state.WebStore)
  return (
    <div className="round" style={{backgroundColor:"#1A9DF1"}}>
        <div className="flex">
            <div className="Section1">
                <h3>Hey there,</h3>
                <h1>I'm {dataStore.firstName} {dataStore.lastName}</h1>
                <h5 className='red'>- Graphic Designer</h5>
                <p>{dataStore.Objective}</p>
            </div>
            <div className="Section2 image94">
                <img src={dataStore.imageFile} className='w-100 h-100' alt="" />
            </div>
            <div className="Section3">
                <div className="Data">
                    <h2>{dataStore.Experience} <span className='red'>+</span></h2>
                    <p>Years of Experience</p>
                </div>
                <div className="Data">
                    <h2>{dataStore.Project} <span className='red'>+</span></h2>
                    <p>Completed Project</p>
                </div>
                <div className="Data">
                    <h2>{dataStore.Client} <span className='red'>+</span></h2>
                    <p>Satisfied Client</p>
                </div>
            
            </div>
        </div>

        <div className="Projects">
            <h2>Projects</h2>
            <div className="gridSet">
                {dataStore.Images.map(item=>{
                    return(
                    <div className="ImageSectionP">
                        <img src={item.imageFile} className='w-100 h-100' alt="" />
                    </div>)
                })}
            </div>
        </div>

        <div className="Projects">
            <h2 style={{textAlign:'left'}}>Connect With Me</h2>
            <div className="InputSec text">
                Write a message
            </div>
            <div className="InputSec">
                Email
            </div>
            <button className="btn btn-danger">Send</button>
        </div>
    </div>
  )
}

export default WebTemplate2