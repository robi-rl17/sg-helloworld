output "upload_bucket_name" {
  description = "Name of the S3 bucket for file uploads"
  value       = aws_s3_bucket.messages_upload_bucket.bucket
}

output "api_endpoint" {
  description = "URL of the API Gateway endpoint"
  value       = "${aws_api_gateway_deployment.api_deployment.invoke_url}${aws_api_gateway_resource.message_resource.path}"
}

output "dynamodb_table_name" {
  description = "Name of the DynamoDB table"
  value       = aws_dynamodb_table.messages_table.name
}

output "api_key_value" {
  description = "API Key for the API Gateway"
  value       = aws_api_gateway_api_key.api_key.value
  sensitive   = true
}