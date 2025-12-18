---
page_title: f5xc_certificate - f5xc-api-mcp
subcategory: Certificates
description: Create Certificate
---

# Certificate

List the set of certificate in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-certificate-create` | Create Certificate |
| `f5xc-api-core-certificate-get` | Get Certificate |
| `f5xc-api-core-certificate-list` | List Certificate |
| `f5xc-api-core-certificate-update` | Replace Certificate |
| `f5xc-api-core-certificate-delete` | Delete Certificate |

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

Ask Claude to help you work with Certificate resources:

### Create Certificate

> "Create a certificate named 'example' in the 'production' namespace"

### List Certificates

> "List all certificates in the 'production' namespace"

### Get Certificate Details

> "Get details of the certificate named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f certificate.yaml

# Get
f5xcctl get certificate {name} -n {namespace}

# List
f5xcctl get certificates -n {namespace}

# Delete
f5xcctl delete certificate {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_certificate" "example" {
  name      = "example-certificate"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
