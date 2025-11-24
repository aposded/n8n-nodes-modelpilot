import type { INodeProperties } from 'n8n-workflow';

const showOnlyForAccount = {
	resource: ['account'],
};

export const accountDescription: INodeProperties[] = [
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
	// Get Usage Summary parameters
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
					async function (this, requestOptions) {
						const timeRange = this.getNodeParameter('timeRange', 0) as string;
						requestOptions.body = { time_range: timeRange };
						return requestOptions;
					},
				],
			},
		},
	},
	// Get Balance routing
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
	// Get Usage Summary routing
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
