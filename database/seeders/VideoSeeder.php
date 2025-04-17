<?php

namespace Database\Seeders;
use App\Models\Video;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class VideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get(database_path('dump\sample_videos.json'));
        $videos = json_decode($json, true);

        foreach ($videos as $video) {
            Video::create($video);
        }
    }
}
