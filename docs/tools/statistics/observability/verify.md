---
page_title: f5xc_verify - f5xc-api-mcp
subcategory: Statistics
description: Verify Alert Receiver.
---

# Verify

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

API to send request to verify Alert Receiver - applicable only for email and sms.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-verify-create` | Verify Alert Receiver. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Email1` |
| `namespace` | Namespace | `Ns1` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- verify

## Example Usage

Ask Claude to help you work with Verify resources:

### Create Verify

> "Create a verify named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh statistics create verify -n <namespace> -i verify.yaml

# Get
xcsh statistics get verify <name> -n <namespace>

# List
xcsh statistics list verify -n <namespace>

# Delete
xcsh statistics delete verify <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_verify" "example" {
  name      = "example-verify"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
