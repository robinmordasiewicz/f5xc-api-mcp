---
page_title: f5xc_preauth - f5xc-api-mcp
subcategory: Bot And Threat Defense
description: Preauth
---

# Preauth

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Pre-flight auth checks before calling the Provision API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-botandthreatdefense-preauth-create` | Preauth |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- preauth

## Example Usage

Ask Claude to help you work with Preauth resources:

### Create Preauth

> "Create a preauth named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl tpm preauth create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl tpm preauth create {name} --namespace {namespace}
```

Create preauth

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl bot_and_threat_defense create preauth -n <namespace> -i preauth.yaml

# Get
f5xcctl bot_and_threat_defense get preauth <name> -n <namespace>

# List
f5xcctl bot_and_threat_defense list preauth -n <namespace>

# Delete
f5xcctl bot_and_threat_defense delete preauth <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_preauth" "example" {
  name      = "example-preauth"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
