# GCP VPC Site

Deploy F5 Distributed Cloud sites in Google Cloud Platform VPCs for distributed application
delivery and security.

!!! info "Subscription Tier"
    **STANDARD** - Available with standard F5XC subscription.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-site-gcp-vpc-site-create` | Create a new GCP VPC Site |
| `f5xc-api-site-gcp-vpc-site-get` | Get GCP VPC Site details |
| `f5xc-api-site-gcp-vpc-site-list` | List GCP VPC Sites |
| `f5xc-api-site-gcp-vpc-site-update` | Update GCP VPC Site configuration |
| `f5xc-api-site-gcp-vpc-site-delete` | Delete GCP VPC Site |

## Prerequisites

!!! warning "Requirements"
    - GCP cloud credentials configured in F5XC
    - VPC network with required subnets
    - Service Account with required permissions

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target namespace (typically "system") |
| name | string | Site name |
| gcp_region | string | GCP region (e.g., us-central1) |
| vpc_network | object | VPC network configuration |
| gcp_cred | object | Reference to GCP cloud credentials |

## Example Usage

### Create GCP VPC Site

Ask Claude:

> "Create a GCP VPC site named 'gcp-central' in us-central1 region"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: gcp_vpc_site
metadata:
  name: gcp-central
  namespace: system
spec:
  gcp_region: us-central1
  gcp_cred:
    name: example-gcp-creds
    namespace: system
  vpc_network:
    existing_network:
      name: example-vpc
  instance_type: n1-standard-4
  ingress_egress_gw:
    gcp_certified_hw: gcp-byol-voltmesh
    no_network_policy: {}
    no_forward_proxy: {}
EOF
```

### Terraform Resource

```hcl
resource "volterra_gcp_vpc_site" "gcp_central" {
  name      = "gcp-central"
  namespace = "system"

  gcp_region = "us-central1"

  gcp_cred {
    name      = volterra_cloud_credentials.gcp.name
    namespace = "system"
  }

  vpc_network {
    existing_network {
      name = "example-vpc"
    }
  }

  instance_type = "n1-standard-4"

  ingress_egress_gw {
    gcp_certified_hw  = "gcp-byol-voltmesh"
    no_network_policy = true
    no_forward_proxy  = true
  }
}
```

## Instance Types

| Type | Use Case |
|------|----------|
| n1-standard-4 | Development, low traffic |
| n1-standard-8 | Production, moderate traffic |
| n1-standard-16 | High performance |

## Related Resources

- [AWS VPC Site](aws-vpc-site.md) - AWS deployment
- [Azure VNet Site](azure-vnet-site.md) - Azure deployment
- [Cloud Credentials](cloud-credentials.md) - GCP credential setup

## Troubleshooting

### Site Stuck in Creating

1. Verify GCP cloud credentials are valid
2. Check VPC network configuration
3. Confirm Service Account permissions
4. Review GCP region availability
