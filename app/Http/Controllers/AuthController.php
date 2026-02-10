<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function login(Request $request) {
        $incomingFields = $request->validate([
            'loginname' => ['required'],
            'loginpassword' => ['required']
        ]);
        if (auth()->attempt(['name' => $incomingFields['loginname'], 'password' => $incomingFields['loginpassword']])) {
            $request->session()->regenerate();
            return redirect('/')->with('success', 'Welcome back!');
        } else {
            return redirect('/')->with('error', 'Invalid credentials');
        }
    } 
    public function logout(Request $request) {
        auth()->logout();
        return redirect('/')->with('success', 'You have been logged out!');
    } 
    public function register(Request $request) {
        $incomingFields = $request->validate([
            'name' => ['required', 'min:3', 'max:20', Rule::unique('users', 'name')],
            'email' => ['required', 'email', Rule::unique('users', 'email')],
            'password' => ['required', 'min:8', 'max:200']
        ]);
        $incomingFields['password'] = bcrypt($incomingFields['password']);
        $user = User::create($incomingFields);
        auth()->login($user);
 
        return redirect('/')->with('success', 'Welcome to the E-commerce App');
    }
}
