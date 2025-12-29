---
page_title: f5xc_update_asn_review_statu - f5xc-api-mcp
subcategory: Ddos
description: Update ASN Review Status.
---

# Update Asn Review Statu

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Update Infraprotect ASN Review Status.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-update-asn-review-statu-create` | Update ASN Review Status. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- update-asn-review-statu

## Example Usage

Ask Claude to help you work with Update Asn Review Statu resources:

### Create Update Asn Review Statu

> "Create a update-asn-review-statu named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl infraprotect update-asn-review-statu create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl infraprotect update-asn-review-statu create {name} --namespace {namespace}
```

Create update-asn-review-statu

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ddos create update_asn_review_statu -n <namespace> -i update_asn_review_statu.yaml

# Get
f5xcctl ddos get update_asn_review_statu <name> -n <namespace>

# List
f5xcctl ddos list update_asn_review_statu -n <namespace>

# Delete
f5xcctl ddos delete update_asn_review_statu <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_update_asn_review_statu" "example" {
  name      = "example-update-asn-review-statu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
