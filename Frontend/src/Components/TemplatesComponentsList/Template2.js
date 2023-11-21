import React from 'react'
import { useSelector } from 'react-redux'
const shortid = require('shortid')

function Template2({item}) {
    // const item = useSelector(state => state.item)
  return (
    <div className="w-100 " style={{border:"5px solid #f0bebe", backgroundColor:"#fffeec"}}>
        <div >
            <div className="row m-0 d-flex align-items-center" style={{height:"200px",backgroundColor:"#f0bebe"}}>
                <div className="col-2 text-center media" >
                    <img className="rounded align-self-center mx-auto " src={`data:image/png;base64,${item.image}`} alt='profile-pic'
                         style={{maxHeight:'180px',minHeight:"120px", width:'100px', background:'grey',padding:0}}/>
                   
                </div>
                <div className="col-6 font-weight-bold " style={{fontFamily:"Serif"}}>
                    <div className=' d-flex justify-content-center'  style={{color:"white",fontSize:"55px"}}>{ item.FirstName +" "+  item.LastName}</div>
                    <h5 className=' d-flex justify-content-center'>{item.WorkExperience[item.WorkExperience.length -1].JobTitle}</h5>
                </div>
                <div className="col-4  ">
                    <div className=' p-3' style={{fontSize:"18px",float:"left",display:"inline-block"}}>
                        <div >{item.Email}</div>
                        <div>{item.Mobile}</div>
                        <div>{item.Address1 +", "+ item.Address2
                                +",  "+item.City+", "+ item.State +", "+ item.Pincode}
                        </div>
                        
                
                    </div>
                </div>
            </div>
        </div>
        <hr style={{height:"5px",backgroundColor:"#f0bebe"}}/>
        <div className="text-justify mx-4">{item.Objective}</div>
        <hr style={{height:"5px",backgroundColor:"#f0bebe"}}/>

        <div className="container" style={{fontFamily:"Serif",}}>
            <div className="row">
                <div className="col-3 text-left  " style={{color:"#de5b7b"}}> <h3> Professional Experience</h3></div>
                <div className="col-9  text-left " style={{fontSize:"18px"}}>
                    {item.WorkExperience.map((item)=>{
                        return(
                            <div key={shortid.generate()}>
                                <div className='mt-2'><b>{item.JobTitle}</b></div>
                                
                                
                                <div className='mt-2'>
                                    Worked in {item.Organization} from {item.StartYear} to {item.EndYear}.
                                </div>
                                <div>{item.Description}</div>
                            </div>
                        )
                    })
                    }
                
                </div>
                <div className="w-100 mt-4"> </div>
                <hr style={{height:"5px",backgroundColor:"#f0bebe"}}/>
                <div className="col-3 text-left" style={{color:"#de5b7b"}}><h3>Education</h3></div>
                <div className="col-9 text-left" >
                    <div style={{fontSize:"18px"}}>
                        {item.EducationDetail.map((item)=>{
                            return(
                                <div key={shortid.generate()}>
                                    <b> {item.Degree}</b>
                                    <div> I have persued my {item.Type} in {item.Degree} from {item.University}</div>
                                    <p>Duration: {" "+item.StartYear+ " - " + item.EndYear}</p> 
                                </div>
                            )
                        })}
                        
                    </div>
                </div>
                <div className="w-100 mt-4 "> </div>
                <hr style={{height:"5px",backgroundColor:"#f0bebe"}}/>
                <div className="col-3 text-left mb-3 " >
                    <h3 style={{color:"#de5b7b"}}>Key Skills</h3>
                </div>
                <div className="col-9 text-left mb-3" style={{fontSize:"18px"}}>
                    
                        {item.Skills.map((skill)=>{
                            return(
                                <div key={shortid.generate()}>
                                    <li style={{listStyle:"none"}}>{skill.Skill}</li>
                                </div>
                            )
                             
                        })}
                </div>
                   
                </div>
        </div>
    </div>
                
    
  )
}

export default Template2