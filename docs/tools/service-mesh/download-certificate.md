---
page_title: f5xc_download_certificate - f5xc-api-mcp
subcategory: Service Mesh
description: Download Certificates.
---

# Download Certificate

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
| `f5xc-api-servicemesh-download-certificate-create` | Download Certificates. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Discovery Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Download Certificate resources:

### Create Download Certificate

> "Create a download-certificate named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create download_certificate -n <namespace> -i download_certificate.yaml

# Get
f5xcctl configuration get download_certificate -n <namespace> <name>

# List
f5xcctl configuration list download_certificate -n <namespace>

# Delete
f5xcctl configuration delete download_certificate -n <namespace> <name>
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
