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
        <h2 className="bg-black text-red-400">My first Apollo app</h2>
        <QueryFirstQuery />
      </div>
    </ApolloProvider>
  );
}

export default App;
