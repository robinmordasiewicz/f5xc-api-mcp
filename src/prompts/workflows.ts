/**
 * MCP Workflow Prompts
 *
 * Provides guided workflows for common F5XC operations.
 * These prompts help users accomplish complex multi-step tasks.
 */

/**
 * Workflow prompt definition
 */
export interface WorkflowPrompt {
  /** Unique prompt identifier */
  name: string;
  /** Human-readable description */
  description: string;
  /** Prompt arguments */
  arguments: WorkflowArgument[];
  /** Prompt template */
  template: string;
}

/**
 * Workflow argument
 */
export interface WorkflowArgument {
  /** Argument name */
  name: string;
  /** Argument description */
  description: string;
  /** Whether argument is required */
  required: boolean;
}

/**
 * Deploy HTTP Load Balancer workflow
 */
export const deployHttpLoadBalancerPrompt: WorkflowPrompt = {
  name: "deploy-http-loadbalancer",
  description:
    "Guide through deploying an HTTP Load Balancer with origin pool, health checks, and optional WAF",
  arguments: [
    {
      name: "namespace",
      description: "Namespace for the load balancer",
      required: true,
    },
    {
      name: "name",
      description: "Name for the load balancer",
      required: true,
    },
    {
      name: "domain",
      description: "Domain name for the load balancer (e.g., app.example.com)",
      required: true,
    },
    {
      name: "backend_ip",
      description: "IP address of the backend server",
      required: true,
    },
    {
      name: "backend_port",
      description: "Port of the backend server (default: 80)",
      required: false,
    },
    {
      name: "enable_waf",
      description: "Enable Web Application Firewall (true/false)",
      required: false,
    },
  ],
  template: `# Deploy HTTP Load Balancer Workflow

I'll help you deploy an HTTP Load Balancer in F5 Distributed Cloud.

## Configuration Summary
- **Namespace**: {{namespace}}
- **Load Balancer Name**: {{name}}
- **Domain**: {{domain}}
- **Backend**: {{backend_ip}}:{{backend_port}}
- **WAF Enabled**: {{enable_waf}}

## Steps

### Step 1: Create Origin Pool
First, create an origin pool to define your backend servers.

Use the **f5xc-api-waap-origin-pool-create** tool or CURL:

**CURL (Authenticated):**
\`\`\`bash
curl -X POST "https://\${TENANT}.console.ves.volterra.io/api/config/namespaces/{{namespace}}/origin_pools" \\
  -H "Authorization: APIToken \${F5XC_API_TOKEN}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "metadata": {
      "name": "{{name}}-origin-pool",
      "namespace": "{{namespace}}"
    },
    "spec": {
      "origin_servers": [{
        "public_ip": {
          "ip": "{{backend_ip}}"
        }
      }],
      "port": {{backend_port}},
      "no_tls": {},
      "endpoint_selection": "LOCAL_PREFERRED",
      "loadbalancer_algorithm": "ROUND_ROBIN"
    }
  }'
\`\`\`

### Step 2: Create HTTP Load Balancer

Use the **f5xc-api-waap-http-loadbalancer-create** tool or CURL:

**CURL (Authenticated):**
\`\`\`bash
curl -X POST "https://\${TENANT}.console.ves.volterra.io/api/config/namespaces/{{namespace}}/http_loadbalancers" \\
  -H "Authorization: APIToken \${F5XC_API_TOKEN}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "metadata": {
      "name": "{{name}}",
      "namespace": "{{namespace}}"
    },
    "spec": {
      "domains": ["{{domain}}"],
      "http": {
        "dns_volterra_managed": true
      },
      "default_route_pools": [{
        "pool": {
          "namespace": "{{namespace}}",
          "name": "{{name}}-origin-pool"
        },
        "weight": 1
      }],
      "advertise_on_public_default_vip": {}
    }
  }'
\`\`\`

{{#if enable_waf}}
### Step 3: Enable WAF Protection

Use the **f5xc-api-waf-app-firewall-create** tool to create a WAF policy.
{{/if}}

## Verification

After deployment, verify using the following API tools:
- **f5xc-api-waap-http-loadbalancer-get** with name={{name}}, namespace={{namespace}}
- **f5xc-api-waap-origin-pool-get** with name={{name}}-origin-pool, namespace={{namespace}}

## Next Steps
- Configure DNS to point {{domain}} to the F5XC VIP
- Set up monitoring and alerts
- Consider enabling additional security features
`,
};

/**
 * Configure WAF workflow
 */
