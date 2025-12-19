---
page_title: f5xc_crl - f5xc-api-mcp
subcategory: Certificates
description: Create CRL
---

# Crl

List the set of crl in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-crl-create` | Create CRL |
| `f5xc-api-core-crl-get` | Get CRL |
| `f5xc-api-core-crl-list` | List CRL |
| `f5xc-api-core-crl-update` | Replace CRL |
| `f5xc-api-core-crl-delete` | Delete CRL |

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

Ask Claude to help you work with Crl resources:

### Create Crl

> "Create a crl named 'example' in the 'production' namespace"

### List Crls

> "List all crls in the 'production' namespace"

### Get Crl Details

> "Get details of the crl named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f crl.yaml

# Get
f5xcctl get crl {name} -n {namespace}

# List
f5xcctl get crls -n {namespace}

# Delete
f5xcctl delete crl {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_crl" "example" {
  name      = "example-crl"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
