import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import jsPDF from 'jspdf'
import Template1 from '../TemplatesComponents/Template1'
import Template2 from '../TemplatesComponents/Template2'
import Template3 from '../TemplatesComponents/Template3'
import Template4 from '../TemplatesComponents/Template4'
import html2canvas from 'html2canvas'
import SuccessMessage from './Modal'

function MyResume() {
    //this component shows the preview of the resume created by the user with the 'Save'and 'Back' button//
    const selectedTemplate = useSelector(state => state.dataStore.selectedTemplate)
    const dataStore = useSelector(state => state.dataStore)
    const [showModal, setShowModal] = useState(false)
    // const [WorkEx, setWorkEx] = useState([])
    // const [education, seteducation] = useState([])
    // const [skills, setSkills] = useState([])
    const downloadComponentPDF = () => {
        //this function is called when the user clicks on the 'Save Resume' button.
        // it takes the 'div' element with id 'divToPrint' and then convert it into pdf format which is downloaded into the user's computer memory.
        const input = document.getElementById('divToPrint');
        html2canvas(input, { scrollY: -window.scrollY })
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF("p", "px", "a4");
                var ratio = canvas.width / canvas.height;
                var width = pdf.internal.pageSize.getWidth();
                var height = width / ratio;
                pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
                pdf.save("resume.pdf");
            })
            .then(() => {
                setTimeout(
                    // this function shows the modal popup named 'SuccessMessage' after the resume has been successfully downloaded and make it to disappear on its own after 6000 ms//
                    () => {
                        setShowModal(true)
                        setTimeout(
                            () => {
                                setShowModal(false)
                            }
                            , 6000)
                    }
                    , 100)
            })
            ;
    }

    const SaveData = async () => {
        if(localStorage.getItem('editItem')){
            try {
                const response = await fetch(`http://localhost:5000/api/cv/DeleteCV/${localStorage.getItem('editItem')}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    }
                });
    
                if (response.ok) {
                    localStorage.removeItem('editItem');
                } else {
                    throw new Error('Failed to delete CV');
                }
            } catch (error) {
                console.error(error);
            }
        }

        const numberFromTemplate = /\bTemplate\s+(\d+)\b/.exec(selectedTemplate);
        let extractedNumber;

        if (numberFromTemplate) {
            extractedNumber = numberFromTemplate[1];
        }

        const WorkExArray = dataStore.workEx.map(item => ({
            JobTitle: item.title,
            Organization: item.orgName,
            StartYear: item.startYear,
            EndYear: item.endYear,
            Description: item.jobDescription
        }));
        
        const EducationArray = dataStore.education.map(item => ({
            Type: item.Type,
            University: item.University,
            Degree: item.Degree,
            StartYear: item.Start,
            EndYear: item.End
        }));
        
        const SkillsArray = dataStore.skills.map(item => ({
            Skill: item.skillName
        }));

        
        const formData = new FormData();

        // // Append non-file data
        formData.append('Template', extractedNumber);
        formData.append('FirstName', dataStore.personalInfo.firstName);
        formData.append('LastName', dataStore.personalInfo.lastName);
        formData.append('Email', dataStore.personalInfo.Email);
        formData.append('Mobile', dataStore.personalInfo.Mobile);
        formData.append('Address1', dataStore.personalInfo.Address1);
        formData.append('Address2', dataStore.personalInfo.Address2);
        formData.append('City', dataStore.personalInfo.City);
        formData.append('State', dataStore.personalInfo.State);
        formData.append('Pincode', dataStore.personalInfo.Pin);
        formData.append('Objective', dataStore.personalInfo.Objective);
        formData.append('WorkExperience', JSON.stringify(WorkExArray));
        formData.append('EducationDetail', JSON.stringify(EducationArray));
        formData.append('Skills', JSON.stringify(SkillsArray));        
        formData.append('image', dataStore.image);
        console.log(formData)

        const apiUrl = 'http://localhost:5000/api/cv/AddCVData';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                // 'Content-Type':'application/json',
                'auth-token': localStorage.getItem('token'),
            },
            body: formData,
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to save data');
            })
            .then(savedData => {
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                }, 3000);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle errors (e.g., show an error message)
            });
    };

    return (
        <div className='container w-100 overflow-scroll'>
            <div className=' row mt-2 p-5'>
                {selectedTemplate != "" ? (
                    <div className='w-100 d-flex justify-content-center'>
                        <Link to="/detailsfillingpage/keyskills">
                            <button className='btn btn-primary me-4 p-2'> Go-Back</button>
                        </Link>
                        {localStorage.getItem('editItem')?
                        (<button className='btn btn-primary me-4 p-2' onClick={SaveData}>Update</button>):
                        (<button className='btn btn-primary me-4 p-2' onClick={SaveData}>Save</button>)
                        }
                        <button className='btn btn-success ms-3 p-2' onClick={downloadComponentPDF}>
                            Download
                        </button>
                    </div>
                ) : (
                    <div className='w-100 d-flex justify-content-center'>
                        <Link to="/templates">
                            <button className='btn btn-primary me-4 p-2'>Select Template</button>
                        </Link>
                    </div>
                )}
            </div>
            <div className='  mt-2 p-5 w-100 ' style={{ minWidth: "1200px", overflow: 'scroll' }}>
                <div className=' w-100  d-flex justify-content-center '>
                    <div className='w-100 ' >
                        <div id='divToPrint' className='w-100'>
                            {/* In this div, user selected template is rendered alongwith the details filled by the user. */}
                            {selectedTemplate === ""
                                ? <div><h1>Please select a template!</h1></div>
                                : selectedTemplate === "Template 1"
                                    ? <Template1 />
                                    : selectedTemplate === "Template 2"
                                        ? <Template2 />
                                        : selectedTemplate === "Template 3"
                                            ? <Template3 />
                                            : <Template4 />}
                        </div>
                    </div>

                </div>


                {/* this SuccessMessage component displays modal popup on the screen with the message 'Your resume has been successfully downloaded'. */}
                <div><SuccessMessage showModal={showModal} setShowModal={setShowModal} /></div>

            </div>
        </div>


    )
}

export default MyResume