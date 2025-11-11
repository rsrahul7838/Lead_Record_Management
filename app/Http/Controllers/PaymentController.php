<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Property;
use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class PaymentController extends Controller
{
    /**
     * Display all payments with property & client info.
     */
    public function index(Request $request)
    {
        $query = Payment::with(['property', 'client']);

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->whereHas('property', fn($q) => $q->where('name', 'like', "%$search%"))
                ->orWhereHas('client', fn($q) => $q->where('name', 'like', "%$search%"));
        }

        if ($request->filled('mode')) {
            $query->where('payment_mode', $request->mode);
        }

        $payments = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Payments/Index', [
            'payments' => $payments,
            'filters' => $request->only(['search', 'mode']),
            'flash' => session()->only(['success']),
        ]);
    }


    /**
     * Show create payment form.
     */
    public function create()
    {
        return Inertia::render('Payments/Create', [
            'properties' => Property::select('id', 'name')->get(),
            'clients' => Client::select('id', 'name')->get(),
        ]);
    }

    /**
     * Store new payment record.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'property_id' => 'required|exists:properties,id',
            'client_id'   => 'required|exists:clients,id',
            'amount'      => 'required|numeric|min:1',
            'payment_date' => 'required|date',
            'payment_mode' => 'required|string',
            'remarks'     => 'nullable|string',
            'receipt'     => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        // ✅ handle file upload
        if ($request->hasFile('receipt')) {
            $validated['receipt_path'] = $request->file('receipt')->store('receipts', 'public');
        }

        Payment::create($validated);

        return redirect()
            ->route('payments.index')
            ->with('success', '💰 Payment added successfully!');
    }

    /**
     * Show edit form with prefilled data.
     */
    public function edit(Payment $payment)
    {
        return Inertia::render('Payments/Edit', [
            'payment'    => $payment->load(['property', 'client']),
            'properties' => Property::select('id', 'name')->get(),
            'clients'    => Client::select('id', 'name')->get(),
        ]);
    }

    /**
     * Update existing payment record.
     */
    public function update(Request $request, Payment $payment)
    {
        $validated = $request->validate([
            'property_id' => 'required|exists:properties,id',
            'client_id'   => 'required|exists:clients,id',
            'amount'      => 'required|numeric|min:1',
            'payment_date' => 'required|date',
            'payment_mode' => 'required|string',
            'remarks'     => 'nullable|string',
            'receipt'     => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        // ✅ If new receipt uploaded, replace old one
        if ($request->hasFile('receipt')) {
            // delete old file if exists
            if ($payment->receipt_path && Storage::disk('public')->exists($payment->receipt_path)) {
                Storage::disk('public')->delete($payment->receipt_path);
            }

            $validated['receipt_path'] = $request->file('receipt')->store('receipts', 'public');
        }

        $payment->update($validated);

        return redirect()
            ->route('payments.index')
            ->with('success', '✅ Payment updated successfully!');
    }

    /**
     * Delete a payment and its uploaded receipt file.
     */
    public function destroy(Payment $payment)
    {
        if ($payment->receipt_path && Storage::disk('public')->exists($payment->receipt_path)) {
            Storage::disk('public')->delete($payment->receipt_path);
        }

        $payment->delete();

        return redirect()
            ->route('payments.index')
            ->with('success', '🗑️ Payment deleted successfully!');
    }

    /**
     * Generate and stream a PDF invoice for a payment.
     */
    public function invoice($id)
    {
        $payment = Payment::with(['property', 'client'])->findOrFail($id);

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.invoice', compact('payment'))
            ->setPaper('A4', 'portrait');

        // ✅ Tell the browser this is a PDF file
        return response($pdf->output(), 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="Invoice_' . $payment->id . '.pdf"')
            ->header('Cache-Control', 'private, max-age=0, must-revalidate')
            ->header('Pragma', 'public');
    }
}
