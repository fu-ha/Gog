/* RDS */
resource "aws_security_group" "gog-rds-sg" {
  name        = "gog-rds-sg"
  vpc_id      = aws_vpc.gog-vpc.id
}

/* ALB */
resource "aws_security_group" "gog-alb-sg" {
  name        = "gog-alb-sg"
  vpc_id      = aws_vpc.gog-vpc.id
}

/* ECS */
resource "aws_security_group" "gog-ecs-sg" {
  name        = "gog-ecs-sg"
  vpc_id      = aws_vpc.gog-vpc.id
}