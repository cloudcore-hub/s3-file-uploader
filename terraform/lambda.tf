resource "aws_lambda_function" "file_processing_function" {
  function_name = "fileProcessingFunction"
  handler       = "index.lambda_handler"
  runtime       = "python3.11"
  role          = aws_iam_role.lambda_exec_role.arn

  # Assuming your Lambda code is zipped and stored as "lambda_function_payload.zip"
  filename         = "lambda_function_payload.zip"
  source_code_hash = filebase64sha256("lambda_function_payload.zip")
}
