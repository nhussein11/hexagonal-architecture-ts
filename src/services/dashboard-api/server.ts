import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { localTRPCCompose } from "./app/composition-root";

const PORT = 4000;
const URL = `http://localhost:${PORT}`;

// created for each request
const createContext = () => ({});
const app = express();

app.use(cors());

app.use(
  URL,
  trpcExpress.createExpressMiddleware({
    router: localTRPCCompose().appRouter,
    createContext,
  })
);

app.listen(PORT, () => {
  console.log(`listening on ${URL}`);
});
