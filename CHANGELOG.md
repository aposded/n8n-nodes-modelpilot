# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-11-22 (Initial Release)

### Added

- ✅ **Router Resource** with six MCP-compatible operations:
  - Chat Completion: Create AI completions through ModelPilot router
  - Create Router: Create new routers with custom configuration
  - Get Balance: Check credit balance and subscription status
  - Get Usage Summary: View usage statistics for different time ranges
  - List Models: List all available AI models with pricing
  - List Routers: List all user's routers with configuration
- ✅ **Complete OpenAI-compatible message format**
  - Support for system, user, and assistant roles
  - Multi-turn conversation support
- ✅ **Full parameter support:**
  - Temperature (0-2)
  - Max Tokens
  - Top P (0-1)
  - Frequency Penalty (-2 to 2)
  - Presence Penalty (-2 to 2)
  - Stream (boolean)
- ✅ **Rich response metadata:**
  - Selected model information
  - Token usage statistics
  - Cost and latency data
  - Finish reason
- ✅ **API Key Authentication**
  - Secure API key storage
  - Bearer token authentication
  - Automatic header injection
  - Credential testing endpoint
  - MCP-compatible authentication
- ✅ **Comprehensive Documentation:**
  - README with examples
  - Deployment guide
  - TypeScript support
  - Light and dark mode icons

### Features

- Intelligent model routing across multiple AI providers
- Automatic fallback handling
- Cost optimization
- Latency optimization
- Quality optimization
- Environmental impact tracking
- Detailed analytics and metadata

### Technical Details

- Built with n8n declarative-style routing
- TypeScript-first development
- ESLint configured with strict rules
- Prettier code formatting
- Full n8n workflow compatibility

## [Unreleased]

### Planned Features

- Streaming response support in n8n
- Batch request handling
- Function calling support
- Additional router operations (list, create, update)
- Usage analytics within n8n
- Cost tracking dashboard integration
- Webhook support for async operations
- Response caching configuration

---

For more information, see the [README](README.md) and [DEPLOYMENT](DEPLOYMENT.md) guides.
