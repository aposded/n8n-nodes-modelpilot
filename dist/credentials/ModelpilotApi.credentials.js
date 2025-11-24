"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelpilotApi = void 0;
class ModelpilotApi {
    constructor() {
        this.name = 'modelpilotApi';
        this.displayName = 'Modelpilot API';
        this.icon = { light: 'file:modelpilot.svg', dark: 'file:modelpilot.dark.svg' };
        this.documentationUrl = 'https://modelpilot.co/docs/api';
        this.properties = [
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
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '=Bearer {{$credentials.apiKey}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: 'https://modelpilot.co/api',
                url: '/health',
            },
        };
    }
}
exports.ModelpilotApi = ModelpilotApi;
//# sourceMappingURL=ModelpilotApi.credentials.js.map