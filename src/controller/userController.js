import UserModel from "../model/user.model.js";
import JobsModel from "../model/jobs.model.js";

export default class UserController {
    postRegister(req, res) {
        const { name, email, password } = req.body;
        UserModel.create(name, email, password);

        // Add the showLoginModal variable to the render method
        res.render('home', { errorMessage: null, showLoginModal: true });
    }

    postLogin(req, res) {
        const { email, password } = req.body;
        const user = UserModel.isValidUser(email, password);

        if (!user) {

            res.json({ success: false, showModal: true });
            // res.render('home', {
            //     errorMessage: 'Invalid Credentials',
            //     showLoginModal: true
            // });
        }
        req.session.userEmail = email;
        let jobs = JobsModel.get();
        res.render('jobs', { jobs: jobs });
    }
}
