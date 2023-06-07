# backend
resource "aws_codedeploy_deployment_group" "AppECS-gog-ecs-cluster-gog-back-service" {
  app_name               = "AppECS-gog-ecs-cluster-gog-back-service"
  deployment_config_name = "CodeDeployDefault.ECSAllAtOnce"
  deployment_group_name  = "DgpECS-gog-ecs-cluster-gog-back-service"
  service_role_arn       = aws_iam_role.ecsCodeDeployRole.arn

  auto_rollback_configuration {
    enabled = true
    events  = ["DEPLOYMENT_FAILURE"]
  }

  # blue_green_deployment_config {
  #   deployment_ready_option {
  #     action_on_timeout = "CONTINUE_DEPLOYMENT"
  #   }

  #   terminate_blue_instances_on_deployment_success {
  #     action                           = "TERMINATE"
  #     termination_wait_time_in_minutes = 5
  #   }
  # }

  deployment_style {
    deployment_option = "WITH_TRAFFIC_CONTROL"
    deployment_type   = "BLUE_GREEN"
  }

  ecs_service {
    cluster_name = "gog-ecs-cluster"
    service_name = "gog-back-service"
  }

  load_balancer_info {
    target_group_pair_info {
      prod_traffic_route {
        listener_arns = [var.lb_listener_back_arn]
      }

      target_group {
        name = vacr.lb_back_blue_target_group
      }

      target_group {
        name = var.lb_back_green_target_group
      }
    }
  }
}

# frontend
resource "aws_codedeploy_deployment_group" "AppECS-gog-ecs-cluster-gog-front-service" {
  app_name               = "AppECS-gog-ecs-cluster-gog-front-service"
  deployment_config_name = "CodeDeployDefault.ECSAllAtOnce"
  deployment_group_name  = "DgpECS-gog-ecs-cluster-gog-front-service"
  service_role_arn       = aws_iam_role.ecsCodeDeployRole.arn

  auto_rollback_configuration {
    enabled = true
    events  = ["DEPLOYMENT_FAILURE"]
  }

  # blue_green_deployment_config {
  #   deployment_ready_option {
  #     action_on_timeout = "CONTINUE_DEPLOYMENT"
  #   }

  #   terminate_blue_instances_on_deployment_success {
  #     action                           = "TERMINATE"
  #     termination_wait_time_in_minutes = 5
  #   }
  # }

  deployment_style {
    deployment_option = "WITH_TRAFFIC_CONTROL"
    deployment_type   = "BLUE_GREEN"
  }

  ecs_service {
    cluster_name = "gog-ecs-cluster"
    service_name = "gog-front-service"
  }

  load_balancer_info {
    target_group_pair_info {
      prod_traffic_route {
        listener_arns = [var.lb_listener_front_arn]
      }

      target_group {
        name = var.lb_front_blue_target_group
      }

      target_group {
        name = var.lb_front_blue_target_group
      }
    }
  }
}