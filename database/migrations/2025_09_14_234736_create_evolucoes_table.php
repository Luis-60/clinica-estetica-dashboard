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
        Schema::create('evolucoes', function (Blueprint $table) {
            $table->id();
            $table->date('data');
            $table->text('observacoes')->nullable();

            $table->unsignedBigInteger('procedimentos_id');
            $table->index('procedimentos_id');
            $table->foreign('procedimentos_id')->references('id')->on('procedimentos')->onDelete('cascade');

            $table->unsignedBigInteger('pacientes_id');
            $table->index('pacientes_id');
            $table->foreign('pacientes_id')->references('id')->on('pacientes')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evolucoes');
    }
};
