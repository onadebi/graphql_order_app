import { ApolloServer, gql } from "apollo-server";
import { schema } from '../../src/graphql/schema'
import { RootResolvers } from '../../src/graphql/root-resolver'
import {v4 as uuid} from 'uuid';

describe("Resolvers Tests", ()=>{

    let token: string = '';
    let testServer: ApolloServer;
    const testLoginData =  {"login":{"email": "onaefee@gmail.com", "password": "jdoeP@55word"}};       

    beforeAll(async ()=>{
            testServer = new ApolloServer({
            typeDefs: schema,
            resolvers: RootResolvers
        });
        const result = await testServer.executeOperation(UserLoginPayload(testLoginData));

        expect(result.errors).toBeUndefined();
        
        token = result.data?.userLogin.message;
        expect(typeof result.data?.userLogin).toBe("object");
        expect(result.data?.userLogin.success).toBe(true);
    });

    it('Checks that user is able to successfully login', ()=>{
        console.log(JSON.stringify(token,null,2));
        expect(token.length).toBeGreaterThan(20);
    });

    it('Checks that Invalid credentials return false and no token', async()=>{
        const testDataFailtest = {"login":{"email": `${uuid()}@gmail.com`, "password": "jdoeP@55word"}}
        const result = await testServer.executeOperation(UserLoginPayload(testDataFailtest));
        expect(result.data?.userLogin.success).toBe(false);
    });
    
    //#region Helpers
    const UserLoginPayload =(testData: {}): {}=>{
        return {
            query: gql`mutation ($login: UserLoginInput){
                userLogin(login: $login){
                    success, message}
                }`,
            variables: testData,
        }
    }
    //#endregion

})