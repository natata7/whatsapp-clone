"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_scalars_1 = require("graphql-scalars");
const db_1 = require("../db");
const resolvers = {
    Date: graphql_scalars_1.DateTimeResolver,
    URL: graphql_scalars_1.URLResolver,
    Chat: {
        messages(chat) {
            return db_1.messages.filter((m) => chat.messages.includes(m.id));
        },
        lastMessage(chat) {
            const lastMessage = chat.messages[chat.messages.length - 1];
            return db_1.messages.find((m) => m.id === lastMessage);
        },
    },
    Query: {
        chats() {
            return db_1.chats;
        },
        chat(root, { chatId }) {
            return db_1.chats.find((c) => c.id === chatId);
        },
    },
};
exports.default = resolvers;
