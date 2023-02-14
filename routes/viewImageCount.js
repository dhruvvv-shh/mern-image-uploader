const router = require("express").Router();
const { images } = require('../models/userimages')

router.post("/", async (req, res) => {
    try {
        console.log(req.body)
        const Image = await images.findOne({ _id: req.body.id });
        await images.findOneAndUpdate({ _id: req.body.id }, { viewcount: Image.viewcount + 1 });
        res.status(201).send(Image);

    } catch (error) {
        console.log('error ----->', error)
        res.status(500).send({ message: "Internal Server Error" });
    }
})


module.exports = router;
