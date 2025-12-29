---
page_title: f5xc_comment - f5xc-api-mcp
subcategory: Support
description: Add comment to a customer support ticket.
---

# Comment

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Adds additional comment to a specified customer support ticket. The comment may include an
attachment.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-comment-create` | Add comment to a customer support ticket. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Value` |
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- comment

## Example Usage

Ask Claude to help you work with Comment resources:

### Create Comment

> "Create a comment named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl web comment create {name} --namespace {namespace}
```

Create comment

### file_based

```bash
f5xcctl web comment create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl support create comment -n <namespace> -i comment.yaml

# Get
f5xcctl support get comment <name> -n <namespace>

# List
f5xcctl support list comment -n <namespace>

# Delete
f5xcctl support delete comment <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_comment" "example" {
  name      = "example-comment"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
