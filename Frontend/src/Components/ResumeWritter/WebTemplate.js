import React from 'react'
import { useSelector } from 'react-redux'
import "./style.css"


const WebTemplate = () => {
    const dataStore = useSelector(state => state.WrittenStore)
  return (
    <div className="mainSec">
        <div className="ImageSec">
            <img src={dataStore.imageFile} alt="" />
        </div>
        <div className="HeadData">
            <div className="ImData">
                <h1 className='bold'>{dataStore.firstName}</h1>
                <h1 style={{fontWeight:"400"}}>{dataStore.lastName}</h1>
                <div className="post">Content Writter</div>
            </div>
            <div className="Contact">
                <h2>Contact</h2>
                <h4>{dataStore.Mobile}</h4>
                <h4>{dataStore.Email}</h4>
                <h4>{dataStore.Web}</h4>
            </div>
        </div>
        <div className="SocialMedia">
            <h4>{dataStore.Facebook}</h4>
            <h4>{dataStore.Linkdin}</h4>
            <h4>{dataStore.Twitter}</h4>
        </div>
        <div className="Edu">
            <div className="Education">
                <h2>Education</h2>
                <div className="EduField">
                {dataStore.education.map(item=>{
                    return(
                        <div className="SecEdu">
                            <h2>{item.University}</h2>
                            <h3>{item.Type} in {item.Degree} ({item.Start})</h3>
                            <p>{item.Objective}</p>
                        </div>
                    )
                })}
                </div>
            </div>
            <div className="Education">
                <h2>Profile</h2>
                <div className="Objective">
                {dataStore.Objective}
                </div>
            </div>
        </div>
    </div>
  )
}

export default WebTemplate