<?php

namespace App\Http\Requests\admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() != null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['string', 'max:64'],
            'last_name' => ['string', 'max:64'],
            'email' => ['string', 'email', 'max:255', 'unique:users'],
            'password' => ['string', 'min:8'],
            'role' => ['string'],
        ];
    }

    public function messages(): array
    {
        return [
            'first_name.max' => 'First name cannot be longer than 64 characters',
            'last_name.max' => 'Last name must not be greater than 64 characters',
            'email.email' => 'Invalid email format',
            'email.unique' => 'Email already exists',
            'password.min' => 'Password must be at least 8 characters',
            'role.string' => 'Invalid role',
        ];
    }
}
