import type { INodeProperties } from 'n8n-workflow';

const showOnlyForModels = {
	resource: ['models'],
};

export const modelsDescription: INodeProperties[] = [
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
	// List Models routing
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
