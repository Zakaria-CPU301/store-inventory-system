<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Main/Product', [
            'datas' => [
                [
                    'name' => 'zaka',
                    'age' => 18
                ],
                [
                    'name' => 'hana',
                    'age' => 17
                ],
                [
                    'name' => 'ines',
                    'age' => 16
                ],
                [
                    'name' => 'ines',
                    'age' => 16
                ],
                [
                    'name' => 'ines',
                    'age' => 16
                ],
                [
                    'name' => 'ines',
                    'age' => 16
                ],
                [
                    'name' => 'ines',
                    'age' => 16
                ],
                [
                    'name' => 'ines',
                    'age' => 16
                ],
                [
                    'name' => 'ines',
                    'age' => 16
                ],
                [
                    'name' => 'ines',
                    'age' => 16
                ],
                [
                    'name' => 'ines',
                    'age' => 16
                ],
                [
                    'name' => 'ines',
                    'age' => 16
                ],
                [
                    'name' => 'ines',
                    'age' => 16
                ],
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }
}
