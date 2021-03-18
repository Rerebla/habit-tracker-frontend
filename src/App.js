import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { QueryFirstQuery } from "./QueryFirstQuery";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo app</h2>
        <QueryFirstQuery></QueryFirstQuery>
      </div>
    </ApolloProvider>
  );
}

export default App;
