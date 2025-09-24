variable "aws_region" {
  type        = string
  description = "AWS region for deployment"
  default     = "us-east-1"
}

variable "database_name" {
  type        = string
  description = "Database name for Postgres"
  default     = "clubcraft"
}

variable "database_username" {
  type        = string
  description = "Database admin username"
  default     = "clubcraft"
}

variable "database_password" {
  type        = string
  description = "Database admin password"
  sensitive   = true
}

variable "asset_bucket_name" {
  type        = string
  description = "S3 bucket for static assets"
}
