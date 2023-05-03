import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { TRPCCompose } from "./app/composition-root";
import { PORT, TRPC_ENDPOINT } from "../../vite-env.d";

// created for each request
const createContext = () => ({});
const app = express();

app.use(express.json());
app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: TRPCCompose().appRouter,
    createContext,
  })
);

app.listen(PORT, () => {
  console.log(`Listening on ${TRPC_ENDPOINT}`);
});
