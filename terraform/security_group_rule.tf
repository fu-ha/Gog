/* RDB */
resource "aws_security_group_rule" "gog-rds-sgr-1" {
  description       = "gog-rds-sgr-1"
  type              = "ingress"
  from_port         = 3306
  to_port           = 3306
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.gog-rds-sg.id
}
resource "aws_security_group_rule" "gog-rds-sgr-2" {
  description       = "gog-rds-sgr-2"
  type              = "ingress"
  from_port         = 3306
  to_port           = 3306
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/16"]
  security_group_id = aws_security_group.gog-rds-sg.id
}
resource "aws_security_group_rule" "gog-rds-sgr-3" {
  description       = "gog-rds-sgr-3"
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.gog-rds-sg.id
}
resource "aws_security_group_rule" "gog-rds-sgr-4" {
  description       = "gog-rds-sgr-4"
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  ipv6_cidr_blocks  = ["::/0"]
  security_group_id = aws_security_group.gog-rds-sg.id
}
resource "aws_security_group_rule" "gog-rds-sgr-5" {
  description       = "gog-rds-sgr-5"
  type                     = "ingress"
  from_port                = 3306
  to_port                  = 3306
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.gog-alb-sg.id
  security_group_id        = aws_security_group.gog-rds-sg.id
}

/* ALB */
resource "aws_security_group_rule" "gog-alb-sgr-1" {
  description       = "gog-alb-sgr-1"
  type              = "ingress"
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.gog-alb-sg.id
}
resource "aws_security_group_rule" "gog-alb-sgr-2" {
  description       = "gog-alb-sgr-2"
  type              = "ingress"
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/16"]
  security_group_id = aws_security_group.gog-alb-sg.id
}
resource "aws_security_group_rule" "gog-alb-sgr-3" {
  description       = "gog-alb-sgr-3"
  type              = "ingress"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.gog-alb-sg.id
}
resource "aws_security_group_rule" "gog-alb-sgr-4" {
  description       = "gog-alb-sgr-4"
  type              = "ingress"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/16"]
  security_group_id = aws_security_group.gog-alb-sg.id
}
resource "aws_security_group_rule" "gog-alb-sgr-5" {
  description       = "gog-alb-sgr-5"
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.gog-alb-sg.id
}
resource "aws_security_group_rule" "gog-alb-sgr-6" {
  description       = "gog-alb-sgr-6"
  type              = "ingress"
  from_port         = 8 #エコー要求(echo)
  to_port           = 0
  protocol          = "icmp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.gog-alb-sg.id
}
resource "aws_security_group_rule" "gog-alb-sgr-7" {
  description       = "gog-alb-sgr-7"
  type              = "ingress"
  from_port         = 8080
  to_port           = 8080
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.gog-alb-sg.id
}
resource "aws_security_group_rule" "gog-alb-sgr-8" {
  description       = "gog-alb-sgr-8"
  type              = "ingress"
  from_port         = 3000
  to_port           = 3000
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.gog-alb-sg.id
}


/* ECS */
resource "aws_security_group_rule" "gog-ecs-sgr-1" {
  description       = "gog-ecs-sgr-1"
  type              = "ingress"
  from_port         = 8 #エコー要求(echo)
  to_port           = 0
  protocol          = "icmp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.gog-ecs-sg.id
}
resource "aws_security_group_rule" "gog-ecs-sgr-2" {
  description       = "gog-ecs-sgr-2"
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.gog-ecs-sg.id
}
resource "aws_security_group_rule" "gog-ecs-sgr-3" {
  description       = "gog-ecs-sgr-3"
  type              = "ingress"
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.gog-ecs-sg.id
}
resource "aws_security_group_rule" "gog-ecs-sgr-4" {
  description       = "gog-ecs-sgr-4"
  type              = "ingress"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.gog-ecs-sg.id
}
resource "aws_security_group_rule" "gog-ecs-sgr-5" {
  description              = "gog-ecs-sgr-5"
  type                     = "ingress"
  from_port                = 0
  to_port                  = 0
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.gog-alb-sg.id
  security_group_id        = aws_security_group.gog-ecs-sg.id
}
resource "aws_security_group_rule" "gog-ecs-sgr-6" {
  description       = "gog-ecs-sgr-6"
  type              = "ingress"
  from_port         = 3000
  to_port           = 3000
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.gog-ecs-sg.id
}
resource "aws_security_group_rule" "gog-ecs-sgr-7" {
  description       = "gog-ecs-sgr-7"
  type              = "ingress"
  from_port         = 8080
  to_port           = 8080
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.gog-ecs-sg.id
}