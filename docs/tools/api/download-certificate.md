---
page_title: f5xc_download_certificate - f5xc-api-mcp
subcategory: API
description: Download Certificates.
---

# Download Certificate

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Download the cerificates files for the Log Collerctor
In order to establish connection from the
third party application server to the
Log Colletor the user should download a zip file with the
certificates files:

- client.crt

- client.key

- server_ca.crt.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-download-certificate-create` | Download Certificates. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Discovery Name | `Ds1` |
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- download-certificate

## Example Usage

Ask Claude to help you work with Download Certificate resources:

### Create Download Certificate

> "Create a download-certificate named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh api create download_certificate -n <namespace> -i download_certificate.yaml

# Get
xcsh api get download_certificate <name> -n <namespace>

# List
xcsh api list download_certificate -n <namespace>

# Delete
xcsh api delete download_certificate <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_download_certificate" "example" {
  name      = "example-download-certificate"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
