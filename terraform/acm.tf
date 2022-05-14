/* frontend */
resource "aws_acm_certificate" "gog-front-acm" {
  domain_name       = "geem84.com"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

/* backend */
resource "aws_acm_certificate" "gog-back-acm" {
  domain_name       = "geem84.work"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}