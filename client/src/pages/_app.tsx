import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

import "semantic-ui-css/semantic.min.css";
import "./app.css";

import { useApollo } from "../lib/apollo";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
	const apolloClient = useApollo(pageProps);

	const getLayout = Component.getLayout || ((page) => page);

	return (
		<ApolloProvider client={apolloClient}>
			{getLayout(<Component {...pageProps} />)}
		</ApolloProvider>
	);
};

export default App;
