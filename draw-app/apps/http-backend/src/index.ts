import express from "express";

const app = express();

app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body. password;

    try{
        await UserModel.create({
            username,
            password
        })
        res.json({
            message: "User signed up"
        })
    }catch(e){
        res.status(411).json({
            message:" User already exists"
        })
    }
    
})

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body. password;
    const existingUser = await UserModel.findOne({
        username,
        password
    })
    if (existingUser){
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD)

        res.json({token})
    }else{
        res.status(403).json({
            message: "incorrect credentials"
        })
    }

})
app.listen(3001)