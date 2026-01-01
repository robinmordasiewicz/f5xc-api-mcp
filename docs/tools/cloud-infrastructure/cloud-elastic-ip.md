---
page_title: f5xc_cloud_elastic_ip - f5xc-api-mcp
subcategory: Cloud Infrastructure
description: Create Cloud Elastic IP.
---

# Cloud Elastic IP

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

GET cloud elastic IP will GET the object from the storage backend for namespace metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cloudinfrastructure-cloud-elastic-ip-create` | Create Cloud Elastic IP. |
| `f5xc-api-cloudinfrastructure-cloud-elastic-ip-get` | GET Cloud Elastic IP. |
| `f5xc-api-cloudinfrastructure-cloud-elastic-ip-list` | List Cloud Elastic IP. |
| `f5xc-api-cloudinfrastructure-cloud-elastic-ip-update` | Replace Cloud Elastic IP. |
| `f5xc-api-cloudinfrastructure-cloud-elastic-ip-delete` | DELETE Cloud Elastic IP. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- cloud-elastic-ip

**Modifies:**

- cloud-elastic-ip

**Deletes:**

- cloud-elastic-ip
- contained_resources

## Example Usage

Ask Claude to help you work with Cloud Elastic IP resources:

### Create Cloud Elastic IP

> "Create a cloud-elastic-ip named 'example' in the 'production' namespace"

### List Cloud Elastic IPs

> "List all cloud-elastic-ips in the 'production' namespace"

### Get Cloud Elastic IP Details

> "Get details of the cloud-elastic-ip named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh cloud_infrastructure create cloud_elastic_ip -n <namespace> -i cloud_elastic_ip.yaml

# Get
xcsh cloud_infrastructure get cloud_elastic_ip <name> -n <namespace>

# List
xcsh cloud_infrastructure list cloud_elastic_ip -n <namespace>

# Delete
xcsh cloud_infrastructure delete cloud_elastic_ip <name> -n <namespace>
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
