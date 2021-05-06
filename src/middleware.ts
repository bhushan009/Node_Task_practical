import { Request, Response } from "express";
import * as l10n from "jm-ez-l10n";
import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Constants } from "./config/constants";
import { Tables } from "./config/tables";
import { Jwt } from "./helpers/jwt";
export class Middleware {
    public getUserAuthorized = async (req: any, res: Response, next: () => void) => {

        if (req.headers.authorization && !_.isEmpty(req.headers.authorization)) {
            try {
                const tokenInfo = Jwt.decodeAuthToken(req.headers.authorization.toString());

                if (tokenInfo) {
                    const params = ['id', 'FirstName', 'LastName', 'Email'];
                    const user = await My.first(Tables.USERS, params,
                        "id = ?", [tokenInfo.userId]);

                    if (user) {
                        req.body._user = user;
                        next();
                    } else {
                        res.status(Constants.UNAUTHORIZED_CODE).json({ error: req.t("ERR_UNAUTH"), code: Constants.UNAUTHORIZED_CODE });
                        return;
                    }
                } else {
                    res.status(Constants.UNAUTHORIZED_CODE).json({ error: req.t("ERR_UNAUTH"), code: Constants.UNAUTHORIZED_CODE });
                    return;
                }
            } catch (error) {
                res.status(Constants.INTERNAL_SERVER_ERROR_CODE).json({ error: l10n.t("ERR_INTERNAL_SERVER"), code: Constants.INTERNAL_SERVER_ERROR_CODE });
                return;
            }
        } else {
            res.status(Constants.UNAUTHORIZED_CODE).json({ error: l10n.t("ERR_UNAUTH"), code: Constants.UNAUTHORIZED_CODE });
            return;
        }
    }
}