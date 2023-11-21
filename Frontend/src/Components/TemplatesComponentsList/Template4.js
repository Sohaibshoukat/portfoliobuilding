import React from 'react'
import { useSelector } from 'react-redux'
const shortid = require('shortid')

function Template4({item}) {
    // const item = useSelector(state => state.item)
  return (
    <div className='w-100' style={{border:"1px solid #4b6982"}}>
        <div className='row m-0'>
            <div className='col col-3 d-flex align-items-center pt-5' style={{backgroundColor:"#4b6982", flexDirection:"column"}}>
                <div className=" media me-5" >
                    <img className="rounded align-self-center  " src={`data:image/png;base64,${item.image}`} alt='profile-pic'
                        style={{maxHeight:'180px',minHeight:"100px", width:'100px', background:'grey',padding:0}}/>
                </div>
                <div className=" mt-3 font-weight-bold " style={{fontFamily:"Serif",}}>
                    <div className='' style={{color:"white",fontSize:"30px"}}>{ item.FirstName +" "+  item.LastName}</div>
                    <h5 className='pt-2 'style={{color:"#adccc7", fontSize:"20px"}}>{item.WorkExperience[item.WorkExperience.length -1].JobTitle}</h5>
                </div>
                <div className=" ">
                    <div className='p-5 ms-4' style={{fontSize:"18px",display:"inline-block"}}>
                        <div className="px-2 mb-2 " style={{backgroundColor:'white', color:"black"}}>Email:</div>
                        <div style={{color:'#f7f7f7'}}>{item.Email}</div>
                        <div className=" px-2 mb-2 mt-2" style={{backgroundColor:'white', color:"black"}}>Contact:</div>
                        <div style={{color:'#f7f7f7'}}>{item.Mobile}</div>
                        <div className="px-2 mb-2 mt-2 " style={{backgroundColor:'white', color:"black"}}>Address:</div>
                        <div style={{color:'#f7f7f7'}}>{item.Address1 +", "+ item.Address2
                                +",  "+item.City+", "+ item.State +", "+ item.Pincode}
                        </div>
                    </div>
                </div>
            </div>
            <div className='col col-9'>
                <div>
                    <div className="text-justify mt-4">{item.Objective}</div>
                    <hr style={{height:"5px",backgroundColor:"#4b6982"}}/> 
                </div>
                <div className="" style={{fontFamily:"Serif",}}>
                    <div className="">
                    <div className=" text-left bg-light mb-4 " style={{color:"#4b6982"}}> <h3><b>Professional Experience</b> </h3></div>
                    <div className="b text-left " style={{fontSize:"18px"}}>
                        {item.WorkExperience.map((item)=>{
                            return(
                                    <div key={shortid.generate()}>
                                        <div className='mt-2'><h4>{item.Organization}</h4></div>
                                        <div className='mt-2'><b>{item.JobTitle}</b></div>
                                        
                                        <div className='mt-2 mb-3'>
                                            <div>Worked in {item.Organization} from {item.StartYear} to {item.EndYear}.</div>
                                            <div>{item.Description}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="w-100 mt-4"> </div>
                    <hr style={{height:"5px",backgroundColor:"#4b6982"}}/>
                    <div className="bg-light text-left" style={{color:"#4b6982"}}><h3><b>Education</b></h3></div>
                    <div className=" text-left" >
                        <div style={{fontSize:"18px"}}>
                            {item.EducationDetail.map((item)=>{
                                return(
                                        <div key={shortid.generate()}>
                                            <h5> {item.Degree}</h5>
                                            
                                            <div> I have persued my {item.Type} <b> from {item.University}</b> </div>
                                            <p>Duration: {" "+item.StartYear+ " - " + item.EndYear}</p> 
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="w-100 mt-4"> </div>
                    <hr style={{height:"5px",backgroundColor:"#4b6982"}}/>
                    <div className="bg-light text-left " >
                        <h3 style={{color:"#4b6982"}}><b>Key Skills</b></h3>
                    </div>
                    <div className=" text-left mb-4" style={{fontSize:"18px"}}>
                            {item.Skills.map((skill)=>{
                                return(
                                        <div key={shortid.generate()}><li>{skill.Skill}</li></div>
                                    )
                                })
                            }
                    </div>
                    </div>
                </div>
            </div>
           
        </div>
      
    </div>
  )
}

export default Template4