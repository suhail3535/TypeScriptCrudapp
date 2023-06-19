const express = require("express");
const { UserModel } = require("../db/db");
const userRouter = express.Router();




// <--------------------Postrequest-------------------------->

userRouter.post("/add", async (req, res) => {
    const data = req.body;
    try {
        const user = new UserModel(data)
        await user.save()
        res.status(200).send({ "msg": "user details added" })
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})
// <--------------------getrequest-------------------------->

userRouter.get("/", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send({ msg: "error.msg " });
    }
});


// <--------------------updaterequest-------------------------->

userRouter.patch("/update/:userID", async (req, res) => {
    const { userID } = req.params;
    const data = req.body;
    try {
        await UserModel.findByIdAndUpdate({ _id: userID }, data);
        res.status(200).send({ msg: "product details updated" });
    } catch (error) {
        res.status(400).send({ msg: error.msg });
    }
});

// <--------------------deleterequest-------------------------->


userRouter.delete("/delete/:userID", async (req, res) => {
    const { userID } = req.params;
    try {
        await UserModel.findByIdAndDelete({ _id: userID });
        res.status(200).send({ msg: " product details deleted" });
    } catch (error) {
        res.status(400).send({ msg: error.msg });
    }
});





module.exports = {
    userRouter
}