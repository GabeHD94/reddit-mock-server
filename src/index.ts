import { MikroORM } from "@mikro-orm/core"
import { __prod__ } from "./constants";
// import { Post } from "./entities/Post";
import microConfig from './mikro-orm.config'
import express from 'express'
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

const main = async () => {

    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    const app = express();
    const apolloServer = new ApolloServer({
        schema: await buildSchema()
    })
    app.listen(4000, () => {
        console.log('server started on localhost:4000')
    })
}
main()