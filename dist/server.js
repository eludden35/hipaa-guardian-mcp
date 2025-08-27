"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const zod_1 = require("zod");
const fs = require("fs");
// --- 1. Load the Final HIPAA Knowledge Base ---
const knowledgeBasePath = './hipaa-content.json';
let hipaaData;
try {
    hipaaData = JSON.parse(fs.readFileSync(knowledgeBasePath, 'utf-8'));
}
catch (error) {
    console.error(`FATAL ERROR: Could not load knowledge base from ${knowledgeBasePath}.`);
    console.error('Please ensure the hipaa-content.json file exists in the same directory.');
    process.exit(1); // Exit if the core data is missing
}
// --- 2. Create the MCP Server Instance ---
const server = new mcp_js_1.McpServer({
    name: 'HIPAA Compliance Guardian',
    version: '2.3.0', // Version updated for new compliance confirmation tool
});
console.log('✅ Server created. Defining comprehensive compliance tools...');
// --- 3. Define a Suite of Granular, Task-Oriented MCP Tools ---
/**
 * Tool to determine if an application is subject to HIPAA.
 * This should be the first tool used when starting a new project.
 */
server.tool('evaluateComplianceNeed', {
    description: 'Provides a decision flowchart and examples to determine if an application needs to be HIPAA compliant. Use this before starting any development.',
    schema: zod_1.z.object({}),
}, async () => {
    return {
        content: [{
                type: 'text',
                text: hipaaData['do_i_need_to_be_hipaa_compliant?']
            }]
    };
});
/**
 * Tool to provide the step-by-step process for achieving compliance.
 */
server.tool('getComplianceRoadmap', {
    description: 'Returns a step-by-step roadmap for an organization to become HIPAA compliant, including administrative and policy requirements.',
    schema: zod_1.z.object({}),
}, async () => {
    return {
        content: [{
                type: 'text',
                text: hipaaData['becoming_hipaa_compliant']
            }]
    };
});
/**
 * Tool to get the core definitions of key HIPAA terms.
 */
server.tool('getCoreDefinitions', {
    description: 'Provides foundational definitions for terms like PHI (Protected Health Information), Business Associate, and De-Identification.',
    schema: zod_1.z.object({
        term: zod_1.z.enum(['PHI', 'Business Associate', 'De-Identification', 'Patient Rights']),
    }),
}, async ({ term }) => {
    // Return the entire section as it contains all definitions contextually.
    return {
        content: [{
                type: 'text',
                text: `Here are the core definitions from the guide:\n\n${hipaaData['what_is_hipaa?']}`
            }]
    };
});
/**
 * Tool that provides an actionable guide to the HIPAA Security Rule.
 */
server.tool('getSecurityRuleSafeguards', {
    description: 'Provides a developer-focused guide to the Administrative, Physical, and Technical Safeguards of the HIPAA Security Rule.',
    schema: zod_1.z.object({}),
}, async () => {
    return {
        content: [{
                type: 'text',
                text: hipaaData['hipaa_security_rule']
            }]
    };
});
/**
 * Tool for getting specific security controls for mobile and wearable apps.
 */
server.tool('getMobileSecurityControls', {
    description: 'Returns a checklist of specific security controls for mobile and wearable apps, including data storage, transmission, and notifications.',
    schema: zod_1.z.object({}),
}, async () => {
    return {
        content: [{
                type: 'text',
                text: hipaaData['mobile_and_wearable_applications']
            }]
    };
});
/**
 * Tool to get current information on financial penalties for violations.
 */
server.tool('getPenaltyInformation', {
    description: 'Returns the up-to-date, four-tiered structure of civil monetary penalties (fines) for HIPAA violations.',
    schema: zod_1.z.object({}),
}, async () => {
    return {
        content: [{
                type: 'text',
                text: hipaaData['hipaa_fines']
            }]
    };
});
/**
 * Tool to explain how compliance is validated in the industry.
 */
server.tool('getValidationAndAuditInfo', {
    description: 'Explains why there is no official "HIPAA Certification" and details how compliance is demonstrated through third-party audits and attestations like HITRUST and SOC 2.',
    schema: zod_1.z.object({}),
}, async () => {
    return {
        content: [{
                type: 'text',
                text: hipaaData['who_validates_hipaa_compliance']
            }]
    };
});
/**
 * Tool for understanding developer-specific architectural decisions.
 */
server.tool('getDeveloperConsiderations', {
    description: 'Provides guidance on key developer decisions, including the cloud Shared Responsibility Model and a framework for "Build vs. Outsource" choices.',
    schema: zod_1.z.object({}),
}, async () => {
    return {
        content: [{
                type: 'text',
                text: hipaaData['developer_considerations']
            }]
    };
});
// --- ADVANCED HIPAA TOOLS ---
/**
 * Tool to provide a checklist for responding to a data breach.
 */
