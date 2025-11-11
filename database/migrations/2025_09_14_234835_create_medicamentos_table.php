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
        Schema::create('medicamentos', function (Blueprint $table) {
            $table->id();
            $table->string('nome', 255)->unique();
            $table->text('descricao')->nullable();
            $table->decimal('valor', 8, 2);
            $table->integer('estoque');
            $table->string('imagem', 255)->nullable();
            $table->unsignedBigInteger('categorias_id');
            $table->index('categorias_id');
            $table->foreign('categorias_id')->references('id')->on('categorias_medicamentos')->onDelete('cascade');
            $table->unsignedBigInteger('marcas_id');
            $table->index('marcas_id');
            $table->foreign('marcas_id')->references('id')->on('marcas_medicamentos')->onDelete('cascade');
                
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medicamentos');
    }
};
