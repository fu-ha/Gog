resource "aws_s3_bucket" "gog-s3-bucket" {
  bucket = "gog-s3-bucket"
  acl="private"
}