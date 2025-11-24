# n8n-nodes-modelpilot

This is an n8n community node that lets you use [ModelPilot](https://modelpilot.co) AI model routing in your n8n workflows.

ModelPilot is an intelligent AI model router that optimizes API calls across multiple AI providers (OpenAI, Anthropic, Google, etc.) based on cost, latency, quality, and environmental impact. It provides automatic fallbacks, intelligent model selection, and comprehensive analytics.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

**Table of Contents**

- [Installation](#installation)
- [Operations](#operations)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [Usage](#usage)
- [Examples](#examples)
- [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### npm Installation

```bash
npm install n8n-nodes-modelpilot
```

### Manual Installation (n8n self-hosted)

1. Navigate to your n8n installation directory
2. Install the package: `npm install n8n-nodes-modelpilot`
3. Restart n8n

## Operations

The ModelPilot node supports the following resources and operations:

### Router Resource

#### Chat Completion

Create AI chat completions through your ModelPilot router with intelligent model selection and routing.

**Parameters:**

- **Router ID** (required): Your ModelPilot router identifier
- **Messages** (required): Array of chat messages with roles (system, user, assistant)
- **Additional Options** (optional):
  - **Frequency Penalty**: -2 to 2 (default: 0)
  - **Max Tokens**: Maximum tokens to generate (default: 1000)
  - **Presence Penalty**: -2 to 2 (default: 0)
  - **Stream**: Enable streaming responses (default: false)
  - **Temperature**: 0 to 2 (default: 1)
  - **Top P**: 0 to 1 (default: 1)

**Output:**

- `content`: The generated response text
- `role`: The role of the response (typically "assistant")
- `message`: Full message object
- `finishReason`: Why the generation stopped
- `model`: Which model was selected
- `usage`: Token usage statistics
- `metadata`: Additional routing metadata (cost, latency, etc.)

#### Create Router

Create a new AI model router with custom configuration.

**Parameters:**

- **Router Name** (required): Name for the new router (e.g., "my-chatbot")
- **Router Configuration** (optional):
  - **Cost Weight**: 0-1 (default: 0.4) - Prioritize cost savings
  - **Latency Weight**: 0-1 (default: 0.3) - Prioritize speed
  - **Quality Weight**: 0-1 (default: 0.2) - Prioritize output quality
  - **Carbon Weight**: 0-1 (default: 0.1) - Prioritize low carbon footprint
  - **Fallback Enabled**: true/false (default: true) - Enable automatic fallbacks
  - **Enable Caching**: true/false (default: false) - Enable response caching
  - **Enable Rate Limit**: true/false (default: false) - Enable rate limiting
  - **Timeout**: 5-300 seconds (default: 30) - Request timeout

**Output:**

- Router ID and configuration
- Sample integration code

#### Get Balance

Check your current credit balance, subscription status, and monthly usage.

**Parameters:** None required

**Output:**

- Current balance
- Subscription plan
- Monthly spending
- Usage statistics

#### Get Usage Summary

Get detailed usage statistics and costs for a specific time range.

**Parameters:**

- **Time Range**: Select from Last 24 Hours, Last 7 Days, or Last 30 Days (default: 7d)

**Output:**

- Total cost
- Total requests
- Top models used
- Daily breakdown
- Cost trends

#### List Models

List all available AI models with their pricing, capabilities, and providers.

**Parameters:** None required

**Output:**

- Model IDs and names
- Provider information
- Input/output pricing
- Capabilities (function calling, vision, etc.)
- Context window sizes

#### List Routers

List all routers created by your account with their configuration and status.

**Parameters:** None required

**Output:**

- Router IDs and names
- Configuration details
- Active/inactive status
- Creation dates
- Usage statistics

### User Resource (Legacy)

- **Get Many**: Retrieve multiple users
- **Get**: Get a single user by ID
- **Create**: Create a new user

### Company Resource (Legacy)

- Basic company operations

## Credentials

To use the ModelPilot node, you need a ModelPilot API key.

### Prerequisites

1. Sign up for a ModelPilot account at [modelpilot.co](https://modelpilot.co)
2. Create a router in your ModelPilot dashboard
3. Generate an API key from the dashboard

### Setting up Credentials in n8n

1. In n8n, go to **Credentials** → **New**
2. Search for "ModelPilot API"
3. Enter your API key from the ModelPilot dashboard
4. Click **Save**

The node will automatically add your API key to requests via the `x-api-key` header.

## Compatibility

- **Minimum n8n version**: 1.0.0
- **Tested with**: n8n v1.x
- **Node version**: Requires Node.js 18+

## Usage

### Basic Chat Completion Example

1. Add the **ModelPilot** node to your workflow
2. Select **Router** as the resource
3. Choose **Chat Completion** as the operation
4. Enter your router ID (e.g., `my-production-router`)
5. Add messages:
   - Role: `user`
   - Content: `What is the capital of France?`
6. Execute the workflow

The node will route your request through ModelPilot, which will select the optimal AI model based on your router's configuration.

### Advanced: Multi-turn Conversation

Configure the Messages parameter with multiple entries:

1. **Message 1**:
   - Role: `system`
   - Content: `You are a helpful assistant specialized in geography.`

2. **Message 2**:
   - Role: `user`
   - Content: `What is the capital of France?`

3. **Message 3** (if continuing conversation):
   - Role: `assistant`
   - Content: `The capital of France is Paris.`

4. **Message 4**:
   - Role: `user`
   - Content: `What is its population?`

### Using with Other Nodes

**Example: Slack → ModelPilot → Slack**

1. **Slack Trigger**: Listen for messages
2. **ModelPilot**: Generate AI response using the Slack message content
3. **Slack Send**: Post the AI response back to Slack

**Example: HTTP Request → ModelPilot → Database**

1. **HTTP Request**: Get data from API
2. **ModelPilot**: Analyze or summarize the data
3. **Database**: Store the analysis results

## Examples

### Example 1: Simple Q&A Bot

```json
{
	"nodes": [
		{
			"parameters": {
				"resource": "router",
				"operation": "chatCompletion",
				"routerId": "my-router-id",
				"messages": {
					"messageValues": [
						{
							"role": "user",
							"content": "={{ $json.question }}"
						}
					]
				}
			},
			"name": "ModelPilot",
			"type": "n8n-nodes-modelpilot.modelpilot"
		}
	]
}
```

### Example 2: Content Generation with Temperature Control

```json
{
	"parameters": {
		"resource": "router",
		"operation": "chatCompletion",
		"routerId": "creative-router",
		"messages": {
			"messageValues": [
				{
					"role": "system",
					"content": "You are a creative content writer."
				},
				{
					"role": "user",
					"content": "Write a product description for a smart watch."
				}
			]
		},
		"additionalOptions": {
			"temperature": 1.5,
			"max_tokens": 500
		}
	}
}
```

## Resources

- [ModelPilot Website](https://modelpilot.co)
- [ModelPilot Documentation](https://modelpilot.co/docs)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/#community-nodes)
- [ModelPilot Dashboard](https://modelpilot.co/dashboard)
- [Support](https://modelpilot.co/support)

## License

[MIT](LICENSE)

## Version History

### 0.1.0 (Initial Release)

- ✅ **Router Resource** with 6 operations:
  - Chat Completion - AI chat completions through router
  - Create Router - Create new routers with custom config
  - Get Balance - Check credits and subscription
  - Get Usage Summary - Usage statistics and costs
  - List Models - All available models with pricing
  - List Routers - All user's routers
- ✅ Full OpenAI-compatible message format
- ✅ Support for all chat completion parameters (temperature, max_tokens, etc.)
- ✅ Detailed response metadata (model, usage, cost, latency)
- ✅ Bearer token authentication
- ✅ MCP (Model Context Protocol) compatible endpoints
- ✅ User and Company resources (legacy)
