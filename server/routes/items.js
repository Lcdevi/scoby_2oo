const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const uploader = require("../config/cloudinary");


router.get("/", (req, res, next)=>{
    Item
        .find()
        .then((itemsList)=> {
            res.status(200).json(itemsList);
        })
        .catch((err)=> {
            res.status(500).json(err);
        })
})

router.get("/:id", (req, res, next)=> {
    Item
        .findById(req.params.id)
        .then((oneItem)=> {
            res.status(200).json(oneItem);
        })
        .catch((err)=> {
            res.status(500).json(err);
        })
})

router.post('/', uploader.single("image"), (req, res, next) => {
    const newItem = req.body;

    if(req.file) {
        newItem.image = req.file.path;
    }

   Item.create(newItem)
    .then((itemDocument) => {
        res.status(201).json(itemDocument)
    })
    .catch((error) => {
        res.status(500).json(error);
    })
});

router.patch("/:id", uploader.single("image"), (req, res, next) => {
    const updateValues = req.body;

    if(req.file) {
        updateValues.image = req.file.path;
    }

    Item.findByIdAndUpdate(req.params.id, updateValues, {new: true} )
        .then(itemDocument => {
            res.status(200).json(itemDocument);
        })
        .catch(error => {
            res.status(500).json(error);
    })
})

router.delete("/:id", (req, res, next) => {
    Item
        .findByIdAndRemove(req.params.id)
        .then((deletedItem) => {
            res.sendStatus(204).json(deletedItem);
        })
        .catch(error => 
            res.status(500).json(error))
});

module.exports = router;