import { IsEmail, IsNotEmpty, Validate, IsEnum, IsBoolean, ValidateNested, validate } from "class-validator";

import { Model } from "../../model";
import { IsPasswordMatchesRequirementsConstraint, IsEmailAlreadyExistConstraint } from "./userValidator";

export class UserModel extends Model {

    @IsNotEmpty()
    public FirstName: string;

    @IsNotEmpty()
    public LastName: string;

    @IsNotEmpty()
    @IsEmail({}, { message: "EMAIL_INVALID" })
    @Validate(IsEmailAlreadyExistConstraint, {
        message: "ERR_EMAIL_ALREADY_EXISTS",
    })
    public Email: string;

    @IsNotEmpty()
    @Validate(IsPasswordMatchesRequirementsConstraint, {
        message: "PASSWORD_WARNING",
    })
    public Password: string;

    constructor(body: any) {
        super();
        const {
            FirstName,
            LastName,
            Email,
            Password,
        } = body;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Email = Email;
        this.Password = Password;
    }
}

export class AuthUserModel extends Model {
    @IsNotEmpty()
    @IsEmail({}, { message: "EMAIL_INVALID" })
    public Email: string;

    @IsNotEmpty()
    @Validate(IsPasswordMatchesRequirementsConstraint, {
        message: "PASSWORD_WARNING",
    })
    public Password: string;

    constructor(body: any){
        super();
        const {
            Email,
            Password,
        } = body;
        this.Email = Email;
        this.Password = Password;
    }
}