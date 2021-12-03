// const mongoose = require('mongoose');
const express = require('express');
const adminModel = require('../models/admin');
const sortieModel = require('../models/sortie');
const saverModel = require('../models/saver');
const surviverModel = require('../models/surviver');
const boatModel = require('../models/boat');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

//const joi = require('joi');

const jwt = require('jsonwebtoken');
const secret = 'test';
// const _ = require('lodash');
const sortie = require('../models/sortie');

const welcome = async(req, res) => {
    res.json("Hello world!!");
};

const login = async(req, res, next) => {

    let admin = await adminModel.findOne({ email: req.body.email });
    if (!admin) { return res.status(400).json({ message: "Invalid Email or Password " }); }


    const checkPassword = await bcrypt.compare(req.body.password, admin.password);
    if (!checkPassword) { return res.status(400).json({ message: "Invalid Email or Password " }); }

    const token = admin.generateTokens()

    // await admin.save();
    res.status(200).json({ token: token, admin: { _id: admin.id, email: admin.email, role: admin.role, image: admin.image } });


}



const register = async(req, res, next) => {

    const oldadmin = await adminModel.findOne({ email: req.body.email });
    if (oldadmin) { return res.status(400).json({ message: "Email already exists" }); }

    const admin = new adminModel(req.body);
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);
    admin.role = "role_Admin"


    await admin.save();
    const token = admin.generateTokens();
    res.header('x-auth-token', token).send(_.pick(admin, ['_id', 'email']));

}

///////////////////SORTIE//////////////

const createSortie = async(req, res, next) => {
    const sur = await surviverModel
        .findById({ _id: req.body.surviver.id })
        .exec()
    const bot = await boatModel
        .findById({ _id: req.body.boat.id })
        .exec()
    const save = await saverModel
        .findById({ _id: req.body.saver.id })
        .exec()

    let sortie = new sortieModel({
        date: req.body.date,
        location: req.body.location,

    }).then((sortie) => { sortie.survivers.push(sur._id), sortie.savers.push(save._id), sortie.boats.push(bot._id) });
    sortie
        .save()
        .then((sortie) => res.status(200).json(sortie))
        .catch((err) => res.status(400).json("Error on sortie save: " + err));
};

const deleteSortie = async(req, res) => {
    const sortie = await sortieModel.findById(req.params.id)
    console.log(req.param.id);

    if (sortie) {
        await sortie.remove()
        res.json({ message: 'Sortie removed' })
    } else {
        res.status(404)
        throw new Error('Sortie not found')
    }
}


const getSorties = async(req, res, next) => {

    await sortieModel
        .find().populate(['savers', 'survivers', 'boats'])
        .then((objet) => res.status(200).json(objet))
        .catch((err) => res.status(400).json("Error getting objet"));
};

const updateSortie = async(req, res) => {
    console.log(req.params.id);
    console.log("hello");

    const sortie = await sortieModel.findById(req.params.id)
    if (sortie) {
        sortie.date = req.body.date || sortie.date
        sortie.location = req.body.location || sortie.location

        const uodatedSortie = await sortie.save()

        res.json(uodatedSortie)


    } else {
        res.status(404)
        throw new Error('Sortie not found')
    }
}



////////////////////SAVER/////////////////////

const createSavers = async(req, res, next) => {
    const oldemail = await saverModel.findOne({ email: req.body.email });
    if (oldemail) { return res.status(400).json({ message: "Email already exists" }); }
    let saver = new saverModel({
        email: req.body.email,
        password: req.body.password,
        fullname: req.body.fullname,
        phoneNumber: req.body.phoneNumber,
    });

    await saver.save((err) => {
        if (err) {
            res.json({ success: false, message: err })

        } else {
            res.json({ success: true, saver })
        }


    })
};

const getSaver = async(req, res, next) => {

    await saverModel
        .find()
        .then((objet) => res.status(200).json({ email: objet.email, fullname: objet.fullname, phoneNumber: objet.phoneNumber }))
        .catch((err) => res.status(400).json("Error getting objet"));
};


const deleteSaver = async(req, res) => {
    const saver = await saverModel.findById(req.params.id)
    console.log(req.param.id);

    if (saver) {
        await saver.remove()
        res.json({ message: 'Saver removed' })
    } else {
        res.status(404)
        throw new Error('Saver not found')
    }
}

