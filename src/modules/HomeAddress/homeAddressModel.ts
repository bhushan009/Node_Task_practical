import { IsNotEmpty } from "class-validator";

import { Model } from "../../model";

export class HomeAddressModel extends Model {

    @IsNotEmpty()
    public Address1: string;

    @IsNotEmpty()
    public CityId: number;

    @IsNotEmpty()
    public PostalCode: string;

    @IsNotEmpty()
    public Phone: string;

    constructor(body: any) {
        super();
        const {
            Address1,
            CityId,
            PostalCode,
            Phone,
        } = body;
        this.Address1 = Address1;
        this.CityId = CityId;
        this.PostalCode = PostalCode;
        this.Phone = Phone;
    }
}