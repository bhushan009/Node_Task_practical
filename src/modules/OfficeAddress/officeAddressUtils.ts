import * as My from "jm-ez-mysql";
import { Tables } from "../../config/tables";

export class OfficeAddressUtils {
    public async createOfficeAddress(Detail: JSON) {
        try {
            const newAddress = await My.insert(Tables.OFFICEADDRESS, Detail);
            return ({ id: newAddress.insertId });
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    //get address lists
    public async listAddress(skip: number = null, limit: number = null, Address: string = '') {
        try {
            let limitQuery = "";
            if (limit) {
                limitQuery = `LIMIT ${skip}, ${limit}`;
            }
            let whereQuery = `0 = 0`;
            if (Address) {
                whereQuery += ` AND (Address1 LIKE '%${Address}%')`;
            }
            const joinQuery = `${Tables.OFFICEADDRESS} oa LEFT JOIN ${Tables.CITY} c ON oa.CityId = c.id`;
            const params = ['oa.id','oa.Address1','oa.Address2','c.CityName','oa.PostalCode','oa.Phone'];
            const officeAddress = await My.findAll(joinQuery,
                params,
                `${whereQuery} group by oa.CityId ORDER BY oa.createdAt DESC ${limitQuery}`);
            return officeAddress;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    //update Address
    public async updateAddress(addressId,addressDetails: JSON){
        try {
            return await My.updateFirst(Tables.OFFICEADDRESS, addressDetails, ' id = ?', [addressId]);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

     // check office address is exists or not
     public async checkOfficeAddress(id) {
        try {
            return await My.first(Tables.OFFICEADDRESS, ["id"],
                "id = ?", [id]);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    //delete address
    public async deleteAddress(id){
        try {
            return My.delete(Tables.OFFICEADDRESS, `id=${id}`);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}