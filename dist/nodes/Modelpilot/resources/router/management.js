"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerManagementDescription = void 0;
const showOnlyForRouter = {
    resource: ['router'],
};
exports.routerManagementDescription = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showOnlyForRouter,
        },
        options: [
            {
                name: 'Create Router',
                value: 'createRouter',
                action: 'Create a new router',
                description: 'Create a new AI model router with custom configuration',
            },
            {
                name: 'List Routers',
                value: 'listRouters',
                action: 'List all routers',
                description: 'List all routers created by the user',
            },
        ],
        default: 'createRouter',
    },
    {
        displayName: 'Router Name',
        name: 'routerName',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                ...showOnlyForRouter,
                operation: ['createRouter'],
            },
        },
        default: '',
        description: 'Name for the new router',
        placeholder: 'my-chatbot',
    },
    {
        displayName: 'Router Configuration',
        name: 'routerConfig',
        type: 'collection',
        placeholder: 'Add Configuration',
        displayOptions: {
            show: {
                ...showOnlyForRouter,
                operation: ['createRouter'],
            },
        },
        default: {},
        options: [
            {
                displayName: 'Carbon Weight',
                name: 'carbon_weight',
                type: 'number',
                typeOptions: {
                    minValue: 0,
                    maxValue: 1,
                    numberPrecision: 2,
                },
                default: 0.1,
                description: 'Weight for carbon footprint optimization (0-1)',
            },
            {
                displayName: 'Cost Weight',
                name: 'cost_weight',
                type: 'number',
                typeOptions: {
                    minValue: 0,
                    maxValue: 1,
                    numberPrecision: 2,
                },
                default: 0.4,
                description: 'Weight for cost optimization (0-1)',
            },
            {
                displayName: 'Enable Caching',
                name: 'enable_caching',
                type: 'boolean',
                default: false,
                description: 'Whether to enable response caching',
            },
            {
                displayName: 'Enable Rate Limit',
                name: 'enable_rate_limit',
                type: 'boolean',
                default: false,
                description: 'Whether to enable rate limiting',
            },
            {
                displayName: 'Fallback Enabled',
                name: 'fallback_enabled',
                type: 'boolean',
                default: true,
                description: 'Whether to enable automatic fallbacks',
            },
            {
                displayName: 'Latency Weight',
                name: 'latency_weight',
                type: 'number',
                typeOptions: {
                    minValue: 0,
                    maxValue: 1,
                    numberPrecision: 2,
                },
                default: 0.3,
                description: 'Weight for speed optimization (0-1)',
            },
            {
                displayName: 'Quality Weight',
                name: 'quality_weight',
                type: 'number',
                typeOptions: {
                    minValue: 0,
                    maxValue: 1,
                    numberPrecision: 2,
                },
                default: 0.2,
                description: 'Weight for quality optimization (0-1)',
            },
            {
                displayName: 'Timeout',
                name: 'timeout',
                type: 'number',
                typeOptions: {
                    minValue: 5,
                    maxValue: 300,
                },
                default: 30,
                description: 'Request timeout in seconds (5-300)',
            },
        ],
        routing: {
            send: {
                preSend: [
                    async function (requestOptions) {
                        const name = this.getNodeParameter('routerName', 0);
                        const config = this.getNodeParameter('routerConfig', 0, {});
                        requestOptions.body = {
                            name,
                            ...config,
                        };
                        return requestOptions;
                    },
                ],
            },
        },
    },
    {
        displayName: '',
        name: 'createRouterRouting',
        type: 'notice',
        default: '',
        displayOptions: {
            show: {
                ...showOnlyForRouter,
                operation: ['createRouter'],
            },
        },
        routing: {
            request: {
                method: 'POST',
                url: '/mcp/create-router',
            },
        },
    },
    {
        displayName: '',
        name: 'listRoutersRouting',
        type: 'notice',
        default: '',
        displayOptions: {
            show: {
                ...showOnlyForRouter,
                operation: ['listRouters'],
            },
        },
        routing: {
            request: {
                method: 'POST',
                url: '/mcp/list-routers',
            },
        },
    },
];
//# sourceMappingURL=management.js.map