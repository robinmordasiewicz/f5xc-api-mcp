---
page_title: f5xc_vulnerabilitie - f5xc-api-mcp
subcategory: Virtual
description: GET Vulnerabilities for Virtual Host.
---

# Vulnerabilitie

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET vulnerabilities for the given Virtual Host.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-vulnerabilitie-create` | GET Vulnerabilities for Virtual Host. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Virtual Host Name | `Blogging-app-vhost.` |
| `namespace` | Namespace | `Blogging-app.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- vulnerabilitie

## Example Usage

Ask Claude to help you work with Vulnerabilitie resources:

### Create Vulnerabilitie

> "Create a vulnerabilitie named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl ml vulnerabilitie create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl ml vulnerabilitie create {name} --namespace {namespace}
```

Create vulnerabilitie

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl virtual create vulnerabilitie -n <namespace> -i vulnerabilitie.yaml

# Get
f5xcctl virtual get vulnerabilitie <name> -n <namespace>

# List
f5xcctl virtual list vulnerabilitie -n <namespace>

# Delete
f5xcctl virtual delete vulnerabilitie <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_vulnerabilitie" "example" {
  name      = "example-vulnerabilitie"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
