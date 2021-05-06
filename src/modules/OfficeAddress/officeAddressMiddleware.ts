import { Request, Response } from "express";
import { OfficeAddressUtils } from "./officeAddressUtils";
import { Constants } from "../../config/constants";

export class OfficeMiddleware {
    private officeaddressUtils: OfficeAddressUtils = new OfficeAddressUtils();

    public checkOfficeAddress = async (req: any, res: Response, next: () => void) => {
        const address = await this.officeaddressUtils.checkOfficeAddress(req.params.id);
        if(address){
            next();
        } else {
            return res.status(Constants.FAIL_CODE).json({ error: req.t("ADDRESS_NOT_EXISTS"), code: Constants.FAIL_CODE });
        }
    }

}