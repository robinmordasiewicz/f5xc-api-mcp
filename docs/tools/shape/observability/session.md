---
page_title: f5xc_session - f5xc-api-mcp
subcategory: Shape
description: GET Devices By Session.
---

# Session

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET devices session information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-session-create` | GET Devices By Session. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- session

## Example Usage

Ask Claude to help you work with Session resources:

### Create Session

> "Create a session named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape session create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape session create {name} --namespace {namespace}
```

Create session

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create session -n <namespace> -i session.yaml

# Get
f5xcctl shape get session <name> -n <namespace>

# List
f5xcctl shape list session -n <namespace>

# Delete
f5xcctl shape delete session <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_session" "example" {
  name      = "example-session"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
