import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCReact, httpLink } from "@trpc/react-query";
import { useState } from "react";
import { TRPCCompose } from "./services/dashboard-api/app/composition-root";
import { TRPC_ENDPOINT } from "./vite-env.d";

const { appRouter } = TRPCCompose();
export const trpc = createTRPCReact<typeof appRouter>();

export const queryClient = new QueryClient();

export const trpcClient = trpc.createClient({
  links: [httpLink({ url: TRPC_ENDPOINT })],
});

interface Props {
  children: React.ReactNode;
}

const TRPCProvider = ({ children }: Props) => {
  const [trpcClientInstance] = useState(() => trpcClient);

  return (
    <trpc.Provider client={trpcClientInstance} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};

export default TRPCProvider;
