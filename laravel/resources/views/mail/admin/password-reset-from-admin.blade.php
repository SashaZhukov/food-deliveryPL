<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f7f7f7;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .email-container {
            background-color: #ffffff;
            width: 100%;
            max-width: 600px;
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            height: auto;
        }

        .email-header {
            margin-bottom: 15px;
        }

        .logo {
            font-size: 32px;
            font-weight: bold;
            color: #4CAF50; /* Светло-зеленый цвет */
            letter-spacing: 2px;
            text-align: center;
        }

        .email-body {
            color: #333333;
        }

        .email-body h1 {
            font-size: 22px;
            color: #333333;
            margin-bottom: 10px;
        }

        .email-body p {
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 15px;
        }

        .button {
            background-color: #4CAF50; /* Зеленый цвет, как логотип */
            color: white;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            display: inline-block;
            margin-top: 15px;
        }

        .button:hover {
            background-color: #45a049;
        }

        .email-footer {
            margin-top: 15px;
            font-size: 12px;
            color: #888888;
        }

        /* Стиль для мобильных устройств */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 90% !important;
                padding: 10px;
            }

            .button {
                width: 100% !important;
                padding: 12px;
            }
        }
    </style>
</head>
<body>

<div class="email-container">
    <div class="email-header">
        <div class="logo">FoodlyGo</div>
    </div>

    <div class="email-body">
        <h1>Password Reset Request</h1>
        <p>We received a request to reset your password. Click the button below to create a new password for your account.</p>
        <a href="{{ $resetLink }}" class="button">Reset Your Password</a>
    </div>

    <div class="email-footer">
        <p>If you didn't request a password reset, please ignore this email.</p>
    </div>
</div>

</body>
</html>
