<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Video;

use Illuminate\Http\Request;


class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('videos');
    }

    /**
     * Search the specific keyword from the table
     */
    public function search(Request $request)
    {
        $query = $request->input('query');
        return response()->json([ 'data' => Video::where('title', 'like', "%$query%")
                    ->orWhere('description', 'like', "%$query%")
                    ->get()
        ]);
    }

    /**
     * List the data.
     */
    public function list()
    {
        return response()->json([
                    'data' => Video::all()
            ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