export const configureWafPrompt: WorkflowPrompt = {
  name: "configure-waf",
  description: "Guide through configuring Web Application Firewall protection",
  arguments: [
    {
      name: "namespace",
      description: "Namespace for the WAF policy",
      required: true,
    },
    {
      name: "name",
      description: "Name for the WAF policy",
      required: true,
    },
    {
      name: "loadbalancer",
      description: "Name of the HTTP Load Balancer to protect",
      required: true,
    },
    {
      name: "mode",
      description: "WAF mode: blocking or monitoring",
      required: false,
    },
  ],
  template: `# Configure WAF Protection Workflow

I'll help you configure Web Application Firewall protection for your application.

## Configuration Summary
- **Namespace**: {{namespace}}
- **WAF Policy Name**: {{name}}
- **Load Balancer**: {{loadbalancer}}
- **Mode**: {{mode}}

## Steps

### Step 1: Create Application Firewall Policy

Use the **f5xc-api-waf-app-firewall-create** tool or CURL:

**CURL (Authenticated):**
\`\`\`bash
curl -X POST "https://\${TENANT}.console.ves.volterra.io/api/config/namespaces/{{namespace}}/app_firewalls" \\
  -H "Authorization: APIToken \${F5XC_API_TOKEN}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "metadata": {
      "name": "{{name}}",
      "namespace": "{{namespace}}"
    },
    "spec": {
      "detection_settings": {
        "signature_selection_setting": {
          "default_attack_type_settings": {},
          "high_medium_accuracy_signatures": {}
        },
        "enable_suppression": {},
        "enable_threat_campaigns": {}
      },
      "bot_protection_setting": {
        "malicious_bot_action": "BLOCK",
        "suspicious_bot_action": "REPORT",
        "good_bot_action": "REPORT"
      },
      "blocking": {}
    }
  }'
\`\`\`

### Step 2: Attach WAF to Load Balancer

Update your HTTP Load Balancer to use the WAF policy.

## Verification

Use the **f5xc-api-waf-app-firewall-get** tool with name={{name}}, namespace={{namespace}}.

## Security Recommendations
- Start in monitoring mode before enabling blocking
- Review security events regularly
- Fine-tune signature settings based on your application
- Consider enabling bot defense for API endpoints
`,
};

/**
 * Create Multi-Cloud Site workflow
 */
export const createMultiCloudSitePrompt: WorkflowPrompt = {
  name: "create-multicloud-site",
  description: "Guide through deploying an F5XC site in AWS, Azure, or GCP",
  arguments: [
    {
      name: "namespace",
      description: "Namespace for the site",
      required: true,
    },
    {
      name: "name",
      description: "Name for the site",
      required: true,
    },
    {
      name: "cloud",
      description: "Cloud provider: aws, azure, or gcp",
      required: true,
    },
    {
      name: "region",
      description: "Cloud region for deployment",
      required: true,
    },
    {
      name: "vpc_id",
      description: "VPC/VNet ID to deploy into",
      required: true,
    },
  ],
  template: `# Create Multi-Cloud Site Workflow

I'll help you deploy an F5 Distributed Cloud site in {{cloud}}.

## Configuration Summary
- **Namespace**: {{namespace}}
- **Site Name**: {{name}}
- **Cloud Provider**: {{cloud}}
- **Region**: {{region}}
- **VPC/VNet**: {{vpc_id}}

## Prerequisites
1. Cloud credentials configured in F5XC
2. Appropriate IAM permissions in {{cloud}}
3. VPC/VNet exists and is accessible

## Steps

### Step 1: Verify Cloud Credentials

Use the **f5xc-api-cloud-infrastructure-cloud-credentials-list** tool to verify credentials.

### Step 2: Create Site

Use the appropriate API tool based on your cloud provider:

{{#if (eq cloud "aws")}}
**AWS VPC Site:**
Use **f5xc-api-sites-aws-vpc-site-create** with appropriate parameters.
{{/if}}

{{#if (eq cloud "azure")}}
**Azure VNet Site:**
Use **f5xc-api-sites-azure-vnet-site-create** with appropriate parameters.
{{/if}}

{{#if (eq cloud "gcp")}}
**GCP VPC Site:**
Use **f5xc-api-sites-gcp-vpc-site-create** with appropriate parameters.
{{/if}}

### Step 3: Monitor Site Status

Use the appropriate API get tool to check site status:
- AWS: **f5xc-api-sites-aws-vpc-site-get**
- Azure: **f5xc-api-sites-azure-vnet-site-get**
- GCP: **f5xc-api-sites-gcp-vpc-site-get**

## Verification

Use **f5xc-api-sites-site-list** to view all sites.

## Next Steps
- Configure network policies
- Set up load balancers to use this site
- Enable monitoring and logging
`,
};

/**
 * All workflow prompts
 */
export const WORKFLOW_PROMPTS: WorkflowPrompt[] = [
  deployHttpLoadBalancerPrompt,
  configureWafPrompt,
  createMultiCloudSitePrompt,
];

/**
 * Get workflow prompt by name
 */
export function getWorkflowPrompt(name: string): WorkflowPrompt | undefined {
  return WORKFLOW_PROMPTS.find((p) => p.name === name);
}

/**
 * Process prompt template with arguments
 */
export function processPromptTemplate(template: string, args: Record<string, string>): string {
  let result = template;

  // Replace simple {{variable}} placeholders
  for (const [key, value] of Object.entries(args)) {
    const pattern = new RegExp(`\\{\\{${key}\\}\\}`, "g");
    result = result.replace(pattern, value ?? "");
  }

  // Handle {{#if variable}} ... {{/if}} blocks
  const ifPattern = /\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g;
  result = result.replace(ifPattern, (_, varName: string, content: string) => {
    const value = args[varName];
    return value && value !== "false" ? content : "";
  });

  // Handle {{#if (eq var "value")}} ... {{/if}} blocks
  const eqPattern = /\{\{#if\s+\(eq\s+(\w+)\s+"([^"]+)"\)\}\}([\s\S]*?)\{\{\/if\}\}/g;
  result = result.replace(eqPattern, (_, varName: string, expected: string, content: string) => {
    return args[varName] === expected ? content : "";
  });

  return result;
}
