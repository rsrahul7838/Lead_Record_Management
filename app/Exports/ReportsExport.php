<?php

namespace App\Exports;

use App\Models\Lead;
use App\Models\Property;
use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Carbon\Carbon;
use DB;

class ReportsExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        $leadsCount = Lead::count();
        $qualifiedCount = Lead::where('status', 'Qualified')->count();
        $soldProperties = Property::where('status', 'Sold')->count();
        $totalAgents = User::role('Agent')->count();

        return collect([
            ['Total Leads', $leadsCount],
            ['Qualified Leads', $qualifiedCount],
            ['Sold Properties', $soldProperties],
            ['Total Agents', $totalAgents],
            ['Generated On', Carbon::now()->format('d M Y, h:i A')],
        ]);
    }

    public function headings(): array
    {
        return ['Metric', 'Value'];
    }
}
