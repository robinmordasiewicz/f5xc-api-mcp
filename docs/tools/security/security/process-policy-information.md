---
page_title: f5xc_process_policy_information - f5xc-api-mcp
subcategory: Security
description: ProcessPolicyInformation.
---

# Process Policy Information

ProcessPolicyInformation API takes policy and secret name as input and returns a document containing
.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-process-policy-information-create` | ProcessPolicyInformation. |

## Example Usage

Ask Claude to help you work with Process Policy Information resources:

### Create Process Policy Information

> "Create a process-policy-information named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create process_policy_information -n <namespace> -i process_policy_information.yaml

# Get
f5xcctl security get process_policy_information <name> -n <namespace>

# List
f5xcctl security list process_policy_information -n <namespace>

# Delete
f5xcctl security delete process_policy_information <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_process_policy_information" "example" {
  name      = "example-process-policy-information"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
