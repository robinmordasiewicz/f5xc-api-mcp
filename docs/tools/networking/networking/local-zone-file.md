---
page_title: f5xc_local_zone_file - f5xc-api-mcp
subcategory: Networking
description: GET Local Zone File.
---

# Local Zone File

GET local zone file from secondary DNS.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-local-zone-file-list` | GET Local Zone File. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `dns_zone_name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Local Zone File resources:

### List Local Zone Files

> "List all local-zone-files in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create local_zone_file -n <namespace> -i local_zone_file.yaml

# Get
f5xcctl configuration get local_zone_file -n <namespace> <name>

# List
f5xcctl configuration list local_zone_file -n <namespace>

# Delete
f5xcctl configuration delete local_zone_file -n <namespace> <name>
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
