resource "aws_route_table" "gog-front-rtb" {
  vpc_id = aws_vpc.gog-vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gog-igw.id
  }

  tags = {
    Name = "gog-front-rtb"
  }
}

resource "aws_route_table" "gog-back-rtb" {
  vpc_id = aws_vpc.gog-vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gog-igw.id
  }

  tags = {
    Name = "gog-back-rtb"
  }
}

resource "aws_route_table_association" "gog-front-rtb-1a" {
  subnet_id      = aws_subnet.gog-public-1a.id
  route_table_id = aws_route_table.gog-front-rtb.id
}
resource "aws_route_table_association" "gog-front-rtb-1c" {
  subnet_id      = aws_subnet.gog-public-1c.id
  route_table_id = aws_route_table.gog-front-rtb.id
}
resource "aws_route_table_association" "gog-back-rtb-1a" {
  subnet_id      = aws_subnet.gog-private-1a.id
  route_table_id = aws_route_table.gog-back-rtb.id
}
resource "aws_route_table_association" "gog-back-rtb-1c" {
  subnet_id      = aws_subnet.gog-private-1c.id
  route_table_id = aws_route_table.gog-back-rtb.id
}