<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class BalanceController extends Controller
{
    public function index()
    {
        return Inertia::render('Main/Balance', [
            'balance' => [
                [
                    'name' => 'dalis komalasari',
                    'number' => '',
                    'category' => 'dana',
                ],
                [
                    'name' => 'agus risnandar',
                    'number' => '082301238922',
                    'category' => 'pulsa',
                ],
                [
                    'name' => 'annisa senja risnandar putri',
                    'number' => '4508109319283',
                    'category' => 'token',
                ],
                [
                    'name' => 'annisa senja risnandar putri',
                    'number' => '4508109319283',
                    'category' => 'token',
                ],
                [
                    'name' => 'annisa senja risnandar putri',
                    'number' => '4508109319283',
                    'category' => 'token',
                ],
                [
                    'name' => 'annisa senja risnandar putri',
                    'number' => '4508109319283',
                    'category' => 'token',
                ],
                [
                    'name' => 'annisa senja risnandar putri',
                    'number' => '4508109319283',
                    'category' => 'token',
                ],
                [
                    'name' => 'annisa senja risnandar putri',
                    'number' => '4508109319283',
                    'category' => 'token',
                ],
                [
                    'name' => 'annisa senja risnandar putri',
                    'number' => '4508109319283',
                    'category' => 'token',
                ],
                [
                    'name' => 'annisa senja risnandar putri',
                    'number' => '4508109319283',
                    'category' => 'token',
                ],
                [
                    'name' => 'zakaia ramadan risnandar putri',
                    'number' => '082381726322',
                    'category' => 'dana',
                ],
                [
                    'name' => 'resta putri apriliani',
                    'number' => '458239812739',
                    'category' => 'token',
                ],
            ]
        ]);
    }
}
