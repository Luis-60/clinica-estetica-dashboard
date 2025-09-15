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
        Schema::create('pacientes', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->date('data_nasc');
            $table->string('endereco');
            $table->string('telefone', 20);
            $table->enum('sexo', ['masculino', 'feminino']);
            $table->string('rede_social');
            
            $table->integer('usuarios_id')->unsigned();
            $table->foreign('usuarios_id')->references('id')->on('usuarios')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pacientes');
    }
};
