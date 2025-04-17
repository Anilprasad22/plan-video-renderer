<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\Video;
use Tests\TestCase;
use App\Models\User;

class VideoTest extends TestCase
{
    public function test_all_videos_are_returned()
    {
        $user = User::factory()->create();

        $videos = Video::factory()->count(3)->create();

        $this->actingAs($user);

        $response = $this->getJson('/list-videos');

        $response->assertStatus(200)
                ->assertJsonCount(3, 'data');   
        Video::destroy($videos->pluck('id'));
    }

    public function test_returns_videos_matching_search_query()
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        // Arrange
        $video1 = Video::factory()->create([
            'title' => 'Laravel Testing',
            'description' => 'Learn to test controllers in Laravel.'
        ]);

        $video2 = Video::factory()->create([
            'title' => 'Vue Basics',
            'description' => 'Frontend course.'
        ]);
        $videoIds = [$video1->id, $video2->id];

        // Act
        $response = $this->getJson('/videos/search?query=Laravel');

        // Assert
        $response->assertStatus(200)
                 ->assertJsonCount(1, 'data')
                 ->assertJsonFragment(['title' => 'Laravel Testing']);

        Video::destroy($videoIds);
    }

    public function test_returns_empty_when_no_videos_match_search_query()
    {
        $user = User::factory()->create();

        $this->actingAs($user);
        // Arrange
        $video = Video::factory()->create([
            'title' => 'React Basics',
            'description' => 'Some frontend stuff'
        ]);

        // Act
        $response = $this->getJson('/videos/search?query=Python');

        // Assert
        $response->assertStatus(200)
                 ->assertJsonCount(0, 'data');
        Video::destroy($video->pluck('id'));
    }
}
