---
page_title: f5xc_local_zone_file - f5xc-api-mcp
subcategory: DNS
description: GET Local Zone File.
---

# Local Zone File

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET local zone file from secondary DNS.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-local-zone-file-list` | GET Local Zone File. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `dns_zone_name` | Name | `example.com.` |
| `namespace` | Namespace | `System` |

## Example Usage

Ask Claude to help you work with Local Zone File resources:

### List Local Zone Files

> "List all local-zone-files in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl config local-zone-file list --namespace {namespace}
```

List all local-zone-files

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl dns create local_zone_file -n <namespace> -i local_zone_file.yaml

# Get
f5xcctl dns get local_zone_file <name> -n <namespace>

# List
f5xcctl dns list local_zone_file -n <namespace>

# Delete
f5xcctl dns delete local_zone_file <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_local_zone_file" "example" {
  name      = "example-local-zone-file"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
