---
page_title: f5xc_virtual_k8s - f5xc-api-mcp
subcategory: Container Services
description: Create Virtual Kubernetes.
---

# Virtual K8S

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replacing an endpoint object will update the object by replacing the existing spec with the provided
one.
For read-then-write operations a resourceVersion mismatch will occur if the object was modified
between the read and write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-containerservices-virtual-k8s-create` | Create Virtual Kubernetes. |
| `f5xc-api-containerservices-virtual-k8s-get` | GET Virtual Kubernetes. |
| `f5xc-api-containerservices-virtual-k8s-list` | List Virtual Kubernetes. |
| `f5xc-api-containerservices-virtual-k8s-update` | Replace Virtual Kubernetes. |
| `f5xc-api-containerservices-virtual-k8s-delete` | DELETE Virtual Kubernetes. |

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

- virtual-k8s

**Modifies:**

- virtual-k8s

**Deletes:**

- virtual-k8s
- contained_resources

## Example Usage

Ask Claude to help you work with Virtual K8S resources:

### Create Virtual K8S

> "Create a virtual-k8s named 'example' in the 'production' namespace"

### List Virtual K8Ss

> "List all virtual-k8ss in the 'production' namespace"

### Get Virtual K8S Details

> "Get details of the virtual-k8s named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh container_services create virtual_k8s -n <namespace> -i virtual_k8s.yaml

# Get
xcsh container_services get virtual_k8s <name> -n <namespace>

# List
xcsh container_services list virtual_k8s -n <namespace>

# Delete
xcsh container_services delete virtual_k8s <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_virtual_k8s" "example" {
  name      = "example-virtual-k8s"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
