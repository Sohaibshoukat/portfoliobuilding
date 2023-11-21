import React from 'react'
import "./style.css"


const WritterDataBase = ({item}) => {
  return (
    <div className="mainSec">
        <div className="ImageSec">
            <img src={`data:image/png;base64,${item.image}`} alt="" />
        </div>
        <div className="HeadData">
            <div className="ImData">
                <h1 className='bold'>{item.FirstName}</h1>
                <h1 style={{fontWeight:"400"}}>{item.LastName}</h1>
                <div className="post">Content Writter</div>
            </div>
            <div className="Contact">
                <h2>Contact</h2>
                <h4>{item.Mobile}</h4>
                <h4>{item.Email}</h4>
                <h4>{item.Web}</h4>
            </div>
        </div>
        <div className="SocialMedia">
            <h4>{item.Facebook}</h4>
            <h4>{item.Linkdin}</h4>
            <h4>{item.Twitter}</h4>
        </div>
        <div className="Edu">
            <div className="Education">
                <h2>Education</h2>
                <div className="EduField">
                {item.EducationDetail.map(item=>{
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
                {item.Objective}
                </div>
            </div>
        </div>
    </div>
  )
}

export default WritterDataBase