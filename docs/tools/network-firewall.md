# Network Firewall

Network Firewalls provide layer 3/4 traffic filtering and security controls for F5 Distributed
Cloud sites and network segments.

!!! info "Subscription Tier"
    **STANDARD** - Available with standard F5XC subscription.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-network-firewall-create` | Create a new Network Firewall |
| `f5xc-api-network-network-firewall-get` | Get Network Firewall details |
| `f5xc-api-network-network-firewall-list` | List Network Firewalls in namespace |
| `f5xc-api-network-network-firewall-update` | Update Network Firewall configuration |
| `f5xc-api-network-network-firewall-delete` | Delete Network Firewall |

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target namespace |
| name | string | Firewall name |
| rule_list | array | Firewall rule definitions |

## Example Usage

### Create Network Firewall

Ask Claude:

> "Create a network firewall named 'example-fw' that allows HTTP/HTTPS and blocks all other traffic"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: network_firewall
metadata:
  name: example-fw
  namespace: production
spec:
  rule_list:
    rules:
      - metadata:
          name: allow-http
        spec:
          action: ALLOW
          destination_port_list:
            - "80"
            - "443"
          protocol: TCP
      - metadata:
          name: deny-all
        spec:
          action: DENY
          all_traffic: {}
EOF
```

### Terraform Resource

```hcl
resource "volterra_network_firewall" "example_fw" {
  name      = "example-fw"
  namespace = "production"

  rule_list {
    rules {
      metadata {
        name = "allow-http"
      }
      spec {
        action = "ALLOW"
        destination_port_list = ["80", "443"]
        protocol              = "TCP"
      }
    }

    rules {
      metadata {
        name = "deny-all"
      }
      spec {
        action      = "DENY"
        all_traffic = true
      }
    }
  }
}
```

## Rule Actions

| Action | Description |
|--------|-------------|
| `ALLOW` | Permit matching traffic |
| `DENY` | Block matching traffic |
| `LOG` | Log matching traffic without action |

## Common Configurations

### Allow Specific Ports

```json
{
  "name": "example-fw",
  "rule_list": {
    "rules": [{
      "metadata": {"name": "allow-web"},
      "spec": {
        "action": "ALLOW",
        "protocol": "TCP",
        "destination_port_list": ["80", "443", "8080"]
      }
    }]
  }
}
```

### IP-Based Rules

```json
{
  "rule_list": {
    "rules": [{
      "metadata": {"name": "allow-internal"},
      "spec": {
        "action": "ALLOW",
        "source_prefix_list": {
          "prefixes": ["10.0.0.0/8", "172.16.0.0/12"]
        }
      }
    }]
  }
}
```

### Protocol-Based Rules

```json
{
  "rule_list": {
    "rules": [
      {
        "metadata": {"name": "allow-icmp"},
        "spec": {
          "action": "ALLOW",
          "protocol": "ICMP"
        }
      },
      {
        "metadata": {"name": "allow-udp-dns"},
        "spec": {
          "action": "ALLOW",
          "protocol": "UDP",
          "destination_port_list": ["53"]
        }
      }
    ]
  }
}
```

### Default Deny with Exceptions

```json
{
  "rule_list": {
    "rules": [
      {
        "metadata": {"name": "allow-established"},
        "spec": {
          "action": "ALLOW",
          "advanced_match": {
            "established_connections": {}
          }
        }
      },
      {
        "metadata": {"name": "deny-all"},
        "spec": {
          "action": "DENY",
          "all_traffic": {}
        }
      }
    ]
  }
}
```

## Related Resources

- [Enhanced Firewall Policy](enhanced-firewall-policy.md) - Advanced firewall rules
- [Network Connector](network-connector.md) - Network connectivity
- [AWS VPC Site](aws-vpc-site.md) - Cloud site deployment

## Troubleshooting

### Traffic Unexpectedly Blocked

1. Review rule order (first match wins)
2. Check source/destination prefix configurations
3. Verify protocol and port settings
4. Review logs for matched rules

### Rules Not Applied

!!! tip "Check Site Association"
    Ensure the firewall is properly associated with the target site or network segment.

1. Verify firewall is attached to correct network
2. Check namespace references
3. Confirm firewall is in active state
4. Review site network configuration
