---
page_title: f5xc_cminstance - f5xc-api-mcp
subcategory: Organization
description: Create Central Manager Insatnce
---

# Cminstance

Update the configuration by replacing the existing spec with the provided one.
For read-then-write
operations a resourceVersion mismatch will occur if the object was modified between the read and
write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-cminstance-create` | Create Central Manager Insatnce |
| `f5xc-api-core-cminstance-get` | Get Central Manager Instance |
| `f5xc-api-core-cminstance-list` | List Central Manager Instance |
| `f5xc-api-core-cminstance-update` | Replace Central Manager Instance |
| `f5xc-api-core-cminstance-delete` | Delete Central Manager Instance |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Cminstance resources:

### Create Cminstance

> "Create a cminstance named 'example' in the 'production' namespace"

### List Cminstances

> "List all cminstances in the 'production' namespace"

### Get Cminstance Details

> "Get details of the cminstance named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f cminstance.yaml

# Get
f5xcctl get cminstance {name} -n {namespace}

# List
f5xcctl get cminstances -n {namespace}

# Delete
f5xcctl delete cminstance {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_cminstance" "example" {
  name      = "example-cminstance"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
