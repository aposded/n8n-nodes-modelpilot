import type { IAuthenticateGeneric, ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';
export declare class ModelpilotApi implements ICredentialType {
    name: string;
    displayName: string;
    icon: {
        readonly light: "file:modelpilot.svg";
        readonly dark: "file:modelpilot.dark.svg";
    };
    documentationUrl: string;
    properties: INodeProperties[];
    authenticate: IAuthenticateGeneric;
    test: ICredentialTestRequest;
}
