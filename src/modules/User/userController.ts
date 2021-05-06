import * as bcryptjs from "bcryptjs";
import { Response } from "express";
import { Jwt } from "../../helpers/jwt";
import { UserUtils } from "./userUtils";
import { Constants } from "../../config/constants";


export class UserController {
    private userUtils: UserUtils = new UserUtils();

    // sign-up user
    public signup = async (req: any, res: Response) => {
        try {
            // encrypt password
            req.body.Password = bcryptjs.hashSync(req.body.Password.toString(), Constants.PASSWORD_HASH);

            // creating User profile
            const result = await this.userUtils.createUser(req.body);
            if (result && result.id) {
                // JWT token
                const userDetails = {
                    token: Jwt.getAuthToken({ userId: result.id }),
                    Email: req.body.Email,
                    UserName: req.body.FirstName + ' ' + req.body.LastName
                };
                return res.status(Constants.SUCCESS_CODE).json(userDetails); // sending only JWT token in response
            } else {
                return res.status(Constants.FAIL_CODE).json(result); // sending error if any
            }
        }
        catch (error) {
            console.log(error);
            return res.status(Constants.INTERNAL_SERVER_ERROR_CODE).json({ error: req.t("ERR_INTERNAL_SERVER") })
        }
    }

    // Login user
    public login = async (req: any, res: Response) => {
        try {
            const details = {
                token: Jwt.getAuthToken({ userId: req.body._authentication.id }),
                UserName: req.body._authentication.FirstName + ' ' + req.body._authentication.LastName,
                Email: req.body._authentication.Email,
            };
            res.status(Constants.SUCCESS_CODE).json(details);
        } catch (err) {
            return res.status(Constants.INTERNAL_SERVER_ERROR_CODE).send({ error: req.t("ERR_INTERNAL_SERVER") });
        }
    }
}