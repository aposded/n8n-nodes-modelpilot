"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatDescription = void 0;
const showOnlyForChat = {
    resource: ['chat'],
};
exports.chatDescription = [
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
                    async function (requestOptions) {
                        const messages = this.getNodeParameter('messages', 0, {});
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
                    async function (requestOptions) {
                        const additionalOptions = this.getNodeParameter('additionalOptions', 0, {});
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
                    async function (items, responseData) {
                        var _a;
                        const response = responseData;
                        if ((_a = response === null || response === void 0 ? void 0 : response.choices) === null || _a === void 0 ? void 0 : _a[0]) {
                            const choice = response.choices[0];
                            return items.map(() => {
                                var _a, _b;
                                return {
                                    json: {
                                        message: choice.message,
                                        content: ((_a = choice.message) === null || _a === void 0 ? void 0 : _a.content) || '',
                                        role: ((_b = choice.message) === null || _b === void 0 ? void 0 : _b.role) || 'assistant',
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
//# sourceMappingURL=index.js.map