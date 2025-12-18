# Azure VNet Site

Deploy F5 Distributed Cloud sites in Azure Virtual Networks for distributed application delivery
and security.

!!! info "Subscription Tier"
    **STANDARD** - Available with standard F5XC subscription.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-site-azure-vnet-site-create` | Create a new Azure VNet Site |
| `f5xc-api-site-azure-vnet-site-get` | Get Azure VNet Site details |
| `f5xc-api-site-azure-vnet-site-list` | List Azure VNet Sites |
| `f5xc-api-site-azure-vnet-site-update` | Update Azure VNet Site configuration |
| `f5xc-api-site-azure-vnet-site-delete` | Delete Azure VNet Site |

## Prerequisites

!!! warning "Requirements"
    - Azure cloud credentials configured in F5XC
    - Virtual Network with required subnets
    - Service Principal with required permissions

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target namespace (typically "system") |
| name | string | Site name |
| azure_region | string | Azure region (e.g., eastus) |
| vnet | object | VNet configuration |
| azure_cred | object | Reference to Azure cloud credentials |

## Example Usage

### Create Azure VNet Site

Ask Claude:

> "Create an Azure VNet site named 'azure-east' in eastus region"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: azure_vnet_site
metadata:
  name: azure-east
  namespace: system
spec:
  azure_region: eastus
  azure_cred:
    name: example-azure-creds
    namespace: system
  vnet:
    existing_vnet:
      resource_group: example-rg
      vnet_name: example-vnet
  instance_type: Standard_D3_v2
  ingress_egress_gw:
    azure_certified_hw: azure-byol-voltmesh
    no_network_policy: {}
    no_forward_proxy: {}
EOF
```

### Terraform Resource

```hcl
resource "volterra_azure_vnet_site" "azure_east" {
  name      = "azure-east"
  namespace = "system"

  azure_region = "eastus"

  azure_cred {
    name      = volterra_cloud_credentials.azure.name
    namespace = "system"
  }

  vnet {
    existing_vnet {
      resource_group = "example-rg"
      vnet_name      = "example-vnet"
    }
  }

  instance_type = "Standard_D3_v2"

  ingress_egress_gw {
    azure_certified_hw = "azure-byol-voltmesh"
    no_network_policy  = true
    no_forward_proxy   = true
  }
}
```

## Instance Types

| Type | Use Case |
|------|----------|
| Standard_D3_v2 | Development, low traffic |
| Standard_D4_v2 | Production, moderate traffic |
| Standard_D8_v2 | High performance |

## Related Resources

- [AWS VPC Site](aws-vpc-site.md) - AWS deployment
- [GCP VPC Site](gcp-vpc-site.md) - GCP deployment
- [Cloud Credentials](cloud-credentials.md) - Azure credential setup

## Troubleshooting

### Site Stuck in Creating

1. Verify Azure cloud credentials are valid
2. Check VNet and subnet configurations
3. Confirm Service Principal permissions
4. Review Azure region availability
