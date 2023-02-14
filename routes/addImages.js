const router = require("express").Router();
const { images } = require('../models/userimages');
const Joi = require("joi");
const jwt = require('jsonwebtoken');

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        console.log(error)

        if (error)
            return res.status(400).send({ message: error.details[0].message });

        await new images({ ...req.body }).save();

        res.status(201).send({ message: "Image Added successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" });
    }
});


const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        url: Joi.string().required(),
        title: Joi.string().required(),
        desc: Joi.string().required(),
        viewcount: Joi.number().required(),
    });
    return schema.validate(data);
};


module.exports = router;
