import UserModel from "../model/user.model.js";
import JobsModel from "../model/jobs.model.js";

export default class UserController {
    postRegister(req, res) {
        const { name, email, password } = req.body;
        UserModel.create(name, email, password);
        // Add the showLoginModal variable to the render method
        res.render('home', {errorMessage:null,userEmail: req.session.userEmail});
    }

    postLogin(req, res) {
        const { email, password } = req.body;
        const user = UserModel.isValidUser(email, password);
        if (!user) {
            const errorMessage = "Invalid credentials"
            return res.render('home',{errorMessage:errorMessage,userEmail: req.session.userEmail});
        }else{
        req.session.userEmail = email;
        let jobs = JobsModel.get();
        res.render('jobs', { jobs: jobs,userEmail: req.session.userEmail });
        }
    }

    logout(req,res,next){
        req.session.destroy((err) => {
            if (err) {
            console.log(err);
            } else {
            res.redirect('/');
            }
            });
    }
}
