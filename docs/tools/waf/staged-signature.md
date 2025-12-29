---
page_title: f5xc_staged_signature - f5xc-api-mcp
subcategory: WAF
description: Staged Signatures.
---

# Staged Signature

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

API to GET Staged Signatures.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waf-staged-signature-create` | Staged Signatures. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Shared` |
| `vh_name` | Vh_name | `Blogging-app.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- staged-signature

## Example Usage

Ask Claude to help you work with Staged Signature resources:

### Create Staged Signature

> "Create a staged-signature named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl ml staged-signature create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl ml staged-signature create {name} --namespace {namespace}
```

Create staged-signature

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl waf create staged_signature -n <namespace> -i staged_signature.yaml

# Get
f5xcctl waf get staged_signature <name> -n <namespace>

# List
f5xcctl waf list staged_signature -n <namespace>

# Delete
f5xcctl waf delete staged_signature <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_staged_signature" "example" {
  name      = "example-staged-signature"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
