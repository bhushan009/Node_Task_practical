import { Response } from "express";
import { OfficeAddressUtils } from "./officeAddressUtils";
import { Constants } from "../../config/constants";
import { Utils } from "../../helpers/utils";
import moment = require("moment");

export class OfficeAddressController {
    private officeaddressUtils: OfficeAddressUtils = new OfficeAddressUtils();

    //add office address
    public addAddress = async (req: any, res: Response) => {
        try {
             await this.officeaddressUtils.createOfficeAddress(req.body);
            res.status(Constants.SUCCESS_CODE).json({Message: req.t("OFFICE_ADDRESS_ADDED")});
        } catch (err) {
            return res.status(Constants.INTERNAL_SERVER_ERROR_CODE).json({ error: req.t("ERR_INTERNAL_SERVER") })
        }
    }

    //get office address list
    public listAddress = async (req: any, res: Response) => {
        try {
            const { skip, limit } = Utils.getSkipLimit(req.query.page, req.query.limit);
            const ListAddress = await this.officeaddressUtils.listAddress(skip,limit,req.query.Address);
            return res.status(Constants.SUCCESS_CODE).send(ListAddress);
        } catch (err) {
            return res.status(Constants.INTERNAL_SERVER_ERROR_CODE).json({ error: req.t("ERR_INTERNAL_SERVER") })
        }
    }

    //update address
    public updateAddress = async (req: any, res: Response) => {
        try {
            req.body.UpdatedAt = moment(new Date()).tz(Constants.TIMEZONE).format(Constants.DATE_TIME_FORMAT);
            await this.officeaddressUtils.updateAddress(req.params.id,req.body);
            return res.status(Constants.SUCCESS_CODE).send({Message: req.t("OFFICE_ADDRESS_UPDATED")});
        } catch (err) {
            return res.status(Constants.INTERNAL_SERVER_ERROR_CODE).json({ error: req.t("ERR_INTERNAL_SERVER") })
        }
    }

    //delete address
    public deleteAddress = async (req: any, res: Response) => {
        try {
            await this.officeaddressUtils.deleteAddress(req.params.id);
            return res.status(Constants.SUCCESS_CODE).send({Message: req.t("OFFICE_ADDRESS_DELETED")});
        } catch (err) {
            return res.status(Constants.INTERNAL_SERVER_ERROR_CODE).json({ error: req.t("ERR_INTERNAL_SERVER") })
        }
    }
}