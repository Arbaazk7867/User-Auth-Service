const { DataTypes, Sequelize } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (sequelize) =>{
    const User = sequelize.define('User',{
       email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
       },
       password:{
        type:DataTypes.STRING,
        allowNull:false
       } 
    })

    User.beforeCreate(async(user)=>{
        const hashedPassword = await bcrypt.hash(user.password,saltRounds)
        user.password = hashedPassword
    })
    return User
}