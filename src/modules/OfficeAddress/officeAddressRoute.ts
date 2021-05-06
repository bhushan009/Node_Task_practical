import { Router } from "express";
import { Validator } from "../../validate";
import { OfficeAddressController } from "./officeAddressController";
import { OfficeAddressModel } from "./officeAddressModel";
import { OfficeMiddleware } from "./officeAddressMiddleware";

const router: Router = Router();
const v: Validator = new Validator();
const officeAddressController = new OfficeAddressController();
const officeAddressMiddleware = new OfficeMiddleware();

//ofiice address routes
router.post('/add',v.validate(OfficeAddressModel), officeAddressController.addAddress);
router.get('/list', officeAddressController.listAddress);
router.post('/update/:id',officeAddressMiddleware.checkOfficeAddress, officeAddressController.updateAddress);
router.delete('/delete/:id',officeAddressMiddleware.checkOfficeAddress, officeAddressController.deleteAddress)


export const OfficeAddressRoute: Router = router;