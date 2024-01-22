import ApplicantModel from "../model/applicant.model.js";
import JobsModel from "../model/jobs.model.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { promises as fs } from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class ApplicantController {
    postApplicant(req, res) {
        const id = req.params.id;
        const { applicantName, applicantEmail, applicantContact } = req.body;
        const CvUrl = 'public/resume/' + req.file.filename;
        ApplicantModel.add(id, applicantName, applicantEmail, applicantContact, CvUrl);

        const job = JobsModel.getById(id);
        let applicants = ApplicantModel.getapp(id);
        res.render('job-detail', { job: job, errorMessage: null, applicants: applicants,userEmail: req.session.userEmail });
    }

    getApplicant(req, res, next) {
        const id = req.params.id;
        var applicants = ApplicantModel.get(id);
        res.render('app-detail', { applicants: applicants,userEmail: req.session.userEmail });
    }

    async getResume(req, res, next) {
        const id = parseInt(req.params.id);
        try {
            const applicant = await ApplicantModel.getresume(id);
            if (!applicant) {
                return res.status(404).send('Applicant not found');
                
            }
            const resumePath = path.join(__dirname, '..', '..', applicant.CvUrl);

            // Check if the file exists before attempting to send it
            const fileExists = await fs.access(resumePath).then(() => true).catch(() => false);

            if (!fileExists) {
                return res.status(404).send('Resume not found');
            }

            // Open a new tab to display the PDF
            res.send(`
                <script>
                    window.open('${applicant.CvUrl}', '_blank');
                </script>
            `);

        } catch (error) {
            console.error('Error getting resume:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}