server.tool('getBreachResponseChecklist', {
    description: 'Provides an actionable checklist for incident response according to the HIPAA Breach Notification Rule, including timelines and notification requirements.',
    schema: zod_1.z.object({}),
}, async () => {
    // In a real scenario, this content would be in your JSON file.
    return {
        content: [{
                type: 'text',
                text: `
# HIPAA Breach Response Checklist

This is a high-level guide. Consult your legal counsel immediately upon discovering a potential breach.

**Phase 1: Immediate Response (First 24 Hours)**
1.  **Identify and Contain:** Stop the breach immediately. Isolate affected systems. Preserve all evidence.
2.  **Assemble Response Team:** Convene your designated incident response team, including your Security Official and legal counsel.
3.  **Preliminary Assessment:** Determine the nature of the breach. What data was exposed? How many individuals are potentially affected?

**Phase 2: Investigation and Risk Assessment (Days 1-60)**
1.  **Perform a Risk Assessment:** You MUST assess the probability that PHI has been compromised based on four factors:
    * The nature and extent of the PHI involved.
    * The unauthorized person who used the PHI or to whom the disclosure was made.
    * Whether the PHI was actually acquired or viewed.
    * The extent to which the risk to the PHI has been mitigated.
2.  **Document Everything:** Every action, decision, and finding must be meticulously documented.

**Phase 3: Notification (Without Unreasonable Delay and No Later Than 60 Days)**
1.  **Notify Affected Individuals:** Send written notifications to all affected individuals.
2.  **Notify HHS:** For breaches affecting 500 or more individuals, you must notify the Secretary of HHS at the same time as individuals. For smaller breaches, you can report them annually.
3.  **Notify the Media:** For breaches affecting more than 500 residents of a specific state or jurisdiction, you must notify prominent media outlets serving that area.
`
            }]
    };
});
/**
 * Tool to get a checklist for secure coding practices related to HIPAA.
 */
server.tool('getSecureCodingChecklist', {
    description: 'Provides a checklist for developers to ensure HIPAA compliance throughout the Software Development Lifecycle (SDLC).',
    schema: zod_1.z.object({}),
}, async () => {
    return {
        content: [{
                type: 'text',
                text: `
# HIPAA Secure SDLC Checklist

1.  **Data Minimization:** Does this feature only collect the minimum necessary PHI to function?
2.  **Input Validation:** Are all inputs that could potentially contain PHI (e.g., text fields, file uploads) properly validated and sanitized to prevent injection attacks?
3.  **Authentication & Authorization:** Is every endpoint that touches PHI protected with authentication? Does the code check if the authenticated user is authorized to access the specific record they are requesting?
4.  **Secure Data Transmission:** Is all data, especially PHI, transmitted using strong, modern TLS (1.2+)?
5.  **Secure Data Storage:** Is sensitive data encrypted at rest? Are you using platform-recommended secure storage APIs for tokens and keys?
6.  **Audit Logging:** Does the code generate a detailed, immutable audit log for any action that creates, reads, updates, or deletes PHI? The log must include user ID, timestamp, and action taken.
7.  **Error Handling & Information Disclosure:** Do error messages avoid revealing sensitive information (e.g., "User 'john.doe@email.com' not found" is a disclosure; "Invalid username or password" is not).
8.  **Dependency Scanning:** Are you regularly scanning third-party libraries for known vulnerabilities?
`
            }]
    };
});
/**
 * Tool to provide a checklist for vetting third-party vendors.
 */
server.tool('getVendorVettingChecklist', {
    description: 'Provides a checklist for evaluating a third-party vendor (Business Associate) to ensure they meet HIPAA compliance standards before integration.',
    schema: zod_1.z.object({
        vendorName: zod_1.z.string().describe("The name of the third-party service being considered, e.g., 'Twilio', 'Google Cloud', 'Zendesk'"),
    }),
}, async ({ vendorName }) => {
    return {
        content: [{
                type: 'text',
                text: `
# Business Associate Vetting Checklist for ${vendorName}

Before integrating with ${vendorName} or any vendor that will handle PHI, you must perform due diligence.

1.  **Will They Sign a BAA?**: This is the first and most important question. If the answer is no, you cannot use them for PHI. Period.
2.  **Review Their Compliance Documentation:** Does ${vendorName} have a public-facing trust center or compliance page detailing their HIPAA-eligible services?
3.  **Check for Independent Audits:** Do they have a SOC 2 Type 2 report or a HITRUST certification? Request and review these documents.
4.  **Shared Responsibility Model:** Does ${vendorName} clearly document what they are responsible for versus what you are responsible for in maintaining compliance?
5.  **Data Residency and Control:** Can you control where the data is stored geographically?
6.  **Breach Notification:** What is their process and timeline for notifying you in the event of a breach on their end? This must be outlined in the BAA.
7.  **Data Disposal:** What is their policy for securely deleting your data when you terminate your service with them?
`
            }]
    };
});
// --- GENERAL DEVELOPMENT TOOLS ---
/**
 * Tool to provide a general checklist for securing APIs.
 */
