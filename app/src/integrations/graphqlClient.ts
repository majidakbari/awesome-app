import {TribeClient} from "@tribeplatform/gql-client"

const graphqlClient = async (): Promise<TribeClient> => {
    const client = new TribeClient({
        graphqlUrl: process.env.GQL_URL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    });
    const accessToken = await client.generateToken({
        networkId: process.env.NETWORK_ID || ""
    });
    client.setToken(accessToken)
    return client;
}

export default graphqlClient;