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

**f5xcctl command:**
\`\`\`bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: origin_pool
metadata:
  name: {{name}}-origin-pool
  namespace: {{namespace}}
spec:
  origin_servers:
    - public_ip:
        ip: {{backend_ip}}
  port: {{backend_port}}
  no_tls: {}
  endpoint_selection: LOCAL_PREFERRED
  loadbalancer_algorithm: ROUND_ROBIN
EOF
\`\`\`

**Terraform:**
\`\`\`hcl
resource "volterra_origin_pool" "{{name}}" {
  name      = "{{name}}-origin-pool"
  namespace = "{{namespace}}"

  origin_servers {
    public_ip {
      ip = "{{backend_ip}}"
    }
  }

  port             = {{backend_port}}
  no_tls           = true
  endpoint_selection = "LOCAL_PREFERRED"
  loadbalancer_algorithm = "ROUND_ROBIN"
}
\`\`\`

### Step 2: Create HTTP Load Balancer

**f5xcctl command:**
\`\`\`bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: http_loadbalancer
metadata:
  name: {{name}}
  namespace: {{namespace}}
spec:
  domains:
    - {{domain}}
  http:
    dns_volterra_managed: true
  default_route_pools:
    - pool:
        tenant: \${F5XC_TENANT}
        namespace: {{namespace}}
        name: {{name}}-origin-pool
      weight: 1
  advertise_on_public_default_vip: {}
EOF
\`\`\`

**Terraform:**
\`\`\`hcl
resource "volterra_http_loadbalancer" "{{name}}" {
  name      = "{{name}}"
  namespace = "{{namespace}}"

  domains = ["{{domain}}"]

  http {
    dns_volterra_managed = true
  }

  default_route_pools {
    pool {
      name      = volterra_origin_pool.{{name}}.name
      namespace = "{{namespace}}"
    }
    weight = 1
  }

  advertise_on_public_default_vip = true
}
\`\`\`

{{#if enable_waf}}
### Step 3: Enable WAF Protection

**f5xcctl command:**
\`\`\`bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: app_firewall
metadata:
  name: {{name}}-waf
  namespace: {{namespace}}
spec:
  detection_settings:
    signature_selection_setting:
      default_attack_type_settings: {}
      high_medium_accuracy_signatures: {}
    enable_suppression: {}
    enable_threat_campaigns: {}
EOF
\`\`\`
{{/if}}

## Verification

After deployment, verify with:
\`\`\`bash
f5xcctl get http_loadbalancer {{name}} -n {{namespace}}
f5xcctl get origin_pool {{name}}-origin-pool -n {{namespace}}
\`\`\`

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

**f5xcctl command:**
\`\`\`bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: app_firewall
metadata:
  name: {{name}}
  namespace: {{namespace}}
spec:
  detection_settings:
    signature_selection_setting:
      default_attack_type_settings: {}
      high_medium_accuracy_signatures: {}
    enable_suppression: {}
    enable_threat_campaigns: {}
  bot_protection_setting:
    malicious_bot_action: BLOCK
    suspicious_bot_action: REPORT
    good_bot_action: REPORT
  blocking: {}
EOF
\`\`\`

**Terraform:**
\`\`\`hcl
resource "volterra_app_firewall" "{{name}}" {
  name      = "{{name}}"
  namespace = "{{namespace}}"

  detection_settings {
    signature_selection_setting {
      default_attack_type_settings {}
      high_medium_accuracy_signatures {}
    }
    enable_suppression {}
    enable_threat_campaigns {}
  }

  bot_protection_setting {
    malicious_bot_action = "BLOCK"
    suspicious_bot_action = "REPORT"
    good_bot_action      = "REPORT"
  }

  blocking {}
}
\`\`\`

### Step 2: Attach WAF to Load Balancer

Update your HTTP Load Balancer to use the WAF policy.

## Verification

\`\`\`bash
f5xcctl get app_firewall {{name}} -n {{namespace}}
\`\`\`

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

\`\`\`bash
f5xcctl get cloud_credentials -n {{namespace}}
\`\`\`

### Step 2: Create Site

{{#if (eq cloud "aws")}}
**AWS VPC Site:**
\`\`\`bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: aws_vpc_site
metadata:
  name: {{name}}
  namespace: {{namespace}}
spec:
  aws_region: {{region}}
  vpc:
    existing_vpc:
      vpc_id: {{vpc_id}}
  instance_type: t3.xlarge
  ingress_gw:
    aws_certified_hw: aws-byol-voltmesh
  logs_streaming_disabled: {}
  ssh_key: your-ssh-key
EOF
\`\`\`
{{/if}}

{{#if (eq cloud "azure")}}
**Azure VNet Site:**
\`\`\`bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: azure_vnet_site
metadata:
  name: {{name}}
  namespace: {{namespace}}
spec:
  azure_region: {{region}}
  resource_group: your-resource-group
  vnet:
    existing_vnet:
      resource_group: your-resource-group
      vnet_name: {{vpc_id}}
  machine_type: Standard_D3_v2
  ingress_gw:
    azure_certified_hw: azure-byol-voltmesh
  logs_streaming_disabled: {}
EOF
\`\`\`
{{/if}}

{{#if (eq cloud "gcp")}}
**GCP VPC Site:**
\`\`\`bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: gcp_vpc_site
metadata:
  name: {{name}}
  namespace: {{namespace}}
spec:
  gcp_region: {{region}}
  vpc_network:
    existing_network:
      name: {{vpc_id}}
  instance_type: n1-standard-4
  ingress_gw:
    gcp_certified_hw: gcp-byol-voltmesh
  logs_streaming_disabled: {}
EOF
\`\`\`
{{/if}}

### Step 3: Apply Terraform Configuration

\`\`\`bash
terraform apply -auto-approve
\`\`\`

### Step 4: Monitor Site Status

\`\`\`bash
# Wait for site to become online
f5xcctl get {{cloud}}_vpc_site {{name}} -n {{namespace}} -w
\`\`\`

## Verification

\`\`\`bash
f5xcctl get sites
\`\`\`

## Next Steps
- Configure network policies
- Set up load balancers to use this site
- Enable monitoring and logging
`,
};

