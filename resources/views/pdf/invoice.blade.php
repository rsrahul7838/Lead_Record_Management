<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Invoice #{{ $payment->id }}</title>
    <style>
        @page { margin: 25px; }
        body {
            font-family: DejaVu Sans, sans-serif;
            color: #333;
            font-size: 13px;
            line-height: 1.4;
        }

        .invoice-box {
            width: 100%;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
        }

        .header {
            text-align: center;
            border-bottom: 2px solid #007bff;
            padding-bottom: 8px;
            margin-bottom: 12px;
        }

        .header h1 {
            font-size: 22px;
            color: #007bff;
            margin: 0;
        }

        .header p {
            margin: 2px 0;
            color: #666;
            font-size: 12px;
        }

        .invoice-info {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            margin-bottom: 15px;
        }

        .section-title {
            font-size: 14px;
            font-weight: bold;
            color: #007bff;
            margin: 10px 0 6px 0;
            border-bottom: 1px solid #007bff;
            padding-bottom: 3px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
        }

        th, td {
            padding: 6px 8px;
            border: 1px solid #ccc;
            font-size: 13px;
        }

        th {
            background: #f7f9fc;
            text-align: left;
        }

        .amount {
            font-size: 15px;
            font-weight: bold;
            color: #28a745;
        }

        .signature {
            margin-top: 20px;
            text-align: right;
        }

        .signature p {
            margin-bottom: 40px;
            font-size: 13px;
        }

        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 11px;
            color: #777;
            border-top: 1px solid #ccc;
            padding-top: 8px;
        }

        /* Prevent page break for critical sections */
        .no-break {
            page-break-inside: avoid;
        }

        .company-logo {
            width: 80px;
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <div class="invoice-box">
        <!-- Header -->
        <div class="header">
            <img src="{{ public_path('images/logo.png') }}" class="company-logo" alt="Company Logo">
            <h1>Lead Realty Pvt. Ltd.</h1>
            <p>Twintower, Greater Noida, G.B. Nagar, India</p>
            <p>📞 +91 9818820710 | ✉️ info@aspirationrealty.com</p>
        </div>

        <!-- Invoice Info -->
        <div class="invoice-info">
            <div>
                <strong>Invoice #: </strong> INV-{{ str_pad($payment->id, 4, '0', STR_PAD_LEFT) }}<br>
                <strong>Date:</strong> {{ \Carbon\Carbon::parse($payment->payment_date)->format('d M, Y') }}
            </div>
            <div style="text-align:right;">
                <strong>Generated For:</strong><br>
                {{ $payment->client->name ?? '—' }}<br>
                {{ $payment->client->email ?? '' }}
            </div>
        </div>

        <!-- Client Info -->
        <div class="no-break">
            <div class="section-title">Client Information</div>
            <table>
                <tr><th>Name</th><td>{{ $payment->client->name ?? '—' }}</td></tr>
                <tr><th>Email</th><td>{{ $payment->client->email ?? '—' }}</td></tr>
                <tr><th>Phone</th><td>{{ $payment->client->phone ?? '—' }}</td></tr>
            </table>
        </div>

        <!-- Property Info -->
        <div class="no-break">
            <div class="section-title">Property Details</div>
            <table>
                <tr><th>Property</th><td>{{ $payment->property->name ?? '—' }}</td></tr>
                <tr><th>Location</th><td>{{ $payment->property->location ?? '—' }}</td></tr>
                <tr><th>Type</th><td>{{ $payment->property->type ?? '—' }}</td></tr>
            </table>
        </div>

        <!-- Payment Info -->
        <div class="no-break">
            <div class="section-title">Payment Details</div>
            <table>
                <tr><th>Payment Mode</th><td>{{ ucfirst($payment->payment_mode) }}</td></tr>
                <tr><th>Amount</th><td class="amount">₹{{ number_format($payment->amount, 2) }}</td></tr>
                <tr><th>Remarks</th><td>{{ $payment->remarks ?? '—' }}</td></tr>
            </table>
        </div>

        <!-- Signature -->
        <div class="signature">
            <p>Authorized Signatory</p>
            <strong>__________________________</strong><br>
            <span>For Aspiration Realty Pvt. Ltd.</span>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Thank you for your payment! Please retain this invoice for your records.</p>
            <p><em>This is a system-generated document and does not require a physical signature.</em></p>
        </div>
    </div>
</body>
</html>
