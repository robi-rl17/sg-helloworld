terraform {
  backend "s3" {
    bucket         = "tf-state-aws-helloworld1"
    key            = "aws-helloworld/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "tf-state-aws-helloworld-lock"
    encrypt        = true
  }
}