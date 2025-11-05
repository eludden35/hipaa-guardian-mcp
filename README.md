# HIPAA Compliance Guardian MCP Server

A Model Context Protocol (MCP) server that provides comprehensive HIPAA compliance guidance for developers building healthcare applications. This server offers expert knowledge and tools to help ensure your applications meet HIPAA Security and Privacy Rule requirements.

<a href="https://glama.ai/mcp/servers/@eludden35/hipaa-guardian-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@eludden35/hipaa-guardian-mcp/badge" alt="HIPAA Guardian Server MCP server" />
</a>

## 🏥 What is HIPAA?

The Health Insurance Portability and Accountability Act (HIPAA) establishes national standards for protecting sensitive patient health information. This MCP server provides developers with:

- **PHI Identification**: Determine if your data constitutes Protected Health Information
- **Security Requirements**: Understand encryption and technical safeguard requirements
- **Business Associate Rules**: Navigate third-party vendor compliance
- **Communication Guidelines**: Learn compliant notification and messaging practices
- **Safeguards Checklist**: Comprehensive technical and physical safeguard requirements

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd ultimate-hipaa-guide
   npm install
   ```

2. **Run the server:**
   ```bash
   npx tsx server.ts
   ```

3. **Connect to your MCP client:**
   Add this server to your MCP client configuration (e.g., Claude Desktop, Ollama, etc.)

## 🛠️ Available Tools

### 1. `confirmIfDataIsPHI`
**Purpose**: Determine if specific data types constitute Protected Health Information (PHI)

**Input**: 
- `dataType` (string): Description of the data (e.g., "patient name and diagnosis", "step count")

**Use Case**: When you need to determine if your app's data collection requires HIPAA compliance

### 2. `checkDataEncryptionRequirements`
**Purpose**: Get specific encryption requirements from the HIPAA Security Rule

**Input**: None required

**Use Case**: Understanding technical safeguards for data protection

### 3. `getBusinessAssociateRules`
**Purpose**: Learn about Business Associate compliance requirements

**Input**: None required

**Use Case**: When working with third-party vendors or cloud services

### 4. `getNotificationAndCommunicationRules`
**Purpose**: Understand compliant communication methods

**Input**: None required

**Use Case**: Implementing user notifications, emails, or push notifications

### 5. `getSafeguardsChecklist`
**Purpose**: Get comprehensive technical and physical safeguard requirements

**Input**: None required

**Use Case**: Building a compliance checklist for your application

## 📋 Example Usage

### Scenario: Building a Fitness App with Health Data

```typescript
// Check if step count data requires HIPAA compliance
const phiCheck = await confirmIfDataIsPHI({
  dataType: "user step count and heart rate data"
});

// Get encryption requirements
const encryptionRules = await checkDataEncryptionRequirements();

// Check notification compliance
const notificationRules = await getNotificationAndCommunicationRules();
```

### Scenario: Healthcare Provider Integration

```typescript
// Understand Business Associate requirements
const baRules = await getBusinessAssociateRules();

// Get comprehensive safeguards
const safeguards = await getSafeguardsChecklist();
```

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   MCP Client    │◄──►│  HIPAA Guardian  │◄──►│ hipaa-content   │
│   (Claude,      │    │   MCP Server     │    │ .json           │
│    Ollama, etc) │    │                  │    │ (Knowledge      │
└─────────────────┘    └──────────────────┘    │  Base)          │
                                               └─────────────────┘
```

## 📚 Knowledge Base

The server uses a comprehensive HIPAA knowledge base (`hipaa-content.json`) containing:

- **HIPAA Basics**: What is HIPAA and who it applies to
- **Security Rule**: Technical, physical, and administrative safeguards
- **Mobile Applications**: Specific guidance for mobile health apps
- **Developer Considerations**: Practical implementation advice
- **Business Associates**: Third-party vendor requirements

## 🔧 Development

### Project Structure
```
ultimate-hipaa-guide/
├── server.ts              # Main MCP server implementation
├── hipaa-content.json     # HIPAA knowledge base
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

### Adding New Tools

1. **Define the tool schema:**
   ```typescript
   server.tool(
     'yourToolName',
     {
       description: 'What your tool does',
       schema: z.object({
         // Define your input parameters
       }),
     },
     async (args) => {
       return {
         content: [{
           type: 'text',
           text: 'Your response here'
         }]
       };
     }
   );
   ```

2. **Update the knowledge base** in `hipaa-content.json` if needed

### Running in Development

```bash
# Install dependencies
npm install

# Run with TypeScript
npx tsx server.ts

# Or build and run
npm run build
node dist/server.js
```

## 🛡️ Security Considerations

- This server provides **guidance only** and should not be considered legal advice
- Always consult with qualified legal professionals for compliance matters
- The knowledge base is based on current HIPAA regulations but may not reflect recent changes
- Implement security measures appropriate for your specific use case

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your improvements
4. Update the knowledge base if needed
5. Submit a pull request

## 📄 License

[Add your license here]

## ⚖️ Disclaimer

This MCP server provides educational information about HIPAA compliance for developers. It is not intended as legal advice. Always consult with qualified legal professionals for specific compliance requirements and legal matters related to your application.

## 🔗 Resources

- [HHS HIPAA Information](https://www.hhs.gov/hipaa/index.html)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/sdk)

---

**Built with ❤️ for the healthcare developer community**
# hipaa-guardian-mcp