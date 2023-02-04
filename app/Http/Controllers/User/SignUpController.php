<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\SignUpRequest;
use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SignUpController extends Controller
{
    public function __invoke(SignUpRequest $request): Response|Application|ResponseFactory
    {
        $data = $request->validated();
        $user = User::where('email', [$data['email']])->first();

        if (!$user) {
            $data['password'] = bcrypt($data['password']);

            $user = User::create($data);
            $token = auth()->tokenById($user->id);

            return response(['access_token' => $token]);
        }

        return response(['error' => 'User with this email already exist'], 403);
    }
}
