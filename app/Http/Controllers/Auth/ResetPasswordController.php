<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    /**
     * Time to consider a token expired
     */
    private $minutesToTokenExpire = 60;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    private function validator(array $data)
    {
        return Validator::make($data, [
            'email' => 'required|email',
            'token' => 'required',
            'password' => 'required|min:6|confirmed'
        ]);
    }

    public function reset(Request $request)
    {
        $credentials = $request->only('email', 'token', 'password', 'password_confirmation');

        $this->validator($credentials)->validate();

        $reset = DB::table('password_resets')->where('email', $credentials['email'])->where('token', $credentials['token'])->first();

        if(!$reset){
            return response()->json([
                'success' => false,
                'error' => 'Token ou email inválido.'
            ], 403);
        }

        if($this->isTokenExpired($reset)) {
            return response()->json([
                'success' => false,
                'error' => 'Token de recuperação de senha foi expirado. Tente gerar outro novamente'
            ], 403);
        }

        $user = User::where('email', $credentials['email'])->first();
//        $success = DB::table('users')->where('email', $credentials['email'])->update([
//            'password' => Hash::make($credentials['password'])
//        ]);

        $user->update([
            'password' => Hash::make($credentials['password'])
        ]);

        $authToken = JWTAuth::fromUser($user);

        return response()->json([
            'success' => true,
            'message' => 'Sua senha foi redefinida com sucesso!',
            'data' => [
                'account' => $user,
                'authToken' => $authToken
            ]
        ],201);
    }

    private function isTokenExpired($reset)
    {
        $token_created_at = Carbon::createFromTimeString($reset->created_at);
        $now = Carbon::now();
        $diffTime = $now->diffInMinutes($token_created_at);

        if($diffTime >= $this->minutesToTokenExpire){
            return true;
        }

        return false;
    }
}