/**
 * Generate Terraform from F5XC workflow
 */
export const generateTerraformPrompt: WorkflowPrompt = {
  name: "generate-terraform",
  description: "Generate Terraform configuration from existing F5XC resources",
  arguments: [
    {
      name: "namespace",
      description: "Namespace to export",
      required: true,
    },
    {
      name: "resource_type",
      description: "Resource type to export (e.g., http_loadbalancer)",
      required: false,
    },
    {
      name: "name",
      description: "Specific resource name to export",
      required: false,
    },
  ],
  template: `# Generate Terraform Configuration

I'll help you export F5XC resources as Terraform configuration.

## Export Parameters
- **Namespace**: {{namespace}}
- **Resource Type**: {{resource_type}}
- **Resource Name**: {{name}}

## Steps

### Step 1: List Resources

\`\`\`bash
{{#if resource_type}}
f5xcctl get {{resource_type}}s -n {{namespace}} -o json
{{else}}
# List all resource types
f5xcctl get http_loadbalancers -n {{namespace}}
f5xcctl get origin_pools -n {{namespace}}
f5xcctl get app_firewalls -n {{namespace}}
{{/if}}
\`\`\`

### Step 2: Export to Terraform

{{#if name}}
\`\`\`bash
f5xcctl get {{resource_type}} {{name}} -n {{namespace}} -o terraform > {{name}}.tf
\`\`\`
{{else}}
\`\`\`bash
# Export all resources of type
f5xcctl get {{resource_type}}s -n {{namespace}} -o terraform > {{resource_type}}.tf
\`\`\`
{{/if}}

### Step 3: Generate Import Statements

\`\`\`bash
# Generate terraform import commands
f5xcctl get {{resource_type}} {{name}} -n {{namespace}} --import-cmd
\`\`\`

## Example Output

\`\`\`hcl
# Generated Terraform configuration
terraform {
  required_providers {
    volterra = {
      source  = "volterraedge/volterra"
      version = "~> 0.11"
    }
  }
}

provider "volterra" {
  api_p12_file = var.api_p12_file
  url          = var.api_url
}

# Import command:
# terraform import volterra_{{resource_type}}.{{name}} {{namespace}}/{{name}}

resource "volterra_{{resource_type}}" "{{name}}" {
  name      = "{{name}}"
  namespace = "{{namespace}}"

  # Configuration exported from F5XC
}
\`\`\`

## Best Practices
- Use variables for sensitive values
- Organize resources by namespace
- Use modules for reusable configurations
- Store state in remote backend
`,
};

/**
 * All workflow prompts
 */
export const WORKFLOW_PROMPTS: WorkflowPrompt[] = [
  deployHttpLoadBalancerPrompt,
  configureWafPrompt,
  createMultiCloudSitePrompt,
  generateTerraformPrompt,
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
export function processPromptTemplate(
  template: string,
  args: Record<string, string>
): string {
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
