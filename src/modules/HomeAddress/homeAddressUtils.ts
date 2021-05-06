import * as My from "jm-ez-mysql";
import { Tables } from "../../config/tables";

export class HomeAddressUtils {
    public async createhomeAddress(Detail: JSON) {
        try {
            const newAddress = await My.insert(Tables.HOMEADDRESS, Detail);
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
            const joinQuery = `${Tables.HOMEADDRESS} oa LEFT JOIN ${Tables.CITY} c ON oa.CityId = c.id`;
            const params = ['oa.id','oa.Address1','oa.Address2','c.CityName','oa.PostalCode','oa.Phone'];
            const homeAddress = await My.findAll(joinQuery,
                params,
                `${whereQuery} group by oa.CityId ORDER BY oa.createdAt DESC ${limitQuery}`);
            return homeAddress;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    //update Address
    public async updateAddress(addressId,addressDetails: JSON){
        try {
            return await My.updateFirst(Tables.HOMEADDRESS, addressDetails, ' id = ?', [addressId]);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

     // check home address is exists or not
     public async checkhomeAddress(id) {
        try {
            return await My.first(Tables.HOMEADDRESS, ["id"],
                "id = ?", [id]);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    //delete address
    public async deleteAddress(id){
        try {
            return My.delete(Tables.HOMEADDRESS, `id=${id}`);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}