const updateSaver = async(req, res) => {
    console.log(req.params.id);
    console.log("hello");

    const saver = await saverModel.findById(req.params.id)
    if (saver) {
        saver.email = req.body.email || saver.email
        saver.password = req.body.password || saver.password
        saver.fullname = req.body.fullname || saver.fullname
        saver.phoneNumber = req.body.phoneNumber || saver.phoneNumber

        const uodatedSaver = await saver.save()

        res.json(uodatedSaver)


    } else {
        res.status(404)
        throw new Error('Saver not found')
    }
}

////////////////////SURVIVER/////////////////////



const createSurvivers = async(req, res, next) => {
    const oldemail = await surviverModel.findOne({ email: req.body.email });
    if (oldemail) { return res.status(400).json({ message: "Email already exists" }); }
    let surviver = new surviverModel({
        email: req.body.email,
        password: req.body.password,
        fullname: req.body.fullname,
        phoneNumber: req.body.phoneNumber,
    });

    await surviver.save((err) => {
        if (err) {
            res.json({ success: false, message: err })

        } else {
            res.json({ success: true, surviver })
        }


    })
};

const getSurvivers = async(req, res, next) => {

    await surviverModel
        .find()
        .then((objet) => res.status(200).json({ email: objet.email, fullname: objet.fullname, phoneNumber: objet.phoneNumber }))
        .catch((err) => res.status(400).json("Error getting objet"));
};

const deleteSurviver = async(req, res) => {
    const surviver = await surviverModel.findById(req.params.id)
    console.log(req.param.id);

    if (surviver) {
        await surviver.remove()
        res.json({ message: 'Surviver removed' })
    } else {
        res.status(404)
        throw new Error('Surviver not found')
    }
}

const updateSurviver = async(req, res) => {
    console.log(req.params.id);
    console.log("hello");

    const surviver = await surviverModel.findById(req.params.id)
    if (surviver) {
        surviver.email = req.body.email || surviver.email
        surviver.password = req.body.password || surviver.password
        surviver.fullname = req.body.fullname || surviver.fullname
        surviver.phoneNumber = req.body.phoneNumber || surviver.phoneNumber

        const uodatedSaver = await saver.save()

        res.json(uodatedSaver)


    } else {
        res.status(404)
        throw new Error('Surviver not found')
    }
}



////////////////////BOAT/////////////////////


const createBoats = async(req, res, next) => {
    const oldemail = await boatModel.findOne({ name: req.body.name });
    if (oldemail) { return res.status(400).json({ message: "name already exists" }); }
    let boat = new boatModel({
        name: req.body.name,

    });

    await boat.save((err) => {
        if (err) {
            res.json({ success: false, message: err })

        } else {
            res.json({ success: true, boat })
        }


    })
};


const getBoat = async(req, res, next) => {

    await boatModel
        .find()
        .then((objet) => res.status(200).json(objet))
        .catch((err) => res.status(400).json("Error getting objet"));
};

const deleteBoat = async(req, res) => {
    const boat = await boatModel.findById(req.params.id)
    console.log(req.param.id);

    if (boat) {
        await boat.remove()
        res.json({ message: 'Boat removed' })
    } else {
        res.status(404)
        throw new Error('Boat not found')
    }
}


const updateBoat = async(req, res) => {
    console.log(req.params.id);
    console.log("hello");

    const boat = await boatModel.findById(req.params.id)
    if (boat) {
        boat.email = req.body.email || boat.email
        boat.fullname = req.body.fullname || boat.fullname
        boat.phoneNumber = req.body.phoneNumber || boat.phoneNumber

        const uodatedBoat = await boat.save()

        res.json(uodatedBoat)


    } else {
        res.status(404)
        throw new Error('Boat not found')
    }
}






module.exports = {
    register,
    login,
    createSortie,
    getSorties,
    deleteSortie,
    updateSortie,
    createSavers,
    getSaver,
    deleteSaver,
    updateSaver,
    createSurvivers,
    getSurvivers,
    deleteSurviver,
    updateSurviver,
    createBoats,
    getBoat,
    deleteBoat,
    updateBoat,
    welcome
}