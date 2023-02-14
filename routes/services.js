const router = require("express").Router();
const { images } = require('../models/userimages')



router.get("/", async (req, res) => {
    try {
        const Image = await images.find();
        res.status(201).send(Image);

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
})


module.exports = router;
