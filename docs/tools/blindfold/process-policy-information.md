---
page_title: f5xc_process_policy_information - f5xc-api-mcp
subcategory: Blindfold
description: ProcessPolicyInformation.
---

# Process Policy Information

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

ProcessPolicyInformation API takes policy and secret name as input and returns a document containing
.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-blindfold-process-policy-information-create` | ProcessPolicyInformation. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- process-policy-information

## Example Usage

Ask Claude to help you work with Process Policy Information resources:

### Create Process Policy Information

> "Create a process-policy-information named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh blindfold create process_policy_information -n <namespace> -i process_policy_information.yaml

# Get
xcsh blindfold get process_policy_information <name> -n <namespace>

# List
xcsh blindfold list process_policy_information -n <namespace>

# Delete
xcsh blindfold delete process_policy_information <name> -n <namespace>
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
