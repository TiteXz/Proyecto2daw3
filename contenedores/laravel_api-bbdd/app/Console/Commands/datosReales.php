<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\datosbbddController;

class datosReales extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:datos-reales';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $controladorBBDD = new datosbbddController();
        $controladorBBDD -> datosHistoricos();

        $this->info('Municipios importados y mediciones reales tomadas');
    }
}
