const express = require("express")
const {open} = require("sqlite")
const sqlite3 = require("sqlite3")
const path = require("path")
const jwt = require("jsonwebtoken")
const cors = require("cors");
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
const { v4: uuidv4 } = require('uuid');
dotenv.config()


const DBpath = path.join(__dirname, "medCare.db")
let db 
const app = express();
app.use(express.json())
app.use(cors());

const initDB = async ()=>{
    try{
        db = await open({
        filename : DBpath,
        driver : sqlite3.Database
    },

    app.listen(3000, ()=>{
        console.log("server started and running at port 3000");
    })
    

    )}catch(e){
        console.log(e)
    }
}

initDB()



// Register API 

app.post("/register", async (req, res)=>{
    try{
        const {name ,email, password,role} = req.body
        const existDataQuery = `
        SELECT * FROM users WHERE email = '${email}';
        `
        
        const existUsers = await db.get(existDataQuery)

        if(!existUsers){
            const id = uuidv4()
            console.log(id)
            const hashedPassword = await bcrypt.hash(password, 10)
            const registerQuery = `
            INSERT INTO users (id, name, email, password,role)
            VALUES ('${id}','${name}',"${email}", '${hashedPassword}','${role}');
            `
            await db.run(registerQuery)
        
            res.send({message : "Login Success"})
        }else{
            res.status(401).send({error : "This Email is already registered!"})
        }
        
    }catch(e){
        console.log(e.message)
    }
})

//Login API

app.post("/login" , async (req, res)=>{
    const {email, password} = req.body
    const selectQuery = `
    SELECT * FROM users WHERE email = "${email}";
    `
    const userData = await db.get(selectQuery)
    if(!userData){
        res.status(401).send({error : "Email is Invalid!"})
    }

    const newPassword = userData.password
    const isPasswordValid = await bcrypt.compare(password,newPassword)
    if(isPasswordValid){
        const payload = {
                name : `${userData.name}`
            }
            const token = jwt.sign(payload, process.env.SECRET_KEY)
            res.send({name : `${userData.name}`,token})
    }else{
        res.status(401).send({error : "Password is Invalid!"})
    }

    
})


// Get Taken Dates 

app.get("/taken-dates", async (req, res)=>{
    
    try{
        const getDatesQuery = `
        SELECT taken_date FROM dates; 
        `
        const dates = await db.all(getDatesQuery)
        res.send(dates)

    }catch(e){
        console.log({error : e.message})
    }
})

// Add Date

app.post("/add-date", async (req, res)=>{
    
    try{
        const dateId = uuidv4()
        const {taken_date} = req.body
        const addDateQuery = `
            INSERT INTO dates (date_id, taken_date)
            VALUES ('${dateId}','${taken_date}');
            `
        await db.run(addDateQuery)
        res.status(200)

    }catch(e){
        console.log({error : e.message})
    }
})




