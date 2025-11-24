"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modelpilot = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const chat_1 = require("./resources/chat");
const router_1 = require("./resources/router");
const account_1 = require("./resources/account");
const models_1 = require("./resources/models");
class Modelpilot {
    constructor() {
        this.description = {
            displayName: 'Modelpilot',
            name: 'modelpilot',
            icon: { light: 'file:modelpilot.svg', dark: 'file:modelpilot.dark.svg' },
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Interact with the Modelpilot API',
            defaults: {
                name: 'Modelpilot',
            },
            usableAsTool: true,
            inputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            credentials: [{ name: 'modelpilotApi', required: true }],
            requestDefaults: {
                baseURL: 'https://modelpilot.co/api',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Chat',
                            value: 'chat',
                            description: 'Send chat completion requests',
                        },
                        {
                            name: 'Router',
                            value: 'router',
                            description: 'Manage AI model routers',
                        },
                        {
                            name: 'Account',
                            value: 'account',
                            description: 'View balance and usage statistics',
                        },
                        {
                            name: 'Models',
                            value: 'models',
                            description: 'Browse available AI models',
                        },
                    ],
                    default: 'chat',
                },
                ...chat_1.chatDescription,
                ...router_1.routerDescription,
                ...account_1.accountDescription,
                ...models_1.modelsDescription,
            ],
        };
    }
}
exports.Modelpilot = Modelpilot;
//# sourceMappingURL=Modelpilot.node.js.map