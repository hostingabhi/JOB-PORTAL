import { body, validationResult } from 'express-validator'
import JobsModel from '../model/jobs.model.js';


const validateRequest = async (req, res, next) => {

    //EPRESSS VALIDATOR
    // 1.Setup rules for validation

    const rules = [
        body('applicant-name').notEmpty().withMessage("Name is required"),

        body('applicant-email')
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Invalid email format"),

        body('applicant-contact')
            .notEmpty().withMessage("Contact is required")
            .isMobilePhone().withMessage("Invalid contact number"),

        body('CvUrl').custom((value, { req }) => {
            if (!req.file) {
                throw new Error("Resume is required");
            }

            // Check file extension
            const allowedExtensions = ['.pdf', '.doc', '.docx'];
            const ext = path.extname(req.file.originalname).toLowerCase();

            if (!allowedExtensions.includes(ext)) {
                throw new Error("Invalid file format. Please upload a PDF or Word document.");
            }

            return true;
        }),
    ];

    //2. run those rules.
    await Promise.all(rules.map(rule => rule.run(req)))

    //3.check if there are any error after running thr rules.
    var validationErrors = validationResult(req);

    //4.if there are any error then return the error massage
    if (!validationErrors.isEmpty()) {
        let id = req.params.id;
        const job = JobsModel.getById(id);
        return res.render('job-detail', {job:job, errorMessage: validationErrors.array()[0].msg });
    }
    next();
}

export default validateRequest;