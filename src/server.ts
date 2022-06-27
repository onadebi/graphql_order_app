import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { RootResolvers } from "./graphql/root-resolver";
import { schema } from "./graphql/schema";
import db from './firebase'
import { VerifyUser } from "./middleware/auth.middleware";

const server = new ApolloServer({
    typeDefs: schema,
    resolvers: RootResolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({req})=>{
        const headerz = req.headers.host;
        const auth = req.headers.authorization;   
        return {headerz, auth}
    }
});

server.listen({port: 8800}).then(({url})=>console.log(`Listening on url: ${url}`))