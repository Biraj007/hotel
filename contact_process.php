<?php
// ADB Kanvas Contact Form Handler

// Set your email address
$to = "adbkanvas@adbgroup.in";

// Sanitize and validate inputs
$name = isset($_REQUEST['name']) ? htmlspecialchars(strip_tags(trim($_REQUEST['name']))) : '';
$from = isset($_REQUEST['email']) ? filter_var(trim($_REQUEST['email']), FILTER_SANITIZE_EMAIL) : '';
$subject_input = isset($_REQUEST['subject']) ? htmlspecialchars(strip_tags(trim($_REQUEST['subject']))) : 'General Inquiry';
$number = isset($_REQUEST['number']) ? htmlspecialchars(strip_tags(trim($_REQUEST['number']))) : '';
$cmessage = isset($_REQUEST['message']) ? htmlspecialchars(strip_tags(trim($_REQUEST['message']))) : '';

// Validate required fields
if (empty($name) || empty($from) || empty($cmessage)) {
	http_response_code(400);
	echo json_encode(['status' => 'error', 'message' => 'Please fill all required fields.']);
	exit;
}

// Validate email format
if (!filter_var($from, FILTER_VALIDATE_EMAIL)) {
	http_response_code(400);
	echo json_encode(['status' => 'error', 'message' => 'Please enter a valid email address.']);
	exit;
}

// Email headers
$headers = "From: ADB Kanvas Website <noreply@adbkanvas.com>\r\n";
$headers .= "Reply-To: " . $from . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// Email subject
$subject = "New Contact Form Inquiry - ADB Kanvas";

// Build HTML email body
$body = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>New Contact Inquiry</title></head><body>";
$body .= "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;'>";
$body .= "<h2 style='color: #96783d; border-bottom: 2px solid #96783d; padding-bottom: 10px;'>New Contact Form Submission</h2>";
$body .= "<table style='width: 100%; border-collapse: collapse;'>";
$body .= "<tr><td style='padding: 10px; border-bottom: 1px solid #eee;'><strong>Name:</strong></td><td style='padding: 10px; border-bottom: 1px solid #eee;'>{$name}</td></tr>";
$body .= "<tr><td style='padding: 10px; border-bottom: 1px solid #eee;'><strong>Email:</strong></td><td style='padding: 10px; border-bottom: 1px solid #eee;'>{$from}</td></tr>";
$body .= "<tr><td style='padding: 10px; border-bottom: 1px solid #eee;'><strong>Phone:</strong></td><td style='padding: 10px; border-bottom: 1px solid #eee;'>{$number}</td></tr>";
$body .= "<tr><td style='padding: 10px; border-bottom: 1px solid #eee;'><strong>Subject:</strong></td><td style='padding: 10px; border-bottom: 1px solid #eee;'>{$subject_input}</td></tr>";
$body .= "<tr><td style='padding: 10px; vertical-align: top;'><strong>Message:</strong></td><td style='padding: 10px;'>" . nl2br($cmessage) . "</td></tr>";
$body .= "</table>";
$body .= "<p style='margin-top: 20px; font-size: 12px; color: #888;'>This message was sent from the ADB Kanvas website contact form.</p>";
$body .= "</div></body></html>";

// Send email
$send = mail($to, $subject, $body, $headers);

// Return response
header('Content-Type: application/json');
if ($send) {
	echo json_encode(['status' => 'success', 'message' => 'Thank you! Your message has been sent successfully.']);
} else {
	http_response_code(500);
	echo json_encode(['status' => 'error', 'message' => 'Sorry, there was an error sending your message. Please try again.']);
}
