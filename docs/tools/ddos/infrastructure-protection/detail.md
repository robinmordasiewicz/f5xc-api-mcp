---
page_title: f5xc_detail - f5xc-api-mcp
subcategory: Ddos
description: Add Event Detail.
---

# Detail

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Returns a list of event details. The list contains event details entered by customer and the SOC
team members, mitigation annotations and any attachments.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-detail-create` | Add Event Detail. |
| `f5xc-api-ddos-detail-list` | List of event details. |
| `f5xc-api-ddos-detail-update` | Edit event detail. |
| `f5xc-api-ddos-detail-delete` | DELETE event detail. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `event_id` | Event ID | `8094c17b-80c1-429d-8b17-7232f0e2937c.` |
| `namespace` | Namespace | `Value` |
| `event_detail_id` | Event Detail ID | `8094c17b-80c1-429d-8b17-7232f0e2937c.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- detail

**Modifies:**

- detail

**Deletes:**

- detail
- contained_resources

## Example Usage

Ask Claude to help you work with Detail resources:

### Create Detail

> "Create a detail named 'example' in the 'production' namespace"

### List Details

> "List all details in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl infraprotect detail create {name} --namespace {namespace}
```

Create detail

### file_based

```bash
f5xcctl infraprotect detail create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl infraprotect detail delete {name} --namespace {namespace}
```

Delete detail

### list_all

```bash
f5xcctl infraprotect detail list --namespace {namespace}
```

List all details

### update

```bash
f5xcctl infraprotect detail update {name} --namespace {namespace} -f {file}.yaml
```

Update detail

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ddos create detail -n <namespace> -i detail.yaml

# Get
f5xcctl ddos get detail <name> -n <namespace>

# List
f5xcctl ddos list detail -n <namespace>

# Delete
f5xcctl ddos delete detail <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_detail" "example" {
  name      = "example-detail"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
