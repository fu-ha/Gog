resource "aws_db_instance" "gog-rds" {
  allocated_storage       = 20
  instance_class          = "db.t3.micro"
  engine                  = "MySQL"
  engine_version          = "8.0.27"
  storage_type            = "gp2"
  parameter_group_name    = "default.mysql8.0"
  username                = var.aws_db_user
  password                = var.aws_db_password
  port                    = 3306
  skip_final_snapshot     = true
  vpc_security_group_ids  = [aws_security_group.gog-rds-sg.id]
  db_subnet_group_name    = aws_db_subnet_group.gog-rds-subnet-group.name
  
  lifecycle {
    prevent_destroy = false
  }
}

variable "aws_db_user" {}
variable "aws_db_password" {}