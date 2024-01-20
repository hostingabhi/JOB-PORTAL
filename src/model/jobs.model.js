export default class JobsModel{
    constructor( _id,_jobcat, _jobdesg, _jobloc, _cname, _salary, _npos, _skillset, _applyby){
        this.id = _id
        this.jobcat = _jobcat
        this.jobdesg = _jobdesg
        this.jobloc = _jobloc
        this.cname = _cname
        this.salary = _salary
        this.npos = _npos
        this.skillset = _skillset
        this.applyby =_applyby
    }
    static get(){
        return jobs
    }

    static getById(id) {
        const jobId = parseInt(id);
        return jobs.find(job => job.id === jobId);
    }
    static addjob(data_1, data_2, data_3, data_4, data_6, data_7, data_9, data_10){
        let newjob = new JobsModel(
            jobs.length+1,
            data_1,
            data_2,
            data_3,
            data_4,
            data_6,
            data_7,
            data_9,
            data_10
        )
        jobs.push(newjob);
    }

    static update(jobobj) {
        const jobId = jobobj.id; // Ensure jobId is a string or a number
    
        // Find the index of the job with the specified id
        const index = jobs.findIndex((job) => job.id == jobId); // Use loose equality to handle string/number comparison
    
        // If the job with the specified id is found, update it
        if (index !== -1) {
            jobs[index] = jobobj;
            return true; // Indicate success
        }
    
        return false; // Indicate failure (job with specified id not found)
    }

    static delete(id){
        const index = jobs.findIndex((job) => job.id == id);
        jobs.splice(index, 1);
    }
    
}

const jobs = [
    new JobsModel(1,'Non Tech', 'SDE', 'Gurgoan HR IND REMOTE', 'Coding Ninja', '14-20 LPA' , '10','React, Node Js, Java Script','Mon Jan 29 2024'),
    new JobsModel(2,'Tech', 'MERN Developer', 'Pune IND On-Site', 'Go Digit', '6-10 LPA' , '15','React, Node Js, HTML', 'Tue Jan 30 2024'),
    new JobsModel(3,'Tech', 'SDE', 'Bangalore', 'Juspay', '20-26 LPA' , '20','React, Node Js, CSS', 'Wed Jan 31 2024')
]