---
page_title: f5xc_top_good_bot - f5xc-api-mcp
subcategory: Shape
description: Peer Group Top Good Bots.
---

# Top Good Bot

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Peer Group Top Good Bots.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-top-good-bot-create` | Peer Group Top Good Bots. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- top-good-bot

## Example Usage

Ask Claude to help you work with Top Good Bot resources:

### Create Top Good Bot

> "Create a top-good-bot named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape top-good-bot create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape top-good-bot create {name} --namespace {namespace}
```

Create top-good-bot

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create top_good_bot -n <namespace> -i top_good_bot.yaml

# Get
f5xcctl shape get top_good_bot <name> -n <namespace>

# List
f5xcctl shape list top_good_bot -n <namespace>

# Delete
f5xcctl shape delete top_good_bot <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_top_good_bot" "example" {
  name      = "example-top-good-bot"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
