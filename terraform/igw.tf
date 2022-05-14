resource "aws_internet_gateway" "gog-igw" {
  vpc_id = aws_vpc.gog-vpc.id

  tags = {
    Name = "gog-igw"
  }
}