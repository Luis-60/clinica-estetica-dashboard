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
        Schema::create('pacientes_alergias', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pacientes_id');
            $table->index('pacientes_id');
            $table->foreign('pacientes_id')->references('id')->on('pacientes')->onDelete('cascade');
            $table->unsignedBigInteger('alergias_id');
            $table->index('alergias_id');
            $table->foreign('alergias_id')->references('id')->on('alergias')
                ->onDelete('cascade');
                
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pacientes_alergias');
    }
};
