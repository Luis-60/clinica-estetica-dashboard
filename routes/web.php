<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UsuariosController;
use App\Http\Controllers\AutoresController;
use App\Http\Controllers\ArtigosController;
use App\Http\Controllers\ArtigosSeacController;
use App\Http\Controllers\AreasController;
use App\Http\Controllers\CicloController;
use App\Http\Controllers\AvaliadoresController;
use App\Http\Controllers\CoordenadoresController;
use App\Http\Controllers\AvaliacaoController;
use App\Http\Controllers\OrientadoresController;
use App\Http\Controllers\EventosController;
use App\Models\Usuario;
use App\Models\TipoUsuario;
use App\Models\Modalidade;
use App\Models\Curso;
use App\Models\Area;
use App\Models\Periodo;
use App\Services\AreasTematicasService;
use App\Services\OrientadorService;
use App\Services\ModalidadeService;
use App\Services\UsuariosService;
use App\Services\AutorService;
use App\Http\Controllers\Auth\EmailConfirmacaoController;
use App\Http\Controllers\ConfirmacaoAutoriaController;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [EventosController::class, 'menu'])->name('dashboard');
    // Administrador 
    Route::middleware(['auth', 'role:Administrador SEGET|Administrador SEAC'])->group(function () {
        // Eventos
        Route::controller(EventosController::class)->group(function () {
            Route::get('eventos', 'index')->name('eventos.index');
            Route::get('/gerir-evento/{evento}', 'gerirEvento')->name('gerir-evento');
            Route::post('eventos', 'store')->name('eventos.store');
            Route::post('eventos/documentos', 'documentoStore')->name('eventos.documentos.store');
            Route::put('eventos/documentos', 'documentoUpdate')->name('eventos.documentos.update');
            Route::delete('eventos/documentos', 'documentoDestroy')->name('eventos.documentos.destroy');
        });

        // Artigos 
        Route::controller(ArtigosController::class)->group(function () {
            Route::get('artigos', 'index')->name('artigos.index');
        });

        // Ciclos
        Route::controller(CicloController::class)->group(function () {
            Route::post('ciclo-evento', 'storeCicloEvento')->name('cicloEvento.store');
            Route::get('ciclo-evento/{id}', 'showCicloEvento')->name('cicloEvento.show');
        });
    
        // Áreas 
        Route::controller(AreasController::class)->group(function () {
            Route::get('/areas', 'index')->name('areas.index');
        });
        
        
        // Avaliadores
        Route::controller(AvaliadoresController::class)->group(function () {
            Route::get('avaliadores', 'index')->name('avaliadores.index');
            Route::delete('avaliadores/{id}', 'destroy')->name('avaliadores.destroy');
        });

        // Orientadores
        Route::controller(OrientadoresController::class)->group(function () {
            Route::delete('orientadores/{id}', 'destroy')->name('orientadores.destroy');
            Route::get('orientadores', 'index')->name('orientadores.index');
            Route::post('orientadores', 'store')->name('orientadores.store');
            Route::post('orientadores/csv', 'storeCsv')->name('orientadores.store_csv');
        });
        
        // Autores 
        Route::controller(AutoresController::class)->group(function () {
            Route::get('autores', 'index')->name('autores.index');
        });
        
        // Coordenadores 
        Route::controller(CoordenadoresController::class)->group(function () {
            Route::get('coordenadores', 'index')->name('coordenadores.index');
            Route::post('coordenadores', 'store')->name('coordenadores.store');
            Route::delete('coordenadores/{id}', 'destroy')->name('coordenadores.destroy');
        });
        
        
    });
    
    // Função Designar Artigo
    Route::middleware(['auth', 'role:Administrador SEGET|Administrador SEAC|Coordenador'])->group(function () {
        Route::controller(AvaliacaoController::class)->group(function () {
            Route::get('/designar-avaliador', 'designarAvaliador')->name('designarAvaliador.index');
        });
    });

    // Artigos Routes
    Route::controller(ArtigosController::class)->group(function () {
        Route::get('artigos', 'index')->name('artigos.index');
        Route::get('artigos/create', 'create')->name('artigos.create');
        Route::get('artigos/{artigo}', 'show')->name('artigos.show');
        Route::get('artigos/{artigo}/details', 'details')->name('artigos.details');
        Route::get('artigos/{artigo}/details/{tipo}', 'details')->name('artigos.details.tipo');

        Route::get('/gerir-artigo/{artigo}', 'gerirArtigo')->name('gerir-artigo');

        Route::get('/novo-artigo', function () {
            return Inertia::render('novo-artigo/index');
        })->name('novo-artigo');

        Route::delete('artigos/{artigo}', 'destroy')->name('artigos.destroy');
        Route::post('artigos', 'store')->name('artigos.store');
        Route::put('artigos', 'update')->name('artigos.update');
    });


    Route::controller(EventosController::class)->group(function () {
        Route::get('evento/{evento}', 'detail')->name('evento.detail');
        Route::get('eventos/{evento}/edit', 'edit')->name('eventos.edit');
        Route::put('eventos/{evento}', 'update')->name('eventos.update');
        Route::delete('eventos/{evento}', 'destroy')->name('eventos.destroy');
    });

    Route::get('menu', [EventosController::class, 'menu'])->name('menu');

    Route::controller(AutoresController::class)->group(function () {
        Route::get('autores', 'index')->name('autores.index');
    });


    Route::controller(AvaliadoresController::class)->group(function () {
        Route::get('/avaliar-artigo/{avaliador}', 'avaliarArtigo')->name('avaliarArtigo.index');


        Route::get('/novo-artigo-seac/{evento}', function ($eventoId, AreasTematicasService $areasTematicasService, ModalidadeService $modalidadesService, OrientadorService $orientadorService, UsuariosService $usuariosService, AutorService $autorService) {
            $areas = $areasTematicasService->listarAreasSeac();
            $modalidades = $modalidadesService->listarModalidade();
            $usuarios = $usuariosService->listarUsuariosSeac();
            $orientador = $orientadorService->listarOrientadores();
            $autor = $autorService->listarAutoresSeac();
            return Inertia::render('novo-artigo-seac/index', [
                'areas' => $areas,
                'modalidades' => $modalidades,
                'usuariosDisponiveis' => $usuarios,
                'orientador' => $orientador,
                'autor' => $autor,
                'eventoId' => $eventoId,
            ]);
        })->name('novo-artigo-seac');

        Route::post('avaliacao', [AvaliacaoController::class, 'store'])->name('avaliacao.store');
        Route::post('/avaliacao/update-seac/{id}', [AvaliacaoController::class, 'updateSeac'])->name('avaliacao.updateSeac');
        Route::delete('avaliacao/{id}', [AvaliacaoController::class, 'destroy'])->name('avaliacao.destroy');

        Route::get('/novo-artigo-seget/{evento}', function ($eventoId) {
            $areas = Area::where('seget', true)->get()->toArray();
            $modalidades = Modalidade::all();
            $orientador = Usuario::whereHas('tipos', function ($query) {
                $query->where('tipos_id', TipoUsuario::ORIENTADOR);
            })->pluck('nome')->toArray();
            $usuariosDisponiveis = Usuario::get(['id', 'nome', 'email']);

            return Inertia::render('novo-artigo-seget/index', [
                'areas' => $areas,
                'orientador' => $orientador,
                'modalidades' => $modalidades,
                'usuariosDisponiveis' => $usuariosDisponiveis,
                'eventoId' => $eventoId,
            ]);
        })->name('novo-artigo-seget');
    });
    // Rotas de artigos SEAC
    Route::controller(App\Http\Controllers\ArtigosSeacController::class)->group(function () {
        Route::get('/artigos-seac', 'index')->name('artigos-seac.index');
        Route::post('/artigos-seac', 'store')->name('artigos-seac.store');
    });
});

// Rota de confirmação de autoria (sem middleware auth para funcionar via email)
Route::get('/confirmar-autoria/{artigo}/{autor}/{token}', [ConfirmacaoAutoriaController::class, 'confirmarAutoria'])
    ->name('confirmar.autoria');

// Rota de confirmação de orientação (sem middleware auth para funcionar via email)
Route::get('/confirmar-orientacao/{artigo}/{orientador}/{token}', [ConfirmacaoAutoriaController::class, 'confirmarOrientacao'])
    ->name('confirmar.orientacao');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

Route::get('/confirmacao', [EmailConfirmacaoController::class, 'confirmar'])->name('email.confirmar');
