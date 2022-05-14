/* backend */
resource "aws_route53_zone" "gog-back-host-zone" {
  name    = "geem84.work"
}

resource "aws_route53_record" "gog-back-host-zone-record" {
  zone_id = aws_route53_zone.gog-back-host-zone.zone_id
  name    = aws_route53_zone.gog-back-host-zone.name
  type    = "A"

  alias {
    name                   = aws_lb.gog-back-alb.dns_name
    zone_id                = aws_lb.gog-back-alb.zone_id
    evaluate_target_health = true
  }
}

/* frontend */
resource "aws_route53_zone" "gog-front-host-zone" {
  name    = "geem84.com"
}

resource "aws_route53_record" "gog-front-host-zone-record" {
  zone_id = aws_route53_zone.gog-front-host-zone.zone_id
  name    = aws_route53_zone.gog-front-host-zone.name
  type    = "A"

  alias {
    name                   = aws_lb.gog-alb.dns_name
    zone_id                = aws_lb.gog-alb.zone_id
    evaluate_target_health = true
  }
}