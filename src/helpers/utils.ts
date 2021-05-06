import moment = require("moment");
import { Constants } from "../config/constants";
import * as json2xls from "json2xls";
import * as fs from "fs";

export class Utils {

    /** get skip and limit to avoid multiple code lines */
    public static getSkipLimit = (page: number, recordsPerPage: number = null) => {
        let skip = 0;
        const limit = recordsPerPage ? recordsPerPage : Constants.RECORDS_PER_PAGE; // for paginate records
        if (page) {
            skip = (page - 1) * limit;
        }
        return { limit, skip };
    }
    public static createRandomcode = (length: number, isOTP: boolean) => {
        let code = "";
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // for referral code generator
        if (isOTP) {
          characters = "0123456789"; // for otp generator
        }
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          code += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return code;
    }
    public static getStandardDateFormatWithAddedMinutes = (value: number) => {
        return moment().add(value, "minutes").format(Constants.DATE_TIME_FORMAT)
    }

    public static JsonToExcel = (user, dateTime: string) => {
        var xls = json2xls(user);
        return fs.writeFileSync(`${dateTime}-data.xlsx`, xls, 'binary');
    }

    public static CurrentDate = () => {
        return moment(new Date()).tz(Constants.TIMEZONE).format('YYYY-MM-DD');
    }
}


