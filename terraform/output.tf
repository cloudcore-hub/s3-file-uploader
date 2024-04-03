output "s3_bucket_name" {
  value = aws_s3_bucket.upload_bucket
}

output "lambda_function_name" {
  value = aws_lambda_function.file_processing_function
}

output "lambda_function_arn" {
  value = aws_lambda_function.file_processing_function.arn
}

output "iam_role_arn" {
  value = aws_iam_role.iam-role.arn
}
