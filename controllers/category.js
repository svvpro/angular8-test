const Category = require('../models/Category');
const fs = require('fs');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        const categories = await Category.find({});
        if (categories) {
            res.status(200).json(categories);
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const category = await Category.findOne({_id: req.params.id});
        if (category) {
            res.status(200).json(category);
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.add = async (req, res) => {
    try {
        const category = await new Category({
            name: req.body.name,
            imgSrc: req.file ? req.file.path : '',
            user: req.user._id
        }).save();

        if (category) {
            res.status(200).json(category);
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    try {
        const data = {
            name: req.body.name
        };

        console.log(req.file);

        if(req.file) {
            const currentRecord = await Category.findOne({_id: req.params.id});
            if (currentRecord.imgSrc !== "") {
                fs.unlinkSync(currentRecord.imgSrc);
            }
            data.imgSrc = req.file.path;
        }

        const category = await Category.findByIdAndUpdate(
            {_id: req.params.id},
            {$set: data},
            {new: true}
        );

        if (category) {
            res.status(200).json(category);
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.delete = async (req, res) => {
    try {
        const category = await Category.findOne({_id: req.params.id});

        if (category.imgSrc !== "") {
            fs.unlinkSync(category.imgSrc);
        }

        await Category.deleteOne({_id: req.params.id});

        res.status(200).json({
            message: "Category deleted"
        })
    } catch (e) {
        errorHandler(res, e);
    }
};
