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
            $table->integer('pacientes_id')->unsigned();
            $table->foreign('pacientes_id')->references('id')->on('pacientes')
                ->onDelete('cascade');
            $table->integer('alergias_id')->unsigned();
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
