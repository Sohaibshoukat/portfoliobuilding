import React, { useEffect, useState } from 'react';
import "./style.css"
import Template1 from '../TemplatesComponentsList/Template1';
import Template2 from '../TemplatesComponentsList/Template2';
import Template3 from '../TemplatesComponentsList/Template3';
import Template4 from '../TemplatesComponentsList/Template4';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { updateEducation, updateKeySkills, updatePersonalInfo, updateState, updateWorkEx } from '../../ReduxManager/dataStoreSlice';
import { updateImageWeb, updateStateweb } from '../../ReduxManager/WebDataStore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WebDataBase from '../ResumeWeb/WebData';
import WritterDataBase from '../ResumeWritter/WebData';
import { updateEducationWritten, updateWrittenState } from '../../ReduxManager/WritterDataStore';
import WebDataBase2 from '../ResumeWeb/WebData2';


const Mineresume = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [templates, setTemplates] = useState([]);
    const [Web, setWeb] = useState([]);
    const [writter, setwritter] = useState([])

    useEffect(() => {
        const fetchCVData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/cv/FetchallCV', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token")
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    // Extracting 'template' values from each object in the array
                    // const extractedTemplates = data.map(item => item.Template); // Extract 'template' from each object
                    setTemplates(data); // Set the array of 'template' values in the state
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error(error);
                // Handle errors (e.g., show an error message)
            }
        };

        fetchCVData();
    }, []);

    useEffect(() => {
        const fetchWebData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/web/FetchallCV', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token")
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    // Extracting 'template' values from each object in the array
                    // const extractedTemplates = data.map(item => item.Template); // Extract 'template' from each object
                    setWeb(data); // Set the array of 'template' values in the state
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error(error);
                // Handle errors (e.g., show an error message)
            }
        };

        fetchWebData();
    }, []);

    useEffect(() => {
        const fetchWritterData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/writter/FetchallCV', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token")
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    // Extracting 'template' values from each object in the array
                    // const extractedTemplates = data.map(item => item.Template); // Extract 'template' from each object
                    setwritter(data); // Set the array of 'template' values in the state
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error(error);
                // Handle errors (e.g., show an error message)
            }
        };

        fetchWritterData();
    }, []);


    const downloadComponentPDF = (i) => {
        //this function is called when the user clicks on the 'Save Resume' button.
        // it takes the 'div' element with id 'divToPrint' and then convert it into pdf format which is downloaded into the user's computer memory.
        const input = document.getElementById(i);
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
            ;
    }


    const deleteCV = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/cv/DeleteCV/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });

            if (response.ok) {
                window.location.reload()
            } else {
                throw new Error('Failed to delete CV');
            }
        } catch (error) {
            console.error(error);
            // Handle errors (e.g., show an error message)
        }
    };

    const deletewebTemplate = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/web/DeleteCV/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });

            if (response.ok) {
                window.location.reload()
            } else {
                throw new Error('Failed to delete CV');
            }
        } catch (error) {
            console.error(error);
            // Handle errors (e.g., show an error message)
        }
    };

    const deletewritterTemplate = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/writter/DeleteCV/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });

            if (response.ok) {
                window.location.reload()
            } else {
                throw new Error('Failed to delete CV');
            }
        } catch (error) {
            console.error(error);
            // Handle errors (e.g., show an error message)
        }
    };


    const EditFunction = async (id) => {
        localStorage.setItem('editItem', id)

        dispatch(updateState({ key: 'selectedTemplate', value: '' }));
        dispatch(updateState({ key: 'image', value: null }));

        dispatch(updateState({
            key: 'personalInfo', value: {
                firstName: '',
                lastName: '',
                Email: '',
                Mobile: '',
                Address1: '',
                Address2: '',
                City: '',
                State: '',
                Pin: '',
                Objective: ''
            }
        }));

        dispatch(updateState({ key: 'workEx', value: [] }));
        dispatch(updateState({ key: 'education', value: [] }));
        dispatch(updateState({ key: 'skills', value: [{ skillName: '' }] }));

        try {
            const response = await fetch(`http://localhost:5000/api/cv/SingeCV/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(updatePersonalInfo({ key: 'firstName', value: data.FirstName }));
                dispatch(updatePersonalInfo({ key: 'lastName', value: data.LastName }));
                dispatch(updatePersonalInfo({ key: 'Email', value: data.Email }));
                dispatch(updatePersonalInfo({ key: 'Mobile', value: data.Mobile }));
                dispatch(updatePersonalInfo({ key: 'Address1', value: data.Address1 }));
                dispatch(updatePersonalInfo({ key: 'Address2', value: data.Address2 }));
                dispatch(updatePersonalInfo({ key: 'City', value: data.City }));
                dispatch(updatePersonalInfo({ key: 'State', value: data.State }));
                dispatch(updatePersonalInfo({ key: 'Pin', value: data.Pincode }));
                dispatch(updatePersonalInfo({ key: 'Objective', value: data.Objective }));
                data.WorkExperience.forEach((exp, index) => {
                    dispatch(updateWorkEx({ key: 'title', value: exp.JobTitle, index }));
                    dispatch(updateWorkEx({ key: 'orgName', value: exp.Organization, index }));
                    dispatch(updateWorkEx({ key: 'startYear', value: exp.StartYear, index }));
                    dispatch(updateWorkEx({ key: 'endYear', value: exp.EndYear, index }));
                    dispatch(updateWorkEx({ key: 'jobDescription', value: exp.Description, index }));
                });
                data.EducationDetail.forEach((edu, index) => {
                    dispatch(updateEducation({ key: 'Type', value: edu.Type, index }));
                    dispatch(updateEducation({ key: 'University', value: edu.University, index }));
                    dispatch(updateEducation({ key: 'Degree', value: edu.Degree, index }));
                    dispatch(updateEducation({ key: 'Start', value: edu.StartYear, index }));
                    dispatch(updateEducation({ key: 'End', value: edu.EndYear, index }));
                });
                data.Skills.forEach((skill, index) => {
                    dispatch(updateKeySkills({ key: 'skillName', value: skill.Skill, index }));
                });
                dispatch(updateState({ key: 'selectedTemplate', value: `Template ${data.Template}` }));
                const url = `data:image/png;base64,${data.image}`;
                fetch(url)
                    .then(res => res.blob())
                    .then(blob => {
                        const file = new File([blob], "File name", { type: "image/png" })
                        let temp = URL.createObjectURL(file)
                        dispatch(updateState({ key: 'image', value: file }));
                        console.log(file)
                        dispatch(updateState({ key: 'imageFile', value: temp }))
                    })


                navigate('/detailsfillingpage/personalinfo');
            } else {
                window.alert("Error Occured");
            }
        } catch (error) {
            // Handle the API call error
            console.log(error);
            window.alert({ message: "Error Occured 2" });

        }
    };

    const EditWebTemplate = async (id) => {
        localStorage.setItem('editItem', id)

        dispatch(updateStateweb({ key: 'selectedTemplate', value: '' }));
        dispatch(updateStateweb({ key: 'firstName', value: '' }));
        dispatch(updateStateweb({ key: 'lastName', value: '' }));
        dispatch(updateStateweb({ key: 'Experience', value: '' }));
        dispatch(updateStateweb({ key: 'Project', value: '' }));
        dispatch(updateStateweb({ key: 'Client', value: '' }));
        dispatch(updateStateweb({ key: 'Objective', value: '' }));
        dispatch(updateStateweb({ key: 'image', value: null }));
        dispatch(updateState({
            key: 'Images', value: [
                {
                    imageFile: null,
                    image: null,
                },
                {
                    imageFile: null,
                    image: null,
                },
                {
                    imageFile: null,
                    image: null,
                },
                {
                    imageFile: null,
                    image: null,
                }
            ]
        }));


        try {
            const response = await fetch(`http://localhost:5000/api/web/SingeCV/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(updateStateweb({ key: 'firstName', value: data.FirstName }));
                dispatch(updateStateweb({ key: 'lastName', value: data.LastName }));
                dispatch(updateStateweb({ key: 'Experience', value: data.Experience }));
                dispatch(updateStateweb({ key: 'Project', value: data.Project }));
                dispatch(updateStateweb({ key: 'Client', value: data.Client }));
                dispatch(updateStateweb({ key: 'Objective', value: data.Objective }));
                dispatch(updateStateweb({ key: 'selectedTemplate', value: data.Template }));
                const url = `data:image/png;base64,${data.image}`;
                fetch(url)
                    .then(res => res.blob())
                    .then(blob => {
                        const file = new File([blob], "File name", { type: "image/png" })
                        let temp = URL.createObjectURL(file)
                        dispatch(updateStateweb({ key: 'image', value: file }));
                        console.log(file)
                        dispatch(updateStateweb({ key: 'imageFile', value: temp }))
                    })

                data.Images.forEach((edu, index) => {
                const url2 = `data:image/png;base64,${edu.Image}`;
                    
                    fetch(url2)
                    .then(res => res.blob())
                    .then(blob => {
                        const file = new File([blob], "File name", { type: "image/png" })
                        let temp = URL.createObjectURL(file)
                        dispatch(updateImageWeb({ key: 'image', value: file, index }));
                        dispatch(updateImageWeb({ key: 'imageFile', value: temp, index }));
                    })
                });



                navigate('/FillingWeb/personalinfo');
            } else {
                window.alert("Error Occured");
            }
        } catch (error) {
            // Handle the API call error
            console.log(error);
            window.alert({ message: "Error Occured 2" });

        }
    };

    const EditWritterFunction = async (id) => {
        localStorage.setItem('editItem', id)

        dispatch(updateWrittenState({ key: 'selectedTemplate', value: '' }));
        dispatch(updateWrittenState({ key: 'firstName', value: '' }));
        dispatch(updateWrittenState({ key: 'lastName', value: '' }));
        dispatch(updateWrittenState({ key: 'Email', value: '' }));
        dispatch(updateWrittenState({ key: 'Mobile', value: '' }));
        dispatch(updateWrittenState({ key: 'Web', value: '' }));
        dispatch(updateWrittenState({ key: 'Facebook', value: '' }));
        dispatch(updateWrittenState({ key: 'Linkdin', value: '' }));
        dispatch(updateWrittenState({ key: 'Twitter', value: '' }));
        dispatch(updateWrittenState({ key: 'Objective', value: '' }));
        dispatch(updateWrittenState({ key: 'image', value: null }));

        dispatch(updateState({ key: 'education', value: [] }));

        try {
            const response = await fetch(`http://localhost:5000/api/writter/SingeCV/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(updateWrittenState({ key: 'firstName', value: data.FirstName }));
                dispatch(updateWrittenState({ key: 'lastName', value: data.LastName }));
                dispatch(updateWrittenState({ key: 'Email', value: data.Email }));
                dispatch(updateWrittenState({ key: 'Mobile', value: data.Mobile }));
                dispatch(updateWrittenState({ key: 'Web', value: data.Web }));
                dispatch(updateWrittenState({ key: 'Facebook', value: data.Facebook }));
                dispatch(updateWrittenState({ key: 'Linkdin', value: data.Linkdin }));
                dispatch(updateWrittenState({ key: 'Twitter', value: data.Twitter }));
                dispatch(updateWrittenState({ key: 'Objective', value: data.Objective }));
                data.EducationDetail.forEach((edu, index) => {
                    dispatch(updateEducationWritten({ key: 'Type', value: edu.Type, index }));
                    dispatch(updateEducationWritten({ key: 'University', value: edu.University, index }));
                    dispatch(updateEducationWritten({ key: 'Degree', value: edu.Degree, index }));
                    dispatch(updateEducationWritten({ key: 'Start', value: edu.StartYear, index }));
                    dispatch(updateEducationWritten({ key: 'Objective', value: edu.Objective, index }));
                });
                dispatch(updateWrittenState({ key: 'selectedTemplate', value: `Content Writter` }));
                const url = `data:image/png;base64,${data.image}`;
                fetch(url)
                    .then(res => res.blob())
                    .then(blob => {
                        const file = new File([blob], "File name", { type: "image/png" })
                        let temp = URL.createObjectURL(file)
                        dispatch(updateWrittenState({ key: 'image', value: file }));
                        dispatch(updateWrittenState({ key: 'imageFile', value: temp }))
                    })


                navigate('/fillingWritter/personalinfo');
            } else {
                window.alert("Error Occured");
            }
        } catch (error) {
            // Handle the API call error
            console.log(error);
            window.alert({ message: "Error Occured 2" });

        }
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginTop: "20px" }}>Your Previously Edited File</h1>
            {templates.length == 0 ? (
                <div style={{ textAlign: 'center', marginTop: "20px" }}>
                    <h1>No Past Record Saved</h1>
                </div>
            ) : (
                <>
                    <div className="container DataTemplate">
                        {templates.map((item, index) => {
                            return (
                                <div className="image" key={item}>
                                    {item.Template === "1" ? (
                                        <>
                                            <div className='w-100 d-flex justify-content-center my-2'>
                                                <button className='btn btn-primary me-4 p-2' onClick={() => EditFunction(item._id)}>Edit</button>
                                                <button className='btn btn-primary me-4 p-2' onClick={() => { downloadComponentPDF(`divToPrint${index}`) }}>Download</button>
                                                <button className='btn btn-success ms-3 p-2' onClick={() => deleteCV(item._id)}>Delete</button>
                                            </div>
                                            <div id={`divToPrint${index}`}>
                                                <Template1 item={item} />
                                            </div>
                                        </>
                                    ) : item.Template === "2" ? (
                                        <>
                                            <div className='w-100 d-flex justify-content-center my-2'>
                                                <button className='btn btn-primary me-4 p-2' onClick={() => EditFunction(item._id)}>Edit</button>
                                                <button className='btn btn-primary me-4 p-2' onClick={() => downloadComponentPDF(`divToPrint${index}`)}>Download</button>
                                                <button className='btn btn-success ms-3 p-2' onClick={() => deleteCV(item._id)}>Delete</button>
                                            </div>
                                            <div id={`divToPrint${index}`}>
                                                <Template2 item={item} />
                                            </div>
                                        </>
                                    ) : item.Template === "3" ? (
                                        <>
                                            <div className='w-100 d-flex justify-content-center my-2'>
                                                <button className='btn btn-primary me-4 p-2' onClick={() => EditFunction(item._id)}>Edit</button>
                                                <button className='btn btn-primary me-4 p-2' onClick={() => downloadComponentPDF(`divToPrint${index}`)}>Download</button>
                                                <button className='btn btn-success ms-3 p-2' onClick={() => deleteCV(item._id)}>Delete</button>
                                            </div>
                                            <div id={`divToPrint${index}`}>
                                                <Template3 item={item} />
                                            </div>
                                        </>
                                    ) : item.Template === "4" ? (
                                        <>
                                            <div className='w-100 d-flex justify-content-center my-2'>
                                                <button className='btn btn-primary me-4 p-2' onClick={() => EditFunction(item._id)}>Edit</button>
                                                <button className='btn btn-primary me-4 p-2' onClick={() => downloadComponentPDF(`divToPrint${index}`)}>Download</button>
                                                <button className='btn btn-success ms-3 p-2' onClick={() => deleteCV(item._id)}>Delete</button>
                                            </div>
                                            <div id={`divToPrint${index}`}>
                                                <Template4 item={item} />
                                            </div>
                                        </>
                                    ) : (
                                        <h2>No Template Available</h2>
                                    )}
                                </div>
                            );
                        })}

                    </div>
                    <div className="container DataTemplate">
                        {Web.map((item, index) => {
                            return (
                                <div className="image" key={item}>

                                    <div className='w-100 d-flex justify-content-center my-2'>
                                        <button className='btn btn-primary me-4 p-2' onClick={() => EditWebTemplate(item._id)}>Edit</button>
                                        <button className='btn btn-primary me-4 p-2' onClick={() => { downloadComponentPDF(`WebPrint${index}`) }}>Download</button>
                                        <button className='btn btn-success ms-3 p-2' onClick={() => deletewebTemplate(item._id)}>Delete</button>
                                    </div>
                                    <div id={`WebPrint${index}`}>
                                    {item.Template==="Grahic Developer" ?(
                                           <WebDataBase item={item} />

                                ):(
                                    <WebDataBase2 item={item} />
                                )}
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                    <div className="container DataTemplate">
                        {writter.map((item, index) => {
                            return (
                                <div className="image" key={item}>

                                    <div className='w-100 d-flex justify-content-center my-2'>
                                        <button className='btn btn-primary me-4 p-2' onClick={() => EditWritterFunction(item._id)}>Edit</button>
                                        <button className='btn btn-primary me-4 p-2' onClick={() => { downloadComponentPDF(`ContentPrint${index}`) }}>Download</button>
                                        <button className='btn btn-success ms-3 p-2' onClick={() => deletewritterTemplate(item._id)}>Delete</button>
                                    </div>
                                    <div id={`ContentPrint${index}`}>
                                        <WritterDataBase item={item} />
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </>
            )}
        </div>
    );
};

export default Mineresume;
