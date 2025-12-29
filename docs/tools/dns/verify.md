---
page_title: f5xc_verify - f5xc-api-mcp
subcategory: DNS
description: Verify DNS Domain.
---

# Verify

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Verify DNS Domain for a given dns_domain object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-verify-create` | Verify DNS Domain. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `example.com.` |
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- verify

## Example Usage

Ask Claude to help you work with Verify resources:

### Create Verify

> "Create a verify named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config verify create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config verify create {name} --namespace {namespace}
```

Create verify

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl dns create verify -n <namespace> -i verify.yaml

# Get
f5xcctl dns get verify <name> -n <namespace>

# List
f5xcctl dns list verify -n <namespace>

# Delete
f5xcctl dns delete verify <name> -n <namespace>
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
