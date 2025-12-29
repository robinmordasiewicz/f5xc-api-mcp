---
page_title: f5xc_get_policy_document - f5xc-api-mcp
subcategory: Blindfold
description: Policy Document.
---

# Get Policy Document

!!! info "Low Risk"
    Operations on this resource are generally safe.

GetPolicyDocument API returns secret policy document for the given policy that contains information
about all the rules in the policy and policy_id.
This document can be given to F5 Distributed Cloud
secret management tool to do secret encryption.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-blindfold-get-policy-document-get` | Policy Document. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Site-secret-policy.` |
| `namespace` | Namespace | `System` |

## Example Usage

Ask Claude to help you work with Get Policy Document resources:

### Get Get Policy Document Details

> "Get details of the get-policy-document named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl secret_management get-policy-document get {name} --namespace {namespace}
```

Get specific get-policy-document

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl blindfold create get_policy_document -n <namespace> -i get_policy_document.yaml

# Get
f5xcctl blindfold get get_policy_document <name> -n <namespace>

# List
f5xcctl blindfold list get_policy_document -n <namespace>

# Delete
f5xcctl blindfold delete get_policy_document <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_get_policy_document" "example" {
  name      = "example-get-policy-document"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
