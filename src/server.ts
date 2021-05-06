import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as express from "express";
// tslint:disable-next-line: no-var-requires
require("express-async-errors");
import * as helmet from "helmet"; // Security
import * as l10n from "jm-ez-l10n";
import * as morgan from "morgan"; // log requests to the console (express4)

import { Log } from "./helpers/logger";
import { Routes } from "./routes";
import { DB } from "./database";

dotenv.config();
// initialize database
DB.init();

export class Server {
  protected app: express.Application;
  private logger = Log.getLogger();
  constructor() {
    const PORT = process.env.PORT;
    this.app = express();
    this.app.use(helmet());
    this.app.all("/*", (req, res, next) => {

     // res.setHeader("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Request-Headers", "*");
     // tslint:disable-next-line: max-line-length
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, Authorization,X-L10N-Locale");
     res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
      if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
      } else {
        next();
      }
    });
    l10n.setTranslationsFile("en", `src/language/lang.en.json`);
    this.app.use(l10n.enableL10NExpress);
    this.app.use(morgan("dev"));
    this.app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
    const routes = new Routes();
    this.app.use("/api", routes.path());
    this.app.listen(PORT, () => {
      this.logger.info(`The server is running in port localhost: ${process.env.PORT}`);
    });

  }
}
