variable "vpc_security_groups" {
  type = list(string)
}

variable "subnets" {
  type = list(string)
}

variable "db_name" {
  type = string
}

variable "db_username" {
  type = string
}

variable "db_password" {
  type      = string
  sensitive = true
}

resource "aws_db_subnet_group" "this" {
  name       = "clubcraft-rds-subnet"
  subnet_ids = var.subnets
}

resource "aws_db_instance" "this" {
  identifier              = "clubcraft-db"
  engine                  = "postgres"
  engine_version          = "15.3"
  instance_class          = "db.t3.medium"
  allocated_storage       = 50
  db_name                 = var.db_name
  username                = var.db_username
  password                = var.db_password
  db_subnet_group_name    = aws_db_subnet_group.this.name
  vpc_security_group_ids  = var.vpc_security_groups
  skip_final_snapshot     = true
  backup_retention_period = 7
  multi_az                = false
  publicly_accessible     = false
}

output "endpoint" {
  value = aws_db_instance.this.endpoint
}
