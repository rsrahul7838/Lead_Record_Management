<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Lead;
use App\Models\Property;
use App\Models\User;
use Carbon\Carbon;
use DB;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;

class ReportController extends Controller
{
    public function index()
    {
        $leadsPerMonth = Lead::select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('COUNT(*) as total')
            )
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(function ($item) {
                return [
                    'month' => Carbon::create()->month($item->month)->format('M'),
                    'total' => $item->total
                ];
            });

        $totalLeads = Lead::count();
        $qualifiedLeads = Lead::where('status', 'Qualified')->count();
        $conversionRate = $totalLeads > 0 ? round(($qualifiedLeads / $totalLeads) * 100, 2) : 0;

        $salesByProject = Property::select('name', DB::raw('COUNT(*) as sold_count'))
            ->where('status', 'Sold')
            ->groupBy('name')
            ->get();

        $salesByAgent = User::role('Agent')
            ->withCount(['properties as sold_count' => function ($q) {
                $q->where('status', 'Sold');
            }])
            ->get(['id', 'name']);

        $revenueData = Property::select(
                DB::raw('MONTH(updated_at) as month'),
                DB::raw('SUM(price) as total_revenue')
            )
            ->where('status', 'Sold')
            ->where('updated_at', '>=', now()->subMonths(6))
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(function ($item) {
                return [
                    'month' => Carbon::create()->month($item->month)->format('M'),
                    'revenue' => $item->total_revenue
                ];
            });

        return Inertia::render('Reports/Index', [
            'leadsPerMonth' => $leadsPerMonth,
            'conversionRate' => $conversionRate,
            'salesByProject' => $salesByProject,
            'salesByAgent' => $salesByAgent,
            'revenueData' => $revenueData,
        ]);
    }

    // ✅ Export Excel
    public function exportExcel()
    {
        $fileName = 'reports_' . now()->format('Ymd_His') . '.xlsx';
        return Excel::download(new \App\Exports\ReportsExport, $fileName);
    }

    // ✅ Export PDF
    public function exportPDF()
    {
        $data = [
            'leads' => Lead::count(),
            'qualified' => Lead::where('status', 'Qualified')->count(),
            'properties' => Property::count(),
            'sold' => Property::where('status', 'Sold')->count(),
            'agents' => User::role('Agent')->count(),
        ];

        $pdf = Pdf::loadView('reports.pdf', compact('data'));
        return $pdf->download('reports_' . now()->format('Ymd_His') . '.pdf');
    }
}
