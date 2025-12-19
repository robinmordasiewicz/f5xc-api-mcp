---
page_title: f5xc_cloud_elastic_ip - f5xc-api-mcp
subcategory: Cloud Resources
description: Create Cloud Elastic IP
---

# Cloud Elastic IP

Get cloud elastic ip will get the object from the storage backend for namespace metadata.namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-cloud-elastic-ip-create` | Create Cloud Elastic IP |
| `f5xc-api-core-cloud-elastic-ip-get` | Get Cloud Elastic IP |
| `f5xc-api-core-cloud-elastic-ip-list` | List Cloud Elastic IP |
| `f5xc-api-core-cloud-elastic-ip-update` | Replace Cloud Elastic IP |
| `f5xc-api-core-cloud-elastic-ip-delete` | Delete Cloud Elastic IP |

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

Ask Claude to help you work with Cloud Elastic IP resources:

### Create Cloud Elastic IP

> "Create a cloud-elastic-ip named 'example' in the 'production' namespace"

### List Cloud Elastic IPs

> "List all cloud-elastic-ips in the 'production' namespace"

### Get Cloud Elastic IP Details

> "Get details of the cloud-elastic-ip named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f cloud_elastic_ip.yaml

# Get
f5xcctl get cloud_elastic_ip {name} -n {namespace}

# List
f5xcctl get cloud_elastic_ips -n {namespace}

# Delete
f5xcctl delete cloud_elastic_ip {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_cloud_elastic_ip" "example" {
  name      = "example-cloud-elastic-ip"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
