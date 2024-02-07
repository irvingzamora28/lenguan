<!DOCTYPE html>
<html>

<head>
    <title>Feedback Form Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            background-color: #ffffff;
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding:

                20px;
        }

        .header {
            background-color: #007bff;
            color: white;
            padding: 10px;
            text-align: center;
        }

        .content {
            padding: 20px;
        }

        .footer {
            background-color: #007bff;
            color: white;
            text-align: center;
            padding: 10px;
        }

        @media only screen and (max-width: 600px) {
            .container {
                width: 100%;
                padding: 10px;
            }
        }
    </style>

</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Feedback Form Submission</h1>
        </div>
        <div class="content">
            @if (isset($data['usability']))
                <p><strong>Usability:</strong> {{ $data['usability'] }}</p>
            @endif
            @if (isset($data['feature_request']))
                <p><strong>Feature Request:</strong> {{ $data['feature_request'] }}</p>
            @endif
            @if (isset($data['learning_materials']))
                <p><strong>Learning Materials:</strong> {{ $data['learning_materials'] }}</p>
            @endif
            @if (isset($data['new_languages']))
                <p><strong>New Languages:</strong> {{ $data['new_languages'] }}</p>
            @endif
            @if (isset($data['course_pace']))
                <p><strong>Course Pace:</strong> {{ $data['course_pace'] }}</p>
            @endif
            @if (isset($data['general_feedback']))
                <p><strong>General Feedback:</strong> {{ $data['general_feedback'] }}</p>
            @endif
        </div>
        <div class="footer">
            © {{ date('Y') }} Lenguan
        </div>
    </div>
</body>

</html>
