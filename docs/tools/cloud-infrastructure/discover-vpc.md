---
page_title: f5xc_discover_vpc - f5xc-api-mcp
subcategory: Cloud Infrastructure
description: Cloud Connect VPC Discovery.
---

# Discover VPC

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Returns all the vpcs for a specified cloud provider, region and cred.
For AWS it returns all the
vpcs which are not attached to any transit gateway in that region.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cloudinfrastructure-discover-vpc-create` | Cloud Connect VPC Discovery. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- discover-vpc

## Example Usage

Ask Claude to help you work with Discover VPC resources:

### Create Discover VPC

> "Create a discover-vpc named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl sync-cloud-data discover-vpc create {name} --namespace {namespace}
```

Create discover-vpc

### file_based

```bash
f5xcctl sync-cloud-data discover-vpc create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl cloud_infrastructure create discover_vpc -n <namespace> -i discover_vpc.yaml

# Get
f5xcctl cloud_infrastructure get discover_vpc <name> -n <namespace>

# List
f5xcctl cloud_infrastructure list discover_vpc -n <namespace>

# Delete
f5xcctl cloud_infrastructure delete discover_vpc <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_discover_vpc" "example" {
  name      = "example-discover-vpc"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
