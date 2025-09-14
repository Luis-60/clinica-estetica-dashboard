<?php

namespace App\Exports;

use App\Models\Artigo;
use Maatwebsite\Excel\Concerns\FromCollection;

class ArtigosExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Artigo::all();
    }
}
