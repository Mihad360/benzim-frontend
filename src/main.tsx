import "./hooks/Polyfills.ts";
import { StrictMode } from "react";
import "@ant-design/v5-patch-for-react-19";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./router/routes.tsx";
import { Provider } from "react-redux";
import { store } from "./services/redux/store.ts";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster />
      <RouterProvider router={routes}></RouterProvider>
    </Provider>
  </StrictMode>
);
