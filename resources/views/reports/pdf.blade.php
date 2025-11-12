<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Reports Summary</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; color: #333; }
        h1 { text-align: center; color: #4F46E5; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f3f4f6; }
        .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #777; }
    </style>
</head>
<body>
    <h1>📊 Real Estate CRM — Reports Summary</h1>

    <table>
        <tr><th>Metric</th><th>Value</th></tr>
        <tr><td>Total Leads</td><td>{{ $data['leads'] }}</td></tr>
        <tr><td>Qualified Leads</td><td>{{ $data['qualified'] }}</td></tr>
        <tr><td>Total Properties</td><td>{{ $data['properties'] }}</td></tr>
        <tr><td>Sold Properties</td><td>{{ $data['sold'] }}</td></tr>
        <tr><td>Total Agents</td><td>{{ $data['agents'] }}</td></tr>
    </table>

    <div class="footer">
        Generated on {{ now()->format('d M Y, h:i A') }} |
        © {{ date('Y') }} Aspiration Realty CRM
    </div>
</body>
</html>
