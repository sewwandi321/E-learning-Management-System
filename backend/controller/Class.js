//const router = express.Router();
const ClassSchedule = require('../models/Class');
const Teacher = require('../models/teacher');
const shortid = require('shortid');
const slugify = require('slugify');

exports.createClass = async (req, res) => {
    if (req.body) {
        try {
            const newschedule = new ClassSchedule(req.body);
            await newschedule.save();
            res.status(201).json({ id: newschedule._id });
        } catch (error) {
            res.status(406).json({ error: error.message });
        }
    }
};

exports.getall = async (req, res) => {
    await ClassSchedule.find({})
        .then((data) => {
            res.status(200).send({ data: data });
        })
        .catch((err) => {
            res.status(500).send({ error: err.massage });
            console.log(err);
        });
};

exports.getAllTeachers = async (req, res) => {
    try {
        const getAllTeachers = await Teacher.find({}).select('name');
        res.status(200).json({ Teachers: getAllTeachers });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
exports.deleteById = (req, res) => {
    if (req.params._id) {
        ClassSchedule.deleteOne({ _id: req.params._id }).exec((error, result) => {
            if (error) return res.status(400).json({ error });
            if (result) {
                res.status(202).json({ result });
            }
        });
    } else {
        res.status(400).json({ error: 'Params required' });
    }
};
exports.updateScheduleById = (req, res) => {
    const { Studentbatch, teachername, hall, day, starttime, endtime } = req.body;

    ClassSchedule.findByIdAndUpdate(
        req.params._id,
        {
            $set: {
                Studentbatch: Studentbatch,
                teachername: teachername,
                hall: hall,
                day: day,
                starttime: starttime,
                endtime: endtime,
            },
        },
        { new: true }
    )
        .then((response) => {
            res.status(200).json({ message: 'Updated' });
        })
        .catch((err) => {
            res.status(404).json({ message: err.message });
        });
};
