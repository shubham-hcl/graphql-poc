"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_2 = require("graphql-http/lib/use/express");
const graphql_playground_middleware_express_1 = __importDefault(require("graphql-playground-middleware-express"));
const graphql_schema_1 = __importDefault(require("./graphql-schema"));
const graphql_resolver_1 = __importDefault(require("./graphql-resolver"));
const mongoose_1 = __importDefault(require("mongoose"));
// Create an express server and a GraphQL endpoint
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// Create Graph QL Endpoint
app.use('/graphql', (0, express_2.createHandler)({
    schema: graphql_schema_1.default,
    rootValue: graphql_resolver_1.default
}));
app.use('/playground', (0, graphql_playground_middleware_express_1.default)({ endpoint: '/graphql' }));
const databaseUrl = "mongodb+srv://shubhamkaushik90:x4V6PsSm2BzHbo96@graphqlcluster.yahfjz1.mongodb.net/?retryWrites=true&w=majority";
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(databaseUrl);
        app.listen(4000, () => console.log("Server started on port 4000"));
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
});
start();
