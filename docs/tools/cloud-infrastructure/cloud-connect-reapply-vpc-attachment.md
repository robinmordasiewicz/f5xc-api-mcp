---
page_title: f5xc_cloud_connect_reapply_vpc_attachment - f5xc-api-mcp
subcategory: Cloud Infrastructure
description: ReApplyVPCAttachment.
---

# Cloud Connect Reapply VPC Attachment

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

RE-applies VPC attachment in a cloud connect config.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cloudinfrastructure-cloud-connect-reapply-vpc-attachment-create` | ReApplyVPCAttachment. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- cloud-connect-reapply-vpc-attachment

## Example Usage

Ask Claude to help you work with Cloud Connect Reapply VPC Attachment resources:

### Create Cloud Connect Reapply VPC Attachment

> "Create a cloud-connect-reapply-vpc-attachment named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh cloud_infrastructure create cloud_connect_reapply_vpc_attachment -n <namespace> -i cloud_connect_reapply_vpc_attachment.yaml

# Get
xcsh cloud_infrastructure get cloud_connect_reapply_vpc_attachment <name> -n <namespace>

# List
xcsh cloud_infrastructure list cloud_connect_reapply_vpc_attachment -n <namespace>

# Delete
xcsh cloud_infrastructure delete cloud_connect_reapply_vpc_attachment <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_cloud_connect_reapply_vpc_attachment" "example" {
  name      = "example-cloud-connect-reapply-vpc-attachment"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
