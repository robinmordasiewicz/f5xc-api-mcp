---
page_title: f5xc_cloud_credentials - f5xc-api-mcp
subcategory: Cloud Resources
description: Create Cloud Credentials
---

# Cloud Credentials

List the set of cloud_credentials in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-cloud-credentials-create` | Create Cloud Credentials |
| `f5xc-api-core-cloud-credentials-get` | Get Cloud Credentials |
| `f5xc-api-core-cloud-credentials-list` | List Cloud Credentials |
| `f5xc-api-core-cloud-credentials-update` | Replace Cloud Credentials |
| `f5xc-api-core-cloud-credentials-delete` | Delete Cloud Credentials |

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

Ask Claude to help you work with Cloud Credentials resources:

### Create Cloud Credentials

> "Create a cloud-credentials named 'example' in the 'production' namespace"

### List Cloud Credentialss

> "List all cloud-credentialss in the 'production' namespace"

### Get Cloud Credentials Details

> "Get details of the cloud-credentials named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f cloud_credentials.yaml

# Get
f5xcctl get cloud_credentials {name} -n {namespace}

# List
f5xcctl get cloud_credentialss -n {namespace}

# Delete
f5xcctl delete cloud_credentials {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_cloud_credentials" "example" {
  name      = "example-cloud-credentials"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
