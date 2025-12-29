---
page_title: f5xc_application - f5xc-api-mcp
subcategory: Shape
description: Update Application.
---

# Application

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Update an application's information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-application-create` | Update Application. |
| `f5xc-api-shape-application-list` | GetApplications. |
| `f5xc-api-shape-application-delete` | DELETE Application. |

## Parameters

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `app_id` | Target application ID to DELETE. | ```volt-testing_backenda949ef7c-eda1ab47``` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- application

**Deletes:**

- application
- contained_resources

## Example Usage

Ask Claude to help you work with Application resources:

### Create Application

> "Create a application named 'example' in the 'production' namespace"

### List Applications

> "List all applications in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl shape application create {name} --namespace {namespace}
```

Create application

### file_based

```bash
f5xcctl shape application create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl shape application delete {name} --namespace {namespace}
```

Delete application

### list_all

```bash
f5xcctl shape application list --namespace {namespace}
```

List all applications

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create application -n <namespace> -i application.yaml

# Get
f5xcctl shape get application <name> -n <namespace>

# List
f5xcctl shape list application -n <namespace>

# Delete
f5xcctl shape delete application <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_application" "example" {
  name      = "example-application"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
