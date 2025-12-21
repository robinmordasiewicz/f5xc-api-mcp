---
page_title: f5xc_public_ip - f5xc-api-mcp
subcategory: Networking
description: GET Public IP.
---

# Public IP

Replacing an public_ip object will update the object by replacing the existing spec with the
provided one.
For read-then-write operations a resourceVersion mismatch will occur if the object was
modified between the read and write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-public-ip-get` | GET Public IP. |
| `f5xc-api-networking-public-ip-list` | List Public IP. |
| `f5xc-api-networking-public-ip-update` | Replace Public IP. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |
| `metadata.namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Public IP resources:

### List Public IPs

> "List all public-ips in the 'production' namespace"

### Get Public IP Details

> "Get details of the public-ip named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create public_ip -n <namespace> -i public_ip.yaml

# Get
f5xcctl configuration get public_ip -n <namespace> <name>

# List
f5xcctl configuration list public_ip -n <namespace>

# Delete
f5xcctl configuration delete public_ip -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_public_ip" "example" {
  name      = "example-public-ip"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
