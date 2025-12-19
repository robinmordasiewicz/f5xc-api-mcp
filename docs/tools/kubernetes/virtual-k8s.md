---
page_title: f5xc_virtual_k8s - f5xc-api-mcp
subcategory: Kubernetes
description: Create Virtual Kubernetes
---

# Virtual K8S

Replacing an endpoint object will update the object by replacing the existing spec with the provided
one.
For read-then-write operations a resourceVersion mismatch will occur if the object was modified
between the read and write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-appstack-virtual-k8s-create` | Create Virtual Kubernetes |
| `f5xc-api-appstack-virtual-k8s-get` | Get Virtual Kubernetes |
| `f5xc-api-appstack-virtual-k8s-list` | List Virtual Kubernetes |
| `f5xc-api-appstack-virtual-k8s-update` | Replace Virtual Kubernetes |
| `f5xc-api-appstack-virtual-k8s-delete` | Delete Virtual Kubernetes |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Virtual K8S resources:

### Create Virtual K8S

> "Create a virtual-k8s named 'example' in the 'production' namespace"

### List Virtual K8Ss

> "List all virtual-k8ss in the 'production' namespace"

### Get Virtual K8S Details

> "Get details of the virtual-k8s named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create virtual_k8s -n <namespace> -i virtual_k8s.yaml

# Get
f5xcctl configuration get virtual_k8s -n <namespace> <name>

# List
f5xcctl configuration list virtual_k8s -n <namespace>

# Delete
f5xcctl configuration delete virtual_k8s -n <namespace> <name>
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
