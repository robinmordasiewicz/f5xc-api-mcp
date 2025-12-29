---
page_title: f5xc_list_tcpdump - f5xc-api-mcp
subcategory: Support
description: List Tcpdump.
---

# List Tcpdump

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List tcpdump capture status on a ver node.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-list-tcpdump-create` | List Tcpdump. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |
| `site` | Site Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- list-tcpdump

## Example Usage

Ask Claude to help you work with List Tcpdump resources:

### Create List Tcpdump

> "Create a list-tcpdump named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl operate list-tcpdump create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl operate list-tcpdump create {name} --namespace {namespace}
```

Create list-tcpdump

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl support create list_tcpdump -n <namespace> -i list_tcpdump.yaml

# Get
f5xcctl support get list_tcpdump <name> -n <namespace>

# List
f5xcctl support list list_tcpdump -n <namespace>

# Delete
f5xcctl support delete list_tcpdump <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_list_tcpdump" "example" {
  name      = "example-list-tcpdump"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
