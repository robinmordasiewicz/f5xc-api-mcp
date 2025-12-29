---
page_title: f5xc_virtual_k8s - f5xc-api-mcp
subcategory: Sites
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
| `f5xc-api-sites-virtual-k8s-create` | Create Virtual Kubernetes. |
| `f5xc-api-sites-virtual-k8s-get` | GET Virtual Kubernetes. |
| `f5xc-api-sites-virtual-k8s-list` | List Virtual Kubernetes. |
| `f5xc-api-sites-virtual-k8s-update` | Replace Virtual Kubernetes. |
| `f5xc-api-sites-virtual-k8s-delete` | DELETE Virtual Kubernetes. |

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

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config virtual-k8s create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config virtual-k8s create {name} --namespace {namespace}
```

Create virtual-k8s

### delete

```bash
f5xcctl config virtual-k8s delete {name} --namespace {namespace}
```

Delete virtual-k8s

### get_specific

```bash
f5xcctl config virtual-k8s get {name} --namespace {namespace}
```

Get specific virtual-k8s

### list_all

```bash
f5xcctl config virtual-k8s list --namespace {namespace}
```

List all virtual-k8ss

### update

```bash
f5xcctl config virtual-k8s update {name} --namespace {namespace} -f {file}.yaml
```

Update virtual-k8s

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl sites create virtual_k8s -n <namespace> -i virtual_k8s.yaml

# Get
f5xcctl sites get virtual_k8s <name> -n <namespace>

# List
f5xcctl sites list virtual_k8s -n <namespace>

# Delete
f5xcctl sites delete virtual_k8s <name> -n <namespace>
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
