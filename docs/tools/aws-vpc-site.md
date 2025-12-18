# AWS VPC Site

Deploy F5 Distributed Cloud sites in AWS VPCs for distributed application delivery and security.

!!! info "Subscription Tier"
    **STANDARD** - Available with standard F5XC subscription.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-site-aws-vpc-site-create` | Create a new AWS VPC Site |
| `f5xc-api-site-aws-vpc-site-get` | Get AWS VPC Site details |
| `f5xc-api-site-aws-vpc-site-list` | List AWS VPC Sites |
| `f5xc-api-site-aws-vpc-site-update` | Update AWS VPC Site configuration |
| `f5xc-api-site-aws-vpc-site-delete` | Delete AWS VPC Site |

## Prerequisites

!!! warning "Requirements"
    - AWS cloud credentials configured in F5XC
    - VPC with required subnets
    - IAM permissions for site deployment

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target namespace |
| name | string | Site name |
| aws_region | string | AWS region (e.g., us-east-1) |
| vpc_id | string | AWS VPC ID |
| aws_cred | object | Reference to AWS cloud credentials |

## Example Usage

### Create AWS VPC Site

Ask Claude:

> "Create an AWS VPC site named 'aws-east' in us-east-1 using VPC vpc-12345678 with my AWS credentials"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: aws_vpc_site
metadata:
  name: aws-east
  namespace: system
spec:
  aws_region: us-east-1
  aws_cred:
    name: example-aws-creds
    namespace: system
  vpc:
    vpc_id: vpc-12345678
  instance_type: t3.xlarge
  ingress_egress_gw:
    aws_certified_hw: aws-byol-voltmesh
    no_network_policy: {}
    no_forward_proxy: {}
EOF
```

### Terraform Resource

```hcl
resource "volterra_aws_vpc_site" "aws_east" {
  name      = "aws-east"
  namespace = "system"

  aws_region = "us-east-1"

  aws_cred {
    name      = volterra_cloud_credentials.aws.name
    namespace = "system"
  }

  vpc {
    vpc_id = "vpc-12345678"
  }

  instance_type = "t3.xlarge"

  ingress_egress_gw {
    aws_certified_hw = "aws-byol-voltmesh"
    no_network_policy = true
    no_forward_proxy  = true
  }
}
```

## Common Configurations

### Ingress/Egress Gateway

For internet-facing applications with outbound connectivity:

```json
{
  "name": "aws-gateway",
  "namespace": "system",
  "aws_region": "us-east-1",
  "aws_cred": {
    "name": "example-aws-creds",
    "namespace": "system"
  },
  "vpc": {
    "vpc_id": "vpc-12345678"
  },
  "instance_type": "t3.xlarge",
  "ingress_egress_gw": {
    "aws_certified_hw": "aws-byol-voltmesh",
    "no_network_policy": {},
    "no_forward_proxy": {}
  }
}
```

### Ingress Gateway Only

For internet-facing applications without outbound proxy:

```json
{
  "ingress_gw": {
    "aws_certified_hw": "aws-byol-voltmesh"
  }
}
```

### App Stack Cluster

For Kubernetes workload deployment:

```json
{
  "voltstack_cluster": {
    "aws_certified_hw": "aws-byol-voltstack-combo"
  }
}
```

## Instance Types

| Type | Use Case |
|------|----------|
| t3.xlarge | Development, low traffic |
| t3.2xlarge | Production, moderate traffic |
| m5.4xlarge | High performance |
| c5.4xlarge | Compute intensive |

!!! tip "Sizing"
    Start with t3.xlarge and scale up based on performance metrics.

## Subnet Configuration

### Single Availability Zone

```json
{
  "vpc": {
    "vpc_id": "vpc-12345678"
  },
  "az_nodes": [{
    "aws_az_name": "us-east-1a",
    "inside_subnet": {
      "existing_subnet_id": "subnet-inside-1"
    },
    "outside_subnet": {
      "existing_subnet_id": "subnet-outside-1"
    }
  }]
}
```

### Multi-AZ High Availability

```json
{
  "az_nodes": [
    {
      "aws_az_name": "us-east-1a",
      "inside_subnet": {"existing_subnet_id": "subnet-inside-1a"},
      "outside_subnet": {"existing_subnet_id": "subnet-outside-1a"}
    },
    {
      "aws_az_name": "us-east-1b",
      "inside_subnet": {"existing_subnet_id": "subnet-inside-1b"},
      "outside_subnet": {"existing_subnet_id": "subnet-outside-1b"}
    },
    {
      "aws_az_name": "us-east-1c",
      "inside_subnet": {"existing_subnet_id": "subnet-inside-1c"},
      "outside_subnet": {"existing_subnet_id": "subnet-outside-1c"}
    }
  ]
}
```

## Site Lifecycle

1. **Creating** - Infrastructure being provisioned
2. **Upgrading** - Software updates in progress
3. **Online** - Site is operational
4. **Offline** - Site is not reachable
5. **Deleting** - Infrastructure being removed

## Related Resources

- [Azure VNet Site](azure-vnet-site.md) - Azure deployment
- [GCP VPC Site](gcp-vpc-site.md) - GCP deployment
- [Cloud Credentials](cloud-credentials.md) - AWS credential setup
- [Network Connector](network-connector.md) - Site-to-site connectivity

## Troubleshooting

### Site Stuck in Creating

1. Check AWS cloud credentials are valid
2. Verify VPC and subnet IDs exist
3. Confirm IAM permissions are sufficient
4. Check AWS region is correct

### Site Offline

1. Verify EC2 instances are running in AWS console
2. Check security group allows F5XC control plane traffic
3. Review site status in F5XC console for specific errors

### Insufficient Permissions

!!! warning "IAM Requirements"
    Ensure IAM role has EC2, VPC, and ELB permissions.

> "What IAM permissions are required for AWS VPC site deployment?"
