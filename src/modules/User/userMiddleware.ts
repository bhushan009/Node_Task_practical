import bcryptjs = require("bcryptjs");
import { Request, Response } from "express";
import { UserUtils } from "./userUtils";
import { Constants } from "../../config/constants";

export class UserMiddleware {
    private userUtils: UserUtils = new UserUtils();

    public checkCredentials = async (req: any, res: Response, next: () => void) => {

        // get user detail by email address
        const user = await this.userUtils.checkUserEmailExists(req.body.Email);

        // check credentials matches or not
        if (user && user.id &&
            await bcryptjs.compare(req.body.Password, user.Password)) {
            req.body._authentication = user;
            next();
        } else {
            return res.status(Constants.UNAUTHORIZED_CODE).json({ error: req.t("INVALID_CREDENTIALS"), code: Constants.UNAUTHORIZED_CODE });
        }
    }
}
