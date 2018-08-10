<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', 'Auth\RegisterController@register');
Route::post('login', 'Auth\LoginController@login');

Route::post('password/recover', 'Auth\ForgotPasswordController@recover');
Route::post('password/reset', 'Auth\ResetPasswordController@reset');

Route::middleware('jwt.auth')->group(function() {
    Route::get('logout', 'Auth\LoginController@logout');

    Route::get('test', function(){
      return response()->json(['eita' => 'sera q deu']);
    });
});
