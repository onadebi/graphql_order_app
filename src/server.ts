import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { RootResolvers } from "./graphql/root-resolver";
import { schema } from "./graphql/schema";
import db from './firebase'
import { VerifyUser } from "./middleware/auth.middleware";
import appsettings from "./config/appsettings";

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

server.listen({port: appsettings.appconfig.PORT}).then(({url})=>console.log(`ENV: [${appsettings.appconfig.ENV}] Listening on url: ${url}`))