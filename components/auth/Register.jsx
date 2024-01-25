"use client";

import Link from "next/link";
import {useState, useContext, useEffect, useCallback} from "react";
import AuthContext from "../../context/AuthContext";
import {toast} from "react-toastify";
import {Spinner} from "@material-tailwind/react";
import {useRouter, useSearchParams} from "next/navigation";

function CustomSpinner() {
    return <Spinner className="h-16 w-16 text-gray-900/50"/>;
}

import {
    validatePasword,
    validateEmail,
    validateUsername,
} from "../../helper/validator";

const Register = () => {
    const {error, registerUser, clearErrors} = useContext(AuthContext);
    const router = useRouter()
    const searchParams = useSearchParams()
    useEffect(() => {
        if (searchParams.get('code')) {
            const code = searchParams.get('code')
            console.log(code)
            fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/isemail/confirm?code=" + code).then(async (res) => {

                const data = await res.json()
                console.log(data)
                if(data.data){

                const user = data.data

                   await  registerUser(user.name, user.email, user.password)
                }
                else {
                    toast.error('error while creating your account')
                }
            })
        }


    }, []);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const check = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/auth/isemail', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({name, email, password})
        })
        console.log(check)
        if (check.ok) {
            toast.success('email verification sent to :' + email + '\nplease check you email')
            setTimeout(() => router.push('/login'), 1500)
        } else {
            const data = await  check.json()
            console.log(data)
            toast.error(data.message)
        }


        //const isEmail = await check.json()
        //console.log(isEmail)
        // registerUser({ name, email, password });
    };

    const verifyAndSetUsername = useCallback(
        (username) => {
            if (!validateUsername(username)) {
                setUsernameError(true);
            } else {
                setUsernameError(false);
            }
            setName(username);
        },
        [setUsernameError, setName]
    );

    const verifyAndSetEmail = useCallback(
        (email) => {
            if (!validateEmail(email)) {
                setEmailError(true);
            } else {
                setEmailError(false);
            }
            setEmail(email);
        },
        [setEmailError, setEmail]
    );

    const verifyAndSetPassword = useCallback(
        (password) => {
            if (!validatePasword(password)) {
                setPasswordError(true);
            } else {
                setPasswordError(false);
            }
            setPassword(password);
        },
        [setPasswordError, setPassword]
    );

    useEffect(() => {
        if (usernameError || emailError || passwordError) setIsDisabled(true);
        else setIsDisabled(false);
    }, [passwordError, emailError, usernameError]);

    /*useEffect(() => {
       if(search.get('code')){
       fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/isemail/confirm?code=${search.get('code')}`).then(async (res)=>{
         const data = await res.json()
         console.log(data)})}
   }, [])*/

    return (
        <div
            style={{maxWidth: "480px"}}
            className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
        >
            <form onSubmit={submitHandler}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    {
                        searchParams.get('code') && <CustomSpinner/>
                    }
                </div>
                <h2 className="mb-5 text-2xl font-semibold">Register Account</h2>

                <div className="mb-4">
                    <label className="block mb-1"> Full Name </label>
                    <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="text"
                        placeholder="Type your name"
                        value={name}
                        onChange={(e) => verifyAndSetUsername(e.target.value)}
                        required
                    />
                </div>
                {usernameError && (
                    <p className="text-red-500 text-xs italic">
                        Please enter a valid username. Username must be at least 4
                    </p>
                )}

                <div className="mb-4">
                    <label className="block mb-1"> Email </label>
                    <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="text"
                        placeholder="Type your email"
                        value={email}
                        onChange={(e) => verifyAndSetEmail(e.target.value)}
                        required
                    />
                </div>
                {emailError && (
                    <p className="text-red-500 text-xs italic">
                        Please enter a valid email.
                    </p>
                )}

                <div className="mb-4">
                    <label className="block mb-1"> Password </label>
                    <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="password"
                        placeholder="Type your password"
                        minLength={6}
                        value={password}
                        onChange={(e) => verifyAndSetPassword(e.target.value)}
                        required
                    />
                </div>
                {passwordError && (
                    <p className="text-red-500 text-xs italic">
                        Please enter a strong password.
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isDisabled}
                    className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-orange-500 border border-transparent rounded-md hover:bg-orange-700"
                >
                    Register
                </button>

                <hr className="mt-4"/>

                <p className="text-center mt-5">
                    Already have an account?
                    <Link href="/login" className="text-orange-500">
                        Sign in
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
