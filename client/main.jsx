import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import App from "./src/App";

function Wrapper({ children }) {
    const {
      isLoading,
      error,
    } = useAuth0();
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Oops... {error.message}</div>;
    }
    return <>{children}</>;
  }
  export default Wrapper;

console.log(import.meta.env)
const root = createRoot(document.getElementById("app"));
root.render(
  <Auth0Provider
    domain={import.meta.env.VITE_OAUTH_DOMAIN}
    clientId={import.meta.env.VITE_OAUTH_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Wrapper>
    <App />
    </Wrapper>
  </Auth0Provider>
);
