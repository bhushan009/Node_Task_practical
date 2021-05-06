import * as My from "jm-ez-mysql";
import { Tables } from "../../config/tables";

export class UserUtils {
    public async createUser(adminDetail: JSON) {
        try {
            const newAdmin = await My.insert(Tables.USERS, adminDetail);
            return ({ id: newAdmin.insertId });
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    // check user email is exists or not
    public async checkUserEmailExists(Email: string) {
        try {
            return await My.first(Tables.USERS, ["id", "FirstName", "LastName", "Email", "Password"],
                "Email = ?", [Email]);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}