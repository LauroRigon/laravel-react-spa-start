<?php

namespace App\Http\Controllers\Auth;

use App\Mail\UserVerificationToken;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use JWTAuth;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
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

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    private function validator(array $data)
    {
        return Validator::make($data, [
            'username' => 'required|string|max:20',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    public function register(Request $request)
    {
        $credentials = $request->only('username', 'email', 'password', 'password_confirmation');

        $this->validator($credentials)->validate();

        $name = $credentials['username'];
        $email = $credentials['email'];
        $password = $credentials['password'];

        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'is_verified' => 0
        ]);

        $verification_code = str_random(30);

        DB::table('user_verifications')->insert([
            'user_id' => $user->id,
            'token' => $verification_code
        ]);

        $resetLink = route('email.verify', ['verification_code' => $verification_code]);

        Mail::to($user)->send(new UserVerificationToken($user, $resetLink));

        $authToken = JWTAuth::fromUser($user);

        return response()->json([
            'success' => true,
            'message' => 'Valeu mano, Verifica teu email e confirme-o!',
            'data' => [
                'account' => $user,
                'authToken' => $authToken
            ]
        ], 201);
    }

    /**
     * Verify the user`s email
     *
     * @param  string $verification_code
     * @return \Illuminate\Http\JsonResponse
     */
    public function verifyUser(Request $request, $verification_code)
    {
        $check = DB::table('user_verifications')->where('token', $verification_code)->first();

        if(!is_null($check)) {
            $user = User::find($check->user_id);

            if($user->is_verified) {
                return view('auth.verify_email')->with([
                    'color' => 'warning',
                    'message' => 'Conta já foi verificada!'
                ]);;
            }

            $user->update(['is_verified' => 1]);
            DB::table('user_verifications')->where('token', $verification_code)->delete();

            return view('auth.verify_email')->with([
                'color' => 'success',
                'message' => 'Conta verificada com sucesso!'
            ]);
        }

        return view('auth.verify_email')->with([
            'color' => 'error',
            'message' => 'Código de verificação inválido!'
        ]);
    }
}
