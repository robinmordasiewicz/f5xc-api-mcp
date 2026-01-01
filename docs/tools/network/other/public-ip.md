---
page_title: f5xc_public_ip - f5xc-api-mcp
subcategory: Network
description: GET Public IP.
---

# Public IP

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Replacing an public_ip object will update the object by replacing the existing spec with the
provided one.
For read-then-write operations a resourceVersion mismatch will occur if the object was
modified between the read and write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-public-ip-get` | GET Public IP. |
| `f5xc-api-network-public-ip-list` | List Public IP. |
| `f5xc-api-network-public-ip-update` | Replace Public IP. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |
| `metadata.namespace` | Namespace | `Staging` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- public-ip

## Example Usage

Ask Claude to help you work with Public IP resources:

### List Public IPs

> "List all public-ips in the 'production' namespace"

### Get Public IP Details

> "Get details of the public-ip named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh network create public_ip -n <namespace> -i public_ip.yaml

# Get
xcsh network get public_ip <name> -n <namespace>

# List
xcsh network list public_ip -n <namespace>

# Delete
xcsh network delete public_ip <name> -n <namespace>
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