server.tool('getApiSecurityChecklist', {
    description: 'Provides a general-purpose checklist for securing backend APIs, based on OWASP best practices.',
    schema: zod_1.z.object({}),
}, async () => {
    return {
        content: [{
                type: 'text',
                text: `
# General API Security Checklist (OWASP Based)

1.  **Authentication:** Implement a standard, strong authentication mechanism (e.g., OAuth 2.0, JWT). Do not roll your own.
2.  **Authorization:** Enforce authorization at every endpoint. Check that the authenticated user has the correct permissions to perform the requested action on the requested resource (e.g., User A cannot access User B's data).
3.  **Input Validation:** Validate all incoming data for type, format, and length. Reject any invalid data. This protects against injection attacks.
4.  **Rate Limiting:** Implement rate limiting to protect against denial-of-service (DoS) and brute-force attacks.
5.  **Use HTTPS Everywhere:** All API endpoints must enforce TLS 1.2 or higher.
6.  **Proper Error Handling:** Return generic error messages. Do not leak sensitive information like stack traces or internal function names.
7.  **Security Headers:** Use security headers like Content-Security-Policy, Strict-Transport-Security, and X-Content-Type-Options.
8.  **Logging and Monitoring:** Log all API requests and monitor for suspicious activity, such as high error rates or access attempts from unusual locations.
`
            }]
    };
});
/**
 * Tool to provide guidance on what to include in a privacy policy.
 */
server.tool('getPrivacyPolicyPoints', {
    description: 'Provides a checklist of key sections and topics that should be included in a user-facing privacy policy. This is for guidance only and is not legal advice.',
    schema: zod_1.z.object({}),
}, async () => {
    return {
        content: [{
                type: 'text',
                text: `
# Key Topics for a Privacy Policy

This is a guide to help structure a privacy policy. You must consult with legal counsel to draft the final document.

1.  **What Information We Collect:**
    * Explicitly list the types of data you collect (e.g., email address, name, IP address, usage data).
    * Distinguish between data the user provides directly and data you collect automatically.
2.  **How We Use Your Information:**
    * Explain the purpose for collecting the data (e.g., to provide the service, for marketing, for analytics).
3.  **How We Share Your Information:**
    * List the categories of third parties with whom you share data (e.g., cloud providers, analytics services, payment processors).
    * Explain the circumstances under which you might share data (e.g., with user consent, for legal reasons).
4.  **Data Security:**
    * Briefly describe the measures you take to protect user data (e.g., encryption, access controls).
5.  **Data Retention:**
    * Explain how long you keep user data and your policy for deleting it.
6.  **Your Rights and Choices:**
    * Detail the rights users have regarding their data (e.g., right to access, right to delete, right to opt-out of marketing).
7.  **Contact Information:**
    * Provide a clear way for users to contact you with privacy-related questions.
8.  **Policy Updates:**
    * Explain how you will notify users of changes to the privacy policy.
`
            }]
    };
});
/**
 * Tool to provide a checklist for handling general sensitive data (PII).
 */
server.tool('getGeneralDataSecurityChecklist', {
    description: 'Provides a general checklist for handling sensitive Personally Identifiable Information (PII), even if it is not PHI.',
    schema: zod_1.z.object({}),
}, async () => {
    return {
        content: [{
                type: 'text',
                text: `
# General PII Security Checklist

1.  **Inventory:** Do you know exactly what PII you are collecting and where it is stored?
2.  **Minimization:** Are you only collecting the PII that is absolutely necessary for your service to function?
3.  **Access Control:** Is access to PII strictly limited on a need-to-know basis?
4.  **Encryption:** Is all PII encrypted both in transit (TLS) and at rest?
5.  **Logging:** Is all access to PII logged and monitored?
6.  **Secure Deletion:** Do you have a process for securely and permanently deleting PII when it is no longer needed or when a user requests it?
7.  **Training:** Is your team trained on how to handle PII securely and what to do in case of a data spill?
`
            }]
    };
});
// --- NEW COMPLIANCE CONFIRMATION TOOL ---
/**
 * A tool that forces the agent to confirm its generated code against a specific compliance checklist.
 */
server.tool('confirmCodeCompliance', {
    description: 'Takes a snippet of code and a relevant compliance checklist (e.g., from getSecureCodingChecklist) and requires the agent to provide a point-by-point justification of how the code meets each requirement. This must be the last step before outputting code.',
    schema: zod_1.z.object({
        codeSnippet: zod_1.z.string().describe("The proposed code the agent intends to write."),
        checklist: zod_1.z.string().describe("The full text of the checklist the code must be validated against."),
        justification: zod_1.z.string().describe("A point-by-point explanation of how the codeSnippet satisfies each item in the checklist."),
    }),
}, async ({ justification }) => {
    // The tool's main purpose is to force the agent to generate the justification.
    // It returns the justification, confirming the agent completed the reasoning process.
    return {
        content: [{
                type: 'text',
                text: `Compliance Justification Confirmed:\n\n${justification}`
            }]
    };
});
console.log('✅ All compliance tools have been defined.');
// --- 4. Start Listening for Agent Connections ---
const transport = new stdio_js_1.StdioServerTransport();
server.connect(transport);
console.log('🚀 HIPAA Compliance Guardian MCP Server is running and awaiting connection...');
