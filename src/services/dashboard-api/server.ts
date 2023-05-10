import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { PORT, TRPC_ENDPOINT } from "../../vite-env.d";
import { TRPCCompose } from "./app/composition-root";

const createContext = () => ({});
const app = express();

app.use(cors());

const { appRouter } = TRPCCompose();

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(PORT, () => {
  console.log(`Listening on ${TRPC_ENDPOINT}`);
});
