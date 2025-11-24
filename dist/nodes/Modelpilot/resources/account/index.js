"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountDescription = void 0;
const showOnlyForAccount = {
    resource: ['account'],
};
exports.accountDescription = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showOnlyForAccount,
        },
        options: [
            {
                name: 'Get Balance',
                value: 'getBalance',
                action: 'Get account balance',
                description: 'Check credit balance, subscription status, and monthly usage',
            },
            {
                name: 'Get Usage Summary',
                value: 'getUsageSummary',
                action: 'Get usage statistics',
                description: 'Get usage statistics and costs for a time range',
            },
        ],
        default: 'getBalance',
    },
    {
        displayName: 'Time Range',
        name: 'timeRange',
        type: 'options',
        displayOptions: {
            show: {
                ...showOnlyForAccount,
                operation: ['getUsageSummary'],
            },
        },
        options: [
            {
                name: 'Last 24 Hours',
                value: '24h',
            },
            {
                name: 'Last 7 Days',
                value: '7d',
            },
            {
                name: 'Last 30 Days',
                value: '30d',
            },
        ],
        default: '7d',
        description: 'Time range for usage summary',
        routing: {
            send: {
                preSend: [
                    async function (requestOptions) {
                        const timeRange = this.getNodeParameter('timeRange', 0);
                        requestOptions.body = { time_range: timeRange };
                        return requestOptions;
                    },
                ],
            },
        },
    },
    {
        displayName: '',
        name: 'getBalanceRouting',
        type: 'notice',
        default: '',
        displayOptions: {
            show: {
                ...showOnlyForAccount,
                operation: ['getBalance'],
            },
        },
        routing: {
            request: {
                method: 'POST',
                url: '/mcp/get-balance',
            },
        },
    },
    {
        displayName: '',
        name: 'getUsageSummaryRouting',
        type: 'notice',
        default: '',
        displayOptions: {
            show: {
                ...showOnlyForAccount,
                operation: ['getUsageSummary'],
            },
        },
        routing: {
            request: {
                method: 'POST',
                url: '/mcp/get-usage-summary',
            },
        },
    },
];
//# sourceMappingURL=index.js.map