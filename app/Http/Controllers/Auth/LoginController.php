<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     **/
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $this->validate($request, [
            'email' => 'required|email|max:200',
            'password' => 'required|string|min:6',
        ]);

        try {
            if(! $authToken = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'success' => false,
                    'error' => 'Usuário ou senha inválido'
                ], 404);
            }
        }catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'error' => 'Ocoreu um erro inesperado, tente novamente!'
            ], 500);
        }

        $user = JWTAuth::user();
        //tudo certo, retorna o token
        return response()->json([
            'success' => true,
            'data' => [
                'user' => $user,
                'authToken' => $authToken
            ]
        ],200);
    }

    public function logout(Request $request)
    {
        $this->validate($request, ['token' => 'required']);
        try {
            JWTAuth::getToken();
            JWTAuth::invalidate();
            return response()->json([
                'success' => true,
                'message' => 'Você saiu com sucesso!'
            ],200);
        }catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
