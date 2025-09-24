terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

module "network" {
  source = "terraform-aws-modules/vpc/aws"
  name   = "clubcraft"
  cidr   = "10.0.0.0/16"

  azs             = slice(data.aws_availability_zones.available.names, 0, 3)
  public_subnets  = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  private_subnets = ["10.0.11.0/24", "10.0.12.0/24", "10.0.13.0/24"]

  enable_nat_gateway   = true
  single_nat_gateway   = true
  enable_dns_hostnames = true
}

module "eks" {
  source          = "./modules/eks"
  cluster_name    = "clubcraft-eks"
  vpc_id          = module.network.vpc_id
  private_subnets = module.network.private_subnets
}

module "rds" {
  source              = "./modules/rds"
  vpc_security_groups = [module.network.default_security_group_id]
  subnets             = module.network.private_subnets
  db_name             = var.database_name
  db_username         = var.database_username
  db_password         = var.database_password
}

module "storage" {
  source      = "./modules/s3"
  bucket_name = var.asset_bucket_name
}

module "cdn" {
  source        = "./modules/cloudfront"
  bucket_domain = module.storage.bucket_domain
  bucket_id     = module.storage.bucket_id
}

data "aws_availability_zones" "available" {}
