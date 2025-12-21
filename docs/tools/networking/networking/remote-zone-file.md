---
page_title: f5xc_remote_zone_file - f5xc-api-mcp
subcategory: Networking
description: GET Remote Zone File.
---

# Remote Zone File

GET remote zone file from primary DNS.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-remote-zone-file-list` | GET Remote Zone File. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `dns_zone_name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Remote Zone File resources:

### List Remote Zone Files

> "List all remote-zone-files in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create remote_zone_file -n <namespace> -i remote_zone_file.yaml

# Get
f5xcctl configuration get remote_zone_file -n <namespace> <name>

# List
f5xcctl configuration list remote_zone_file -n <namespace>

# Delete
f5xcctl configuration delete remote_zone_file -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_remote_zone_file" "example" {
  name      = "example-remote-zone-file"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
