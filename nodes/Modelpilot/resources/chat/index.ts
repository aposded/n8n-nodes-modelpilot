import type { INodeProperties } from 'n8n-workflow';

const showOnlyForChat = {
	resource: ['chat'],
};

export const chatDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForChat,
		},
		options: [
			{
				name: 'Chat Completion',
				value: 'chatCompletion',
				action: 'Create a chat completion',
				description: 'Send a chat completion request through ModelPilot router',
			},
		],
		default: 'chatCompletion',
	},
	// Router ID field
	{
		displayName: 'Router ID',
		name: 'routerId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForChat,
				operation: ['chatCompletion'],
			},
		},
		default: '',
		description: 'The router identifier for your ModelPilot router',
		placeholder: 'your-router-identifier',
	},
	// Messages
	{
		displayName: 'Messages',
		name: 'messages',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				...showOnlyForChat,
				operation: ['chatCompletion'],
			},
		},
		default: {},
		description: 'The messages to send to the model',
		placeholder: 'Add Message',
		options: [
			{
				name: 'messageValues',
				displayName: 'Message',
				values: [
					{
						displayName: 'Role',
						name: 'role',
						type: 'options',
						options: [
							{
								name: 'System',
								value: 'system',
							},
							{
								name: 'User',
								value: 'user',
							},
							{
								name: 'Assistant',
								value: 'assistant',
							},
						],
						default: 'user',
						description: 'The role of the message author',
					},
					{
						displayName: 'Content',
						name: 'content',
						type: 'string',
						typeOptions: {
							rows: 4,
						},
						default: '',
						description: 'The content of the message',
					},
				],
			},
		],
		routing: {
			send: {
				preSend: [
					async function (this, requestOptions) {
						const messages = this.getNodeParameter('messages', 0, {}) as {
							messageValues?: Array<{ role: string; content: string }>;
						};

						if (messages.messageValues) {
							requestOptions.body = {
								...requestOptions.body,
								messages: messages.messageValues,
							};
						}

						return requestOptions;
					},
				],
			},
		},
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		displayOptions: {
			show: {
				...showOnlyForChat,
				operation: ['chatCompletion'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Frequency Penalty',
				name: 'frequency_penalty',
				type: 'number',
				typeOptions: {
					minValue: -2,
					maxValue: 2,
					numberPrecision: 2,
				},
				default: 0,
				description: 'Penalize new tokens based on their frequency in the text so far',
			},
			{
				displayName: 'Max Tokens',
				name: 'max_tokens',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 1000,
				description: 'The maximum number of tokens to generate',
			},
			{
				displayName: 'Presence Penalty',
				name: 'presence_penalty',
				type: 'number',
				typeOptions: {
					minValue: -2,
					maxValue: 2,
					numberPrecision: 2,
				},
				default: 0,
				description: 'Penalize new tokens based on whether they appear in the text so far',
			},
			{
				displayName: 'Stream',
				name: 'stream',
				type: 'boolean',
				default: false,
				description: 'Whether to stream back partial progress',
			},
			{
				displayName: 'Temperature',
				name: 'temperature',
				type: 'number',
				typeOptions: {
					minValue: 0,
					maxValue: 2,
					numberPrecision: 2,
				},
				default: 1,
				description: 'Sampling temperature between 0 and 2. Higher values make output more random.',
			},
			{
				displayName: 'Top P',
				name: 'top_p',
				type: 'number',
				typeOptions: {
					minValue: 0,
					maxValue: 1,
					numberPrecision: 2,
				},
				default: 1,
				description: 'Nucleus sampling parameter. Alternative to temperature.',
			},
		],
		routing: {
			send: {
				preSend: [
					async function (this, requestOptions) {
						const additionalOptions = this.getNodeParameter('additionalOptions', 0, {}) as {
							temperature?: number;
							max_tokens?: number;
							top_p?: number;
							frequency_penalty?: number;
							presence_penalty?: number;
							stream?: boolean;
						};

						requestOptions.body = {
							...requestOptions.body,
							...additionalOptions,
						};

						return requestOptions;
					},
				],
			},
		},
	},
	// Chat Completion routing
	{
		displayName: '',
		name: 'chatCompletionRouting',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForChat,
				operation: ['chatCompletion'],
			},
		},
		routing: {
			request: {
				method: 'POST',
				url: '=/router/{{$parameter.routerId}}',
			},
			output: {
				postReceive: [
					async function (this, items, responseData) {
						const response = responseData as unknown as {
							choices?: Array<{
								message?: { content?: string; role?: string };
								finish_reason?: string;
							}>;
							model?: string;
							usage?: Record<string, unknown>;
							metadata?: Record<string, unknown>;
						};

						if (response?.choices?.[0]) {
							const choice = response.choices[0];
							return items.map(() => {
								return {
									json: {
										message: choice.message,
										content: choice.message?.content || '',
										role: choice.message?.role || 'assistant',
										finishReason: choice.finish_reason,
										model: response.model,
										usage: response.usage,
										metadata: response.metadata || {},
									},
								};
							});
						}
						return items;
					},
				],
			},
		},
	},
];
