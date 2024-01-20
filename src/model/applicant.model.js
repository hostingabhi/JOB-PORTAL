export default class ApplicantModel {
    constructor(_appid, _sn, _jobid, _appname, _appemail, _appcontact, _CvUrl) {
        this.appid = _appid;
        this.sn = _sn;
        this.jobid = _jobid;
        this.appname = _appname;
        this.appemail = _appemail;
        this.appcontact = _appcontact;
        this.CvUrl = _CvUrl;
    }

    static add(id, applicantName, applicantEmail, applicantContact, CvUrl) {
        // Filter applicants based on the provided job ID
        const relevantApplicants = applicants.filter((applicant) => applicant.jobid == id);
    
        // Find the last applicant for the given job ID
        const lastApplicant = relevantApplicants.reduce((acc, applicant) =>
            applicant.sn > acc.sn ? applicant : acc, { sn: 0 });

        // Create a new applicant with the incremented sn
        const newapplicant = new ApplicantModel(
            applicants.length + 1,
            (lastApplicant ? lastApplicant.sn : 0) + 1 ,
            parseInt(id),
            applicantName,
            applicantEmail,
            applicantContact,
            CvUrl
        );
        // Push the new applicant to the array
        applicants.push(newapplicant);
    }
    
    static get(id) {
        return applicants.filter((applicant) => applicant.jobid == id);
    }
    static getapp(id) {
        // Filter applicants based on the provided job ID
        const relevantApplicants = applicants.filter((applicant) => applicant.jobid == id);
        
        // Return the count of relevant applicants
        return relevantApplicants.length;
    }
    
    static getresume(id){
        return applicants.find(applicant => applicant.appid === id);
    }
}

var applicants = [
    new ApplicantModel(1, 1, 1, 'anil', 'anil@gmail.com','123456789', 'public/resume/1705683728490-Abhishek.pdf'),
    new ApplicantModel(2, 1, 2, 'anil2', 'anil2@gmail.com','123456789', 'public/resume/1705683728490-Abhishek.pdf'),
    new ApplicantModel(3, 1, 3, 'anil3', 'anil3@gmail.com','123456789', 'public/resume/1705683728490-Abhishek.pdf')
];

