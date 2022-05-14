/* alb */
resource "aws_lb" "gog-alb" {
  name               = "gog-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.gog-alb-sg.id]
  subnets            = [aws_subnet.gog-public-1a.id, aws_subnet.gog-private-1c.id]

  enable_deletion_protection = true

  tags = {
    Name = "gog-alb"
  }
}

resource "aws_lb" "gog-back-alb" {
  name               = "gog-back-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.gog-alb-sg.id]
  subnets            = [aws_subnet.gog-private-1a.id, aws_subnet.gog-private-1c.id]

  enable_deletion_protection = true

  tags = {
    Name = "gog-back-alb"
  }
}

/* listener */
 /* frontend */
  /* redirect action */
resource "aws_lb_listener" "gog-front-http-listener" {
  load_balancer_arn = aws_lb.gog-alb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}  
  /* foward action */
resource "aws_lb_listener" "gog-front-https-listener" {
  load_balancer_arn = aws_lb.gog-alb.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-FS-1-2-2019-08"
  certificate_arn   = aws_acm_certificate.gog-front-acm.arn
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.gog-front-alb-tg.arn
  }
}
 /* backend */
    /* redirect action */
resource "aws_lb_listener" "gog-back-http-listener" {
  load_balancer_arn = aws_lb.gog-back-alb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}  
  /* foward action */
resource "aws_lb_listener" "gog-back-https-listener" {
  load_balancer_arn = aws_lb.gog-back-alb.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-FS-1-2-2019-08"
  certificate_arn   = aws_acm_certificate.gog-back-acm.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.gog-back-alb-tg.arn
  }
}
/* target_group */
resource "aws_lb_target_group" "gog-front-alb-tg" {
  name        = "gog-front-alb-tg"
  target_type = "ip"
  vpc_id      = aws_vpc.gog-vpc.id
  port        = 80
  protocol    = "HTTP"

  health_check {
    enabled             = true
    path                = "/"
    port                = 80
    protocol            = "HTTP"
    healthy_threshold   = 5
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 30
  }
}

resource "aws_lb_target_group" "gog-back-alb-tg" {
  name        = "gog-back-alb-tg"
  target_type = "ip"
  vpc_id      = aws_vpc.gog-vpc.id
  port        = 80
  protocol    = "HTTP"

  health_check {
    enabled             = true
    path                = "/api/v1/health_check"
    protocol            = "HTTP"
    port                = 3000
    healthy_threshold   = 5
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 30
  }
}