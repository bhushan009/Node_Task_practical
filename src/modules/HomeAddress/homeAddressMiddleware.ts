import { Request, Response } from "express";
import { HomeAddressUtils } from "./homeAddressUtils";
import { Constants } from "../../config/constants";

export class HomeMiddleware {
    private homeaddressUtils: HomeAddressUtils = new HomeAddressUtils();

    public checkhomeAddress = async (req: any, res: Response, next: () => void) => {
        const address = await this.homeaddressUtils.checkhomeAddress(req.params.id);
        if(address){
            next();
        } else {
            return res.status(Constants.FAIL_CODE).json({ error: req.t("ADDRESS_NOT_EXISTS"), code: Constants.FAIL_CODE });
        }
    }

}