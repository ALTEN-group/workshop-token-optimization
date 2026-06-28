// @ts-check
import express from "express";
import { log } from "@dwtechs/winstan";
import { endTimer, startTimer } from "@dwtechs/winstan-plugin-express-perf";
import { listen } from "@dwtechs/servpico-express";
import { errorHandler } from "@dwtechs/errandler-express";
import healixRouter from "@dwtechs/healix-express";


const app = express();
app.disable("x-powered-by");

import routeSvc from "./services/route.js";


// middlewares
import { send204 } from "./middlewares/res/send-204.js";

// Routes
import route from "./routes/route.js";

const s = "/gateway/";

app.use(express.json({ limit: "100kb" }));
app.use(`${s}health`, healixRouter);
// performance measurement starts for any call to the following routes
app.use(startTimer);

// Routes
app.use(`${s}routes`, route, send204);

// Performance measurement ends
app.use(endTimer);

// Error handling
errorHandler(app);

// Init cached reference data
Promise.all([
  routeSvc.init()
])
  .then(() => {
    listen(app);
  })
  .catch((err) => log.error(`App cannot start: ${err.message || err.msg}`));
