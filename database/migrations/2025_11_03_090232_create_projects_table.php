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
        Schema::create('projects', function (Blueprint $table) {
           $table->id();
        $table->string('name');
        $table->text('description')->nullable();
        $table->unsignedBigInteger('owner_id'); // user who created it
        $table->date('start_date')->nullable();
        $table->date('end_date')->nullable();
        $table->enum('status', ['Pending', 'In Progress', 'Completed'])->default('Pending');
        $table->timestamps();

        $table->foreign('owner_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
