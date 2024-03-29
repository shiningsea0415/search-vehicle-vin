import { PropsWithChildren, ReactElement, useState } from "react";
import { Form, useTransition } from "remix"

export type AuthCreds = {
    email?: string,
    password?: string
}

type AuthFormProps = {
    isSignIn?: boolean,
    errors?: AuthCreds & { service?: Array<string>}
}

function AuthForm({ isSignIn: isSignInProp = true, errors = {} }: PropsWithChildren<AuthFormProps>): ReactElement {
    const [isSignIn, setIsSignIn] = useState(isSignInProp)
    let transition = useTransition();

    return (
        <Form className="w-full px-10 py-8 rounded-md shadow-md bg-secondary" method="post">
            <fieldset>
                <legend className="text-primary pb-4 text-4xl border-b mb-4">{ isSignIn ? `Sign In` : `Sign Up!`  }</legend>
                <div className="errors h-3 text-xs">{errors?.service && errors.service.map((error, index) => <span className="error" key={index}>{error}</span>)}</div>
                <br/>
                <div className="w-full mb-6">
                    <label className="block uppercase font-semibold text-primary text-base" htmlFor="email">Email</label>
                    <input id="email" className="w-full font-normal border py-2 px-4 text-gray-700 hover:bg-gray-50 focus:border-inverse rounded-md focus:outline-none" name="email" type="email" required placeholder="your email" />
                    <div className="h-3 text-xs">{errors?.email && errors.email}</div>
                </div>
                <input type="hidden" name="is_sign_in" value={`${isSignIn}`} />
                <div className="w-full mb-6">
                    <label className="block uppercase font-semibold text-primary text-base" htmlFor="password">Password</label>
                    <input id="password" className="w-full font-normal border py-2 px-4 text-gray-700 hover:bg-gray-50 focus:border-inverse rounded-md focus:outline-none" name="password" type="password" required placeholder="Your password." />
                    <div className="h-3 text-xs">{errors?.password && errors.password}</div>
                </div>
                <div className="w-full mb-6 flex justify-between items-center">
                    <button type="submit" className={`btn btn-info ${transition.state === 'submitting' && 'loading'}`} disabled={transition.state === 'submitting'}>{ isSignIn ? `Sign In` : `Sign Up!`  }</button>

                    <div className="text-right text-primary">
                        <small className="block">{ isSignIn ? `not a member?` : `already a member?` }</small>
                        <button type="button"  title={ isSignIn ? `Sign Up!` : `Sign In` } onClick={() => { setIsSignIn(!isSignIn)}}>{ isSignIn ? `Sign Up!` : `Sign In` }</button>
                    </div>
                </div>
            </fieldset>
        </Form>
    )
}

export default AuthForm;
