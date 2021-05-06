import { Response } from "express";
import { HomeAddressUtils } from "./homeAddressUtils";
import { Constants } from "../../config/constants";
import { Utils } from "../../helpers/utils";
import moment = require("moment");

export class HomeAddressController {
    private homeaddressUtils: HomeAddressUtils = new HomeAddressUtils();

    //add home address
    public addAddress = async (req: any, res: Response) => {
        try {
             await this.homeaddressUtils.createhomeAddress(req.body);
            res.status(Constants.SUCCESS_CODE).json({Message: req.t("HOME_ADDRESS_ADDED")});
        } catch (err) {
            return res.status(Constants.INTERNAL_SERVER_ERROR_CODE).json({ error: req.t("ERR_INTERNAL_SERVER") })
        }
    }

    //get home address list
    public listAddress = async (req: any, res: Response) => {
        try {
            const { skip, limit } = Utils.getSkipLimit(req.query.page, req.query.limit);
            const ListAddress = await this.homeaddressUtils.listAddress(skip,limit,req.query.Address);
            return res.status(Constants.SUCCESS_CODE).send(ListAddress);
        } catch (err) {
            return res.status(Constants.INTERNAL_SERVER_ERROR_CODE).json({ error: req.t("ERR_INTERNAL_SERVER") })
        }
    }

    //update address
    public updateAddress = async (req: any, res: Response) => {
        try {
            req.body.UpdatedAt = moment(new Date()).tz(Constants.TIMEZONE).format(Constants.DATE_TIME_FORMAT);
            await this.homeaddressUtils.updateAddress(req.params.id,req.body);
            return res.status(Constants.SUCCESS_CODE).send({Message: req.t("HOME_ADDRESS_UPDATED")});
        } catch (err) {
            return res.status(Constants.INTERNAL_SERVER_ERROR_CODE).json({ error: req.t("ERR_INTERNAL_SERVER") })
        }
    }

    //delete address
    public deleteAddress = async (req: any, res: Response) => {
        try {
            await this.homeaddressUtils.deleteAddress(req.params.id);
            return res.status(Constants.SUCCESS_CODE).send({Message: req.t("HOME_ADDRESS_DELETED")});
        } catch (err) {
            return res.status(Constants.INTERNAL_SERVER_ERROR_CODE).json({ error: req.t("ERR_INTERNAL_SERVER") })
        }
    }
}