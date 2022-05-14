/* cluster */
resource "aws_ecs_cluster" "gog-ecs-cluster" {
  name = "gog-ecs-cluster"
}

/* backend */
 /* task definition */
 resource "aws_ecs_task_definition" "gog-back-ecs-task" {
  family                   = "gog-back-ecs-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 256
  memory                   = 512
  container_definitions    = file("./tasks/gog_backend_definition.json")

  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }
}
 /* service difinition */
resource "aws_ecs_service" "gog-back-ecs-service" {
  name             = "gog-back-ecs-service"
  cluster          = aws_ecs_cluster.gog-ecs-cluster.id
  task_definition  = aws_ecs_task_definition.gog-back-ecs-task.arn
  desired_count    = 1
  launch_type      = "FARGATE"
  platform_version = "1.4.0"
  

  network_configuration {
    subnets          = [aws_subnet.gog-private-1a.id, aws_subnet.gog-private-1c.id]
    security_groups  = [aws_security_group.gog-ecs-sg.id]
    assign_public_ip = true 
  }



  load_balancer {
    target_group_arn = aws_lb_target_group.gog-back-alb-tg.arn
    container_name   = "gog-back-container"
    container_port   = 3000
  }
} 
 
/* frontend */
 /* task definition */
resource "aws_ecs_task_definition" "gog-front-ecs-task" {
  family                   = "gog-front-ecs-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 256
  memory                   = 512
  container_definitions    = file("./tasks/gog_frontend_definition.json")

  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }
}
 /* service difinition */ 
resource "aws_ecs_service" "gog-front-ecs-service" {
  name             = "gog-front-ecs-service"
  cluster          = aws_ecs_cluster.gog-ecs-cluster.id
  task_definition  = aws_ecs_task_definition.gog-front-ecs-task.arn
  desired_count    = 1
  launch_type      = "FARGATE"
  platform_version = "1.4.0"
  

  network_configuration {
    subnets          = [aws_subnet.gog-public-1a.id, aws_subnet.gog-private-1c.id]
    security_groups  = [aws_security_group.gog-ecs-sg.id]
    assign_public_ip = true 
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.gog-front-alb-tg.arn
    container_name   = "gog-front-container"
    container_port   = 80
  }
}