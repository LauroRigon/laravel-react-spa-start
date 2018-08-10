<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\ResetPasswordToken;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Mockery\Exception;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */


    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function recover(Request $request)
    {
        $email = $request->input('email');

        $this->validate($request, ['email' => 'required']);


        $user = User::where('email', $email)->first();

        if(!$user) {
            return response()->json([
                'success' => false,
                'error' => 'Seu endereço de email não foi encontrado!'
            ], 401);
        }

        try {
            $token = $this->generatePasswordReset($user);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
        $this->sendResetToken($user, $token);
        return response()->json([
            'success' => true,
            'error' => 'Um email de recuperação foi enviado!'
        ], 201);
    }

    private function sendResetToken(User $user, $token)
    {
        Mail::to($user)->send(new ResetPasswordToken($user, $token));
    }

    private function generatePasswordReset(User $user)
    {
        DB::table('password_resets')->where('email', $user->email)->delete();

        $token = strtoupper(str_random(6));

        $success = DB::table('password_resets')->insert([
            'email' => $user->email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);

        if(!$success) throw new \Exception('Erro ao registrar token');

        return $token;
    }
}
