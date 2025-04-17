<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Video>
 */
class VideoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'thumbnailUrl' => $this->faker->imageUrl(),
            'duration' => $this->faker->time('i:s'),
            'uploadTime' => now(),
            'views' => $this->faker->numberBetween(100, 10000000),
            'author' => $this->faker->name,
            'videoUrl' => $this->faker->url,
            'subscriber' => $this->faker->numberBetween(100, 10000000),
            'isLive' => $this->faker->boolean
        ];
    }
}
