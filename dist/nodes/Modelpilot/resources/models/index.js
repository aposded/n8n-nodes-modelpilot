"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelsDescription = void 0;
const showOnlyForModels = {
    resource: ['models'],
};
exports.modelsDescription = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showOnlyForModels,
        },
        options: [
            {
                name: 'List Models',
                value: 'listModels',
                action: 'List available models',
                description: 'List all available models with pricing and capabilities',
            },
        ],
        default: 'listModels',
    },
    {
        displayName: '',
        name: 'listModelsRouting',
        type: 'notice',
        default: '',
        displayOptions: {
            show: {
                ...showOnlyForModels,
                operation: ['listModels'],
            },
        },
        routing: {
            request: {
                method: 'POST',
                url: '/mcp/list-models',
            },
        },
    },
];
//# sourceMappingURL=index.js.map