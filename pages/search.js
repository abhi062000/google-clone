import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../components/Header";
import SearchResults from "../components/SearchResults";
import { API_KEY, CONTEXT_KEY } from "../key";
import { Response } from "../Response";

function Search({ results }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{router.query.term} - Google Search</title>
      </Head>
      <Header></Header>

      <SearchResults results={results}></SearchResults>
    </div>
  );
}

export default Search;

export async function getServerSideProps(context) {
  const useDummyData = false; // using dummy data because google quota provides 100 free searches
  const startIndex = context.query.start || "0";

  const data = useDummyData
    ? Response
    : await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`
      ).then((response) => response.json());

  // after server has rendered pass it to client
  return {
    props: {
      results: data,
    },
  };
}
