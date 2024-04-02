resource "aws_s3_bucket" "upload_bucket" {
  bucket = "my-upload-bucket"
  acl    = "private"

  versioning {
    enabled = true
  }

  # Add your own CORS, logging, or other bucket configurations here
}