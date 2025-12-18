# Network Connector

Network Connectors enable connectivity between F5XC sites and external networks, including
cloud VPCs and on-premises data centers.

!!! info "Subscription Tier"
    **STANDARD** - Available with standard F5XC subscription.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-network-connector-create` | Create a network connector |
| `f5xc-api-network-network-connector-get` | Get network connector details |
| `f5xc-api-network-network-connector-list` | List network connectors |
| `f5xc-api-network-network-connector-update` | Update network connector |
| `f5xc-api-network-network-connector-delete` | Delete network connector |

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target namespace |
| name | string | Connector name |
| slo_to_global_dr | object | Site Local Outside to Global Direct Connect |

## Example Usage

### Create Network Connector

Ask Claude:

> "Create a network connector to connect my site to the global network"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: network_connector
metadata:
  name: site-connector
  namespace: system
spec:
  slo_to_global_dr:
    global_vn:
      name: global
      namespace: system
EOF
```

### Terraform Resource

```hcl
resource "volterra_network_connector" "site_connector" {
  name      = "site-connector"
  namespace = "system"

  slo_to_global_dr {
    global_vn {
      name      = "global"
      namespace = "system"
    }
  }
}
```

## Connector Types

### Site Local to Global

Connect site local network to F5XC global network:

```json
{
  "slo_to_global_dr": {
    "global_vn": {
      "name": "global",
      "namespace": "system"
    }
  }
}
```

### Site Local Inside to Site Local Outside

Connect inside and outside networks at a site:

```json
{
  "sli_to_slo_dr": {
    "sli_to_slo": {}
  }
}
```

## Related Resources

- [AWS VPC Site](aws-vpc-site.md) - Cloud site connectivity
- [Azure VNet Site](azure-vnet-site.md) - Cloud site connectivity
- [GCP VPC Site](gcp-vpc-site.md) - Cloud site connectivity

## Troubleshooting

### "Connector not working"

1. Verify site is online and healthy
2. Check network policies allow traffic
3. Review routing configuration
