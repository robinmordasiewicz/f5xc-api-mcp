---
page_title: f5xc_process_policy_information - f5xc-api-mcp
subcategory: Organization
description: ProcessPolicyInformation
---

# Process Policy Information

ProcessPolicyInformation API takes policy and secret name as input and returns a document containing
.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-process-policy-information-create` | ProcessPolicyInformation |

## Example Usage

Ask Claude to help you work with Process Policy Information resources:

### Create Process Policy Information

> "Create a process-policy-information named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create process_policy_information -n <namespace> -i process_policy_information.yaml

# Get
f5xcctl configuration get process_policy_information -n <namespace> <name>

# List
f5xcctl configuration list process_policy_information -n <namespace>

# Delete
f5xcctl configuration delete process_policy_information -n <namespace> <name>
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
