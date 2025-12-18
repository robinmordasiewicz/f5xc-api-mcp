# Customer Edge

Customer Edge (CE) sites enable on-premises or private data center deployment of F5 Distributed
Cloud services, providing local traffic processing and connectivity to the global F5XC network.

!!! info "Subscription Tier"
    **STANDARD** - Available with standard F5XC subscription.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-site-customer-edge-create` | Create a Customer Edge site |
| `f5xc-api-site-customer-edge-get` | Get Customer Edge site details |
| `f5xc-api-site-customer-edge-list` | List Customer Edge sites |
| `f5xc-api-site-customer-edge-update` | Update Customer Edge site |
| `f5xc-api-site-customer-edge-delete` | Delete Customer Edge site |

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target namespace (typically "system") |
| name | string | Site name |
| site_type | string | CE deployment type |
| master_nodes | array | Master node configuration |

## Example Usage

### Create Customer Edge Site

Ask Claude:

> "Create a customer edge site named 'example-ce' for an on-premises data center deployment"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: customer_edge
metadata:
  name: example-ce
  namespace: system
spec:
  site_type: CE
  master_nodes:
    - public_ip: 203.0.113.100
  certified_hardware: kvm-voltmesh
  coordinates:
    latitude: 37.7749
    longitude: -122.4194
  inside_vrf:
    vrf_id: 1
  outside_vrf:
    vrf_id: 0
EOF
```

### Terraform Resource

```hcl
resource "volterra_customer_edge" "example_ce" {
  name      = "example-ce"
  namespace = "system"

  site_type = "CE"

  master_nodes {
    public_ip = "203.0.113.100"
  }

  certified_hardware = "kvm-voltmesh"

  coordinates {
    latitude  = 37.7749
    longitude = -122.4194
  }

  inside_vrf {
    vrf_id = 1
  }

  outside_vrf {
    vrf_id = 0
  }
}
```

## Certified Hardware

| Hardware Type | Description |
|---------------|-------------|
| `kvm-voltmesh` | KVM/QEMU virtual appliance |
| `vmware-voltmesh` | VMware vSphere appliance |
| `hyper-v-voltmesh` | Microsoft Hyper-V appliance |
| `baremetal-voltmesh` | Physical server deployment |
| `kvm-multi-nic-voltmesh` | KVM with multiple NICs |

## Common Configurations

### Single Node CE

```json
{
  "name": "example-ce",
  "namespace": "system",
  "site_type": "CE",
  "master_nodes": [{
    "public_ip": "203.0.113.100"
  }],
  "certified_hardware": "kvm-voltmesh"
}
```

### Multi-Node CE Cluster

```json
{
  "name": "example-ce-cluster",
  "namespace": "system",
  "site_type": "CE",
  "master_nodes": [
    {"public_ip": "203.0.113.100"},
    {"public_ip": "203.0.113.101"},
    {"public_ip": "203.0.113.102"}
  ],
  "certified_hardware": "vmware-voltmesh"
}
```

### With VRF Configuration

```json
{
  "name": "example-ce",
  "inside_vrf": {
    "vrf_id": 1,
    "interfaces": [{
      "name": "eth1",
      "ip_address": "10.0.0.1/24"
    }]
  },
  "outside_vrf": {
    "vrf_id": 0,
    "interfaces": [{
      "name": "eth0",
      "ip_address": "203.0.113.100/24",
      "gateway": "203.0.113.1"
    }]
  }
}
```

### With Site Mesh Group

```json
{
  "name": "example-ce",
  "site_mesh_group": {
    "namespace": "system",
    "name": "example-mesh-group"
  },
  "tunnel_type": "SITE_TO_SITE_TUNNEL_IPSEC"
}
```

## Deployment Steps

1. **Generate Token**: Create site registration token in F5XC Console
2. **Deploy Appliance**: Install CE image on target infrastructure
3. **Register Site**: Use token to register CE with F5XC
4. **Configure Networking**: Set up inside/outside VRF
5. **Verify Connectivity**: Confirm site status is healthy

## Related Resources

- [AWS VPC Site](aws-vpc-site.md) - AWS cloud deployment
- [Azure VNet Site](azure-vnet-site.md) - Azure cloud deployment
- [GCP VPC Site](gcp-vpc-site.md) - GCP cloud deployment
- [Network Connector](network-connector.md) - Network connectivity

## Troubleshooting

### Site Not Registering

1. Verify registration token is valid and not expired
2. Check network connectivity to F5XC control plane
3. Confirm DNS resolution works correctly
4. Review firewall rules for required ports

### Site Showing Unhealthy

!!! tip "Check Connectivity"
    Ensure outbound connectivity to `*.volterra.io` on ports 443, 65500.

1. Verify outside interface has internet access
2. Check system resources (CPU, memory, disk)
3. Review site logs for error messages
4. Confirm NTP synchronization is working

### Tunnel Not Establishing

1. Check VRF configuration on both sites
2. Verify IPsec/tunnel settings match
3. Confirm no NAT issues on outside interface
4. Review security group/firewall rules
