<?php

namespace App\Exports;

use App\Production;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;

class ProductionExport implements FromCollection
{
    use Exportable;

    public function collection()
    {
        return Production::all();
    }
}