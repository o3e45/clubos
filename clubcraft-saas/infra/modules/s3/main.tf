variable "bucket_name" {
  type = string
}

resource "aws_s3_bucket" "this" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_versioning" "this" {
  bucket = aws_s3_bucket.this.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_policy" "this" {
  bucket = aws_s3_bucket.this.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid       = "AllowCloudFrontServicePrincipal",
        Effect    = "Allow",
        Principal = {
          Service = "cloudfront.amazonaws.com"
        },
        Action = "s3:GetObject",
        Resource = "${aws_s3_bucket.this.arn}/*"
      }
    ]
  })
}

output "bucket_id" {
  value = aws_s3_bucket.this.id
}

output "bucket_domain" {
  value = aws_s3_bucket.this.bucket_regional_domain_name
}
