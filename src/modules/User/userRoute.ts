import { Router } from "express";
import { Validator } from "../../validate";
import { AuthUserModel, UserModel } from "./userModel";
import { UserController } from "./userController";
import { UserMiddleware } from "./userMiddleware";

const router: Router = Router();
const v: Validator = new Validator();
const userController = new UserController();
const userMiddleware = new UserMiddleware();

// Authorization
router.post('/sign-up',v.validate(UserModel), userController.signup);
router.post('/sign-in',v.validate(AuthUserModel), userMiddleware.checkCredentials, userController.login);

export const UserRoute: Router = router;