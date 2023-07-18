import { ApolloClient, ApolloProvider, from, InMemoryCache } from "@apollo/client";
import { useMemo } from "react"
import { errorLink, splitLink } from "./apollo-client.config";

const ApolloProviderCustom = ({ children, showError, token }: any) => {
    const apolloClient = useMemo(
        () => new ApolloClient({
            link: from([errorLink(showError), splitLink(token)]),
            cache: new InMemoryCache(),
        }),
        [showError]
    )

    return (
        <ApolloProvider client={apolloClient}>
            {children}
        </ApolloProvider>
    );
}
export default ApolloProviderCustom