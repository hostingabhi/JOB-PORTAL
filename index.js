import express from 'express';
import ejsLayouts from 'express-ejs-layouts'
import path from 'path';
import JobController from './src/controller/job.controller.js';
import UserController from './src/controller/userController.js';
import ApplicantController from './src/controller/applicant.controller.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middlewares.js';
import validationMiddleware from './src/middlewares/job.middlewares.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { promises as fs } from 'fs';
import flash from 'express-flash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = 3000;
const server = express();
//setup a session key
server.use(
    session({
        secret: 'ABHISHEKPRAJAPAT',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false}
    })
);

server.use(flash());

server.use(express.static('public'));
//setup view engine setting
server.set("view engine","ejs")
server.set("views", path.join(path.resolve(),'src','view'))
server.use('/view-resume/public', express.static(path.join(__dirname, 'public')));

//parse form data
server.use(express.urlencoded({extended: true}));

//use layouts
server.use(ejsLayouts)

//create an instance of controller
const jobcontoller = new JobController();
const userController = new UserController();
const applicantController = new ApplicantController();
//setup all the routes
server.get("/", jobcontoller.home);
server.get("/jobs",jobcontoller.getjobs)
server.get("/ViewDetails/:id",jobcontoller.viewjobdetail)
//setup routes for user controller

// registration route handler in index.js
server.post("/register", userController.postRegister);
server.post("/login",userController.postLogin)
server.get("/logout",auth,userController.logout)

//setup other routes
server.post("/addapplicant/:id",uploadFile.single('CvUrl'),applicantController.postApplicant)
server.get("/app-detail/:id",auth,applicantController.getApplicant);
server.get("/view-resume/:id",auth,applicantController.getResume)

//curd opertaion on Job
server.get("/getform", auth, jobcontoller.getform)
server.post("/postjob", auth, jobcontoller.postjob)
server.get("/update-job/:id", auth, jobcontoller.getupdatejobview)
server.post("/update-job", auth, jobcontoller.postupdatejob)
server.post("/delete-job/:id",auth,jobcontoller.deletejob)


//validationMiddleware,
//Setup a Server
server.listen(port,()=>{
    console.log(`server is Working on http://localhost:${port}`);
})