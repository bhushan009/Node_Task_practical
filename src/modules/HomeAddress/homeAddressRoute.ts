import { Router } from "express";
import { Validator } from "../../validate";
import { HomeAddressController } from "./homeAddressController";
import { HomeAddressModel } from "./homeAddressModel";
import { HomeMiddleware } from "./homeAddressMiddleware";

const router: Router = Router();
const v: Validator = new Validator();
const homeAddressController = new HomeAddressController();
const homeAddressMiddleware = new HomeMiddleware();

//home address routes
router.post('/add',v.validate(HomeAddressModel), homeAddressController.addAddress);
router.get('/list', homeAddressController.listAddress);
router.post('/update/:id',homeAddressMiddleware.checkhomeAddress, homeAddressController.updateAddress);
router.delete('/delete/:id',homeAddressMiddleware.checkhomeAddress, homeAddressController.deleteAddress)


export const HomeAddressRoute: Router = router;