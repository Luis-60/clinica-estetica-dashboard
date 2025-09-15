<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fichas_anamnese', function (Blueprint $table) {
            $table->id();
            $table->boolean('lente_contato')->default(false);
            $table->boolean('epilepsia_convulsoes')->default(false);
            $table->boolean('funciona_instest_reg')->default(false);
            $table->boolean('trat_facial_anterior')->default(false);
            $table->boolean('agua_freq')->default(false);
            $table->boolean('bebida_alcool')->default(false);
            $table->boolean('filtro_solar')->default(false);
            $table->boolean('periodo_menstrual')->default(false);
            $table->boolean('boa_qual_sono')->default(false);
            $table->boolean('protese_corpo_fac')->default(false);
            $table->boolean('tabagismo')->default(false);
            $table->boolean('alteracoes_cardiacas')->default(false);
            $table->boolean('portador_marcapasso')->default(false);
            $table->boolean('gestante')->default(false);
            $table->boolean('problema_pele')->default(false);
            $table->boolean('tratamento_medico')->default(false);
            $table->boolean('tumor_lesao_cancer')->default(false);
            $table->boolean('boa_alimentacao')->default(false);
            $table->string('horas_por_noite', 100)->nullable();
            $table->string('qual_anticoncepcional', 100)->nullable();
            $table->string('tempo_gestante', 100)->nullable();
            $table->text('motivo_estetico')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fichas_anamnese');
    }
};
