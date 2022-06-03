"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_testing_1 = require("apollo-server-testing");
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = __importDefault(require("../../schema"));
describe('Query.chat', () => {
    it('should fetch specified chat', async () => {
        const server = new apollo_server_express_1.ApolloServer({ schema: schema_1.default });
        const { query } = (0, apollo_server_testing_1.createTestClient)(server);
        const res = await query({
            variables: { chatId: '1' },
            query: (0, apollo_server_express_1.gql) `
        query GetChat($chatId: ID!) {
          chat(chatId: $chatId) {
            id
            name
            picture
            lastMessage {
              id
              content
              createdAt
            }
          }
        }
      `,
        });
        expect(res.data).toBeDefined();
        expect(res.errors).toBeUndefined();
        expect(res.data).toMatchSnapshot();
    });
});
