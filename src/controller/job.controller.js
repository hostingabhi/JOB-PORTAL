import path from 'path';
import JobsModel from '../model/jobs.model.js';
import ApplicantModel from '../model/applicant.model.js';
import UserModel from '../model/user.model.js';


export default class JobController{
    home(req, res){
        let user = UserModel.get();
        res.render('home',{errorMessage:null,userEmail: req.session.userEmail})
    }
    getjobs(req,res){
        let jobs = JobsModel.get()
        res.render('jobs',{jobs:jobs,errorMessage:null,userEmail: req.session.userEmail})
    }
    viewjobdetail(req,res){
        let id = req.params.id;
        const job = JobsModel.getById(id);
        let applicants = ApplicantModel.getapp(id);
        res.render('job-detail', { job: job, errorMessage: null, applicants: applicants,userEmail: req.session.userEmail });
    }
    getform(req,res,next){
       return res.render('newjob',{userEmail: req.session.userEmail}); 
    }
    postjob(req,res,next){
        const {data_1, data_2, data_3, data_4, data_6, data_7, data_9, data_10} = req.body;
        const receivedSkillsArray = req.body.data_9;
        const formattedSkillsString = receivedSkillsArray.join(', ');
        JobsModel.addjob(data_1, data_2, data_3, data_4, data_6, data_7, formattedSkillsString, data_10);
        let jobs = JobsModel.get()
        res.render('jobs',{jobs:jobs,errorMessage:null,userEmail: req.session.userEmail})
    }

    getupdatejobview(req,res,next){
        const id = req.params.id;
        const jobfound = JobsModel.getById(id);
        if(jobfound){
            res.render('update-job',{job:jobfound, errorMessage:null,userEmail: req.session.userEmail});
        }
        else{
            res.status(401).send('Job not found');
        }
    }

    postupdatejob(req,res,next){
        const {id,data_1, data_2, data_3, data_4, data_6, data_7, data_9, data_10} = req.body;
        const receivedSkillsArray = req.body.data_9;
        const formattedSkillsString = receivedSkillsArray.join(', ');
        const data={id:parseInt(id),jobcat:data_1, jobdesg:data_2, jobloc:data_3, cname:data_4, salary:data_6, npos:data_7, skillset:formattedSkillsString, applyby:data_10}
        JobsModel.update(data)
        let jobs = JobsModel.get()
        res.render('jobs',{jobs:jobs,errorMessage:null,userEmail: req.session.userEmail})
    }

    deletejob(req,res,next){
        const id = req.params.id;
        const jobfound = JobsModel.getById(id);
        if(! jobfound){
            return res.status(401).send("Job not found");
        }else{
        JobsModel.delete(id);
        var jobs = JobsModel.get()
        res.render('jobs',{jobs:jobs,userEmail: req.session.userEmail})
        }

    }
}