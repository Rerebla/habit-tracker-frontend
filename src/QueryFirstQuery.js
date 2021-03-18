import { useQuery, gql } from "@apollo/client";
const FIRST_QUERY = gql`
  query GetHelloWorld {
    suppe
  }
`;
export function QueryFirstQuery() {
  const { loading, error, data } = useQuery(FIRST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error:{error}</p>;
  return data.suppe;
}
