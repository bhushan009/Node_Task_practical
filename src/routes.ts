import * as express from "express";
import * as l10n from "jm-ez-l10n";
import { Constants } from "./config/constants";
import { UserRoute } from "./modules/User/userRoute";

export class Routes {

  public path() {
    const router = express.Router();

    router.use('/user', UserRoute);

    router.all("/*", (req, res) => {
      return res.status(Constants.NOT_FOUND_CODE).json({
        error: l10n.t("ERR_URL_NOT_FOUND"),
      });
    });
    return router;
  }
}
