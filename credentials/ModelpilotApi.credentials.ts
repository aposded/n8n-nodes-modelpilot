import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ModelpilotApi implements ICredentialType {
	name = 'modelpilotApi';

	displayName = 'Modelpilot API';

	icon = { light: 'file:modelpilot.svg', dark: 'file:modelpilot.dark.svg' } as const;

	// Link to ModelPilot documentation
	documentationUrl = 'https://modelpilot.co/docs/api';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description: 'Your ModelPilot API key from the dashboard',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	// Test credential by checking if a router exists
	// Users should replace 'test-router' with their actual router ID
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://modelpilot.co/api',
			url: '/health',
		},
	};
}
