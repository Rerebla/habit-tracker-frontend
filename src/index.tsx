import React from "react";
import ReactDOM from "react-dom";
import { getAccessToken, setAccessToken } from "./accessToken";
import { App } from "./App";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  Observable,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { onError } from "apollo-link-error";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import "./index.css"

const cache = new InMemoryCache({});

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((operation) => {
          const accessToken = getAccessToken();
          if (accessToken) {
            operation.setContext({
              headers: {
                authorization: `bearer ${accessToken}`,
              },
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: "accessToken",
      isTokenValidOrUndefined: () => {
        const token = getAccessToken();
        console.log("Token: ", token);
        console.log(typeof(token))
        if (!token) {
          console.log("no accesss token")
          return true;
        }

        try {
          const { exp } = jwtDecode(token) as any;
          if (Date.now() >= Number.parseInt(exp) * 1000) {
            return false;
          } else {
            return true;
          }
        } catch {
          return false;
        }
      },
      fetchAccessToken: async () => {
        console.log("Trying to Fetch Access Token...")
        const response = await fetch("http://localhost:8000/refresh_token", {
          method: "POST",
          credentials: "include",
        });
        const { accessToken } = await response.json()
        setAccessToken(accessToken);
        return response;
      },
      handleFetch: (accessToken) => {
        console.log("Handling Fetch of access token: ", accessToken)
        setAccessToken(accessToken);
      },
      handleError: (err) => {
        // console.warn("Err: ", err);
        // console.log("");
        
      },
      handleResponse: (res) => {
        console.log("Res: ",res.query);
      }
    }),
    onError(({ graphQLErrors, networkError }) => {
      console.log("GraphQlError: ",graphQLErrors);
      console.log("NetworkError: ",networkError);
    }) as unknown as any,
    requestLink,
    new HttpLink({
      uri: "http://localhost:8000/graphql",
      credentials: "include",
    }),
  ].concat()),
  cache,
});
ReactDOM.render(
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>,
  document.getElementById("root")
);
