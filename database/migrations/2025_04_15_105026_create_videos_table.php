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
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('thumbnailUrl');
            $table->string('duration');
            $table->string('uploadTime');
            $table->string('views');
            $table->string('author');
            $table->string('videoUrl');
            $table->longText('description');
            $table->string('subscriber');
            $table->boolean('isLive');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('videos');
    }
};
