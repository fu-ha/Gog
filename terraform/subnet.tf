resource "aws_subnet" "gog-public-1a" {
  vpc_id                  = aws_vpc.gog-vpc.id
  cidr_block              = "10.0.0.0/24"
  availability_zone       = "ap-northeast-1a"
  map_public_ip_on_launch = true

  tags = {
    Name = "gog-public-1a"
  }
}
resource "aws_subnet" "gog-public-1c" {
  vpc_id                  = aws_vpc.gog-vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "ap-northeast-1c"
  map_public_ip_on_launch = true

  tags = {
    Name = "gog-public-1c"
  }
}
resource "aws_subnet" "gog-private-1a" {
  vpc_id                  = aws_vpc.gog-vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "ap-northeast-1a"
  map_public_ip_on_launch = true

  tags = {
    Name = "gog-private-1a"
  }
}
resource "aws_subnet" "gog-private-1c" {
  vpc_id                  = aws_vpc.gog-vpc.id
  cidr_block              = "10.0.3.0/24"
  availability_zone       = "ap-northeast-1c"
  map_public_ip_on_launch = true

  tags = {
    Name = "gog-private-1c"
  }
}

resource "aws_db_subnet_group" "gog-rds-subnet-group" {
  name        = "gog-rds-subnet-group"
  subnet_ids  = [aws_subnet.gog-private-1a.id, aws_subnet.gog-private-1c.id]
}