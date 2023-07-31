const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {Sequelize} = require('sequelize')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const sequelize = new Sequelize('sampledb','postgres','Test@1234',{
    host:'localhost',
    dialect:'postgres',
})

const User = require('./models/users')(sequelize)

app.post('/signup',async(req,res)=>{
    try{
        const {email,password} = req.body
        await User.create({email,password})
        res.status(201).json({message:'User Created Successfully'})
    } catch(err){
        res.status(500).json({message:'Error Creating User'})
    }
})

app.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body
        const user = await User.findOne({where:{email}})
        if (!user){
            return res.status(404).json({message:'User Not Found'})
        }

        const isValidPassword = await bcrypt.compare(password,user.password)
        if(!isValidPassword){
            return res.status(401).json({message:'Invalid Password'})
        }
        res.status(200).json({message:'Login Successful'})
    } catch (err){
        res.status(500).json({message:'Error Loggin in'})
    }
})

sequelize.sync().then(()=>{
    app.listen(3000,()=>{
        console.log('Server is running on http://localhost:3000')
    })
})