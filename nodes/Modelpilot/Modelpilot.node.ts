import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { chatDescription } from './resources/chat';
import { routerDescription } from './resources/router';
import { accountDescription } from './resources/account';
import { modelsDescription } from './resources/models';

export class Modelpilot implements INodeType {
	description: INodeTypeDescription = {
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
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
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
						name: 'Model',
						value: 'models',
						description: 'Browse available AI models',
					},
				],
				default: 'chat',
			},
			...chatDescription,
			...routerDescription,
			...accountDescription,
			...modelsDescription,
		],
	};
}
