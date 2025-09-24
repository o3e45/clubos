output "eks_cluster_endpoint" {
  value = module.eks.cluster_endpoint
}

output "rds_endpoint" {
  value = module.rds.endpoint
}

output "asset_bucket_id" {
  value = module.storage.bucket_id
}

output "cloudfront_domain_name" {
  value = module.cdn.domain_name
}
