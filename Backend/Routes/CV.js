const express = require("express");
const CV = require("../Schema/CVSchema");
const router = express.Router();
const fetchuser = require('../midelware/Fetchuser');
const { validationResult } = require('express-validator');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

//Get All notes of the user
router.get("/FetchallCV", fetchuser, async (req, res) => {
    try {
        const notes = await CV.find({ User: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error)
        res.status(500).send('network error occured')
    }

})

//Store new notes
router.post("/AddCVData", fetchuser, upload.single('image'), async (req, res) => {
    try {
        const image = req.file.buffer.toString('base64');
        // const image = req.body.image.toString("base64");
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const WorkExperience = JSON.parse(req.body.WorkExperience);
        const EducationDetail = JSON.parse(req.body.EducationDetail);
        const Skills = JSON.parse(req.body.Skills);


        const {
            Template,
            FirstName,
            LastName,
            Email,
            Mobile,
            Address1,
            Address2,
            City,
            State,
            Pincode,
            Objective,
        } = req.body;

        const cvData = new CV({
            Template,
            image,
            FirstName,
            LastName,
            Email,
            Mobile,
            Address1,
            Address2,
            City,
            State,
            Pincode,
            Objective,
            WorkExperience,
            EducationDetail,
            Skills,
            User: req.user.id
        });

        const savedCVData = await cvData.save();
        res.json(savedCVData);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred', error: error });
    }
});

router.get("/SingeCV/:id", fetchuser, upload.single('image'), async (req, res) => {
    try {
        let cvData = await CV.findById(req.params.id);
        if (!cvData) {
            return res.status(404).send("CV Data Not Found");
        }

        if (cvData.User.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized - CV Data not owned by the user");
        }
        res.json(cvData);

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

//Get All notes of the user
router.put("/UpdateCV/:id", fetchuser, upload.single('image'), async (req, res) => {
    try {
        const {
            Template,
            FirstName,
            LastName,
            Email,
            Mobile,
            Address1,
            Address2,
            City,
            State,
            Pincode,
            Objective,
            WorkExperience,
            EducationDetail,
            Skills
        } = req.body;

        const newCVData = {};

        if (Template) newCVData.Template = Template;
        if (FirstName) newCVData.FirstName = FirstName;
        if (LastName) newCVData.LastName = LastName;
        if (Email) newCVData.Email = Email;
        if (Mobile) newCVData.Mobile = Mobile;
        if (Address1) newCVData.Address1 = Address1;
        if (Address2) newCVData.Address2 = Address2;
        if (City) newCVData.City = City;
        if (State) newCVData.State = State;
        if (Pincode) newCVData.Pincode = Pincode;
        if (Objective) newCVData.Objective = Objective;
        if (WorkExperience) newCVData.WorkExperience = WorkExperience;
        if (EducationDetail) newCVData.EducationDetail = EducationDetail;
        if (Skills) newCVData.Skills = Skills;
        if (req.file) {
            const image = req.file.buffer.toString('base64');
            newCVData.image = image;
        }

        let cvData = await CV.findById(req.params.id);
        if (!cvData) {
            return res.status(404).send("CV Data Not Found");
        }

        if (cvData.User.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized - CV Data not owned by the user");
        }

        cvData = await CV.findByIdAndUpdate(req.params.id, { $set: newCVData }, { new: true });
        res.json(cvData);

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

//Get All notes of the user
router.delete("/DeleteCV/:id", fetchuser, async (req, res) => {
    try {

        let cv = await CV.findById(req.params.id);
        if (!cv) {
            return res.status(404).send("CV Not Found")
        }

        if (cv.User.toString() !== req.user.id) {
            return res.status(401).send("User not found")
        }

        cv = await CV.findByIdAndDelete(req.params.id)
        res.json("Successfull node deleted")

    } catch (error) {
        console.error(error)
        res.status(500).send('error occured')
    }

})

module.exports = router