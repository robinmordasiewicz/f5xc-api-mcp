---
page_title: f5xc_k8s_pod_security_policy - f5xc-api-mcp
subcategory: Managed Kubernetes
description: Create Configuration Specification.
---

# K8S Pod Security Policy

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replacing an k8s_pod_security_policy object will update the object by replacing the existing spec
with the provided one.
For read-then-write operations a resourceVersion mismatch will occur if the
object was modified between the read and write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-managedkubernetes-k8s-pod-security-policy-create` | Create Configuration Specification. |
| `f5xc-api-managedkubernetes-k8s-pod-security-policy-get` | GET Configuration Specification. |
| `f5xc-api-managedkubernetes-k8s-pod-security-policy-list` | List K8s Pod Security Policy. |
| `f5xc-api-managedkubernetes-k8s-pod-security-policy-update` | Replace Configuration Specification. |
| `f5xc-api-managedkubernetes-k8s-pod-security-policy-delete` | DELETE K8s Pod Security Policy. |

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

- k8s-pod-security-policy

**Modifies:**

- k8s-pod-security-policy

**Deletes:**

- k8s-pod-security-policy
- contained_resources

## Example Usage

Ask Claude to help you work with K8S Pod Security Policy resources:

### Create K8S Pod Security Policy

> "Create a k8s-pod-security-policy named 'example' in the 'production' namespace"

### List K8S Pod Security Policys

> "List all k8s-pod-security-policys in the 'production' namespace"

### Get K8S Pod Security Policy Details

> "Get details of the k8s-pod-security-policy named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config k8s-pod-security-policy create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config k8s-pod-security-policy create {name} --namespace {namespace}
```

Create k8s-pod-security-policy

### delete

```bash
f5xcctl config k8s-pod-security-policy delete {name} --namespace {namespace}
```

Delete k8s-pod-security-policy

### get_specific

```bash
f5xcctl config k8s-pod-security-policy get {name} --namespace {namespace}
```

Get specific k8s-pod-security-policy

### list_all

```bash
f5xcctl config k8s-pod-security-policy list --namespace {namespace}
```

List all k8s-pod-security-policys

### update

```bash
f5xcctl config k8s-pod-security-policy update {name} --namespace {namespace} -f {file}.yaml
```

Update k8s-pod-security-policy

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl managed_kubernetes create k8s_pod_security_policy -n <namespace> -i k8s_pod_security_policy.yaml

# Get
f5xcctl managed_kubernetes get k8s_pod_security_policy <name> -n <namespace>

# List
f5xcctl managed_kubernetes list k8s_pod_security_policy -n <namespace>

# Delete
f5xcctl managed_kubernetes delete k8s_pod_security_policy <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_k8s_pod_security_policy" "example" {
  name      = "example-k8s-pod-security-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
