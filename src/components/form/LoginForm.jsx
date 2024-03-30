import Image from 'next/image';
import React from 'react';
import loginImage from '@/assets/login.jpg'

const LoginForm = () => {
    return (
        <main className='flex justify-center items-center h-[100vh]'>
            <div className="p-6 w-full max-w-md">
                <div className='bg-container rounded-2xl border border-stroke  px-6 pt-7 pb-8 mb-4 text-center'>
                    <h1 className='texxt-title text-2xl'>Welcome Back</h1>
                    <h3 className='text-subtext'>{`Let's get started by signing in.`}</h3>
                    <hr className="hr" />
                    <form className="">
                        <div className="form-control">
                            <label className="form-label !bg-container" for="username">
                                Username
                            </label>
                            <input className="form-input !bg-container" id="username" type="email" placeholder="type your email" />
                        </div>
                        <div className="form-control">
                            <label className="form-label !bg-container" for="password">
                                Password
                            </label>
                            <input className="form-input !bg-container" id="password" type="password" placeholder="type your password" />
                            <p className="text-red-500 text-xs italic">Please choose a password.</p>
                        </div>
                        <button className="btn !w-full mb-3" type="button">
                            Sign In
                        </button>
                    </form>
                    <p className="text-center text-gray-500 text-xs">
                        &copy;2024 Dwi Wijaya. All rights reserved.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default LoginForm;
