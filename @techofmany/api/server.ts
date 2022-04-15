import { ApolloServer } from "apollo-server";
import { connect } from '@techofmany/storage';

// 1
import { schema } from "./schema";
export const server = new ApolloServer({
    schema,
});

const port = 4002;
// 2
server.listen({port}).then(({ url }) => {
    connect();
    console.log(`🚀  Server ready at ${url}`);
});
