terraform {
    required_providers {
      aws = {
        source = "hashicorp/aws"
        version = ">=5.25"
      }
    }
  backend "remote" {
    organization = "Christyl-new"

    workspaces {
      name = "s3-uploader-new"
    }
  }
  required_version = ">=1.6.3"
}

provider "aws" {
  region = var.region
}