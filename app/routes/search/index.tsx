import { LoaderFunction, redirect, useLoaderData, Link, useCatch, MetaFunction, ActionFunction, Form, useActionData, json } from "remix"
import { User } from '@supabase/supabase-js'
import { supabase } from '~/lib/supabase/supabase.server'
import { isAuthenticated, getUserByRequestToken } from "~/lib/auth"
import SearchLayout from '~/components/layouts/SearchLayout'
import React from "react"

export type VINCreds = {
    vin?: string,
}

export let loader: LoaderFunction = async ({ request }) => {
    if (!(await isAuthenticated(request))) return redirect('/auth')
    const { user } = await getUserByRequestToken(request)
    return { user }
}

export let meta: MetaFunction = () => {
    return {
      title: "Vehicle Search",
      description: "Vehicle Search Input"
    };
};

export let action: ActionFunction = async ({ request }) => {

    const form = await request.formData();
    const VIN = form.get('VIN');

    let errors: VINCreds & { service?: Array<string>} = {}

    if (typeof VIN !== 'string') {
        errors.vin = 'fill-in a valid string!'
    }

    if (VIN && !VIN.toString().match(/^[A-HJ-NPR-Za-hj-npr-z\d]{8}[\dX][A-HJ-NPR-Za-hj-npr-z\d]{2}\d{6}$/)) {
        errors.vin = 'fill-in a valid VIN code!'
    }

    if (Object.keys(errors).length) {
        return json(errors, { status: 422 });
    }

    return redirect(`/search/${VIN}`);
}

export default function Search() {
    const { user } = useLoaderData<{ user?: User }>();
    const errors = useActionData<VINCreds>()

    return (
        <SearchLayout user={user}>
            <div className="flex flex-col justify-center items-center relative">
                <div className="rounded-md bg-green-800 shadow-2xl shadow-gray-500/50 w-3/5 overflow-hidden mt-4 text-center">
                    <h3 className="px-2 py-1 text-white">Input Vehicle VIN</h3>
                    <div className="bg-gray-800 text-white px-4 py-2 w-full inline-block">
                        <Form method="post">
                            <input id="VIN" className="w-full font-normal border py-2 px-4 text-gray-700 hover:bg-gray-50 focus:border-inverse rounded-md focus:outline-none" name="VIN" type="VIN" required placeholder="VIN" />
                            {/* <button type="submit" className="">Search</button> */}
                        </Form>
                        {errors && <div className="h-3 text-xs">{errors?.vin && errors.vin}</div>}
                    </div>
                </div>
            </div>
        </SearchLayout>
    )
}

export function CatchBoundary() {
    const caught = useCatch()

    if(caught.status === 404) {
        return (
            <SearchLayout user={undefined}>
                <div className="flex flex-col justify-center items-center relative">
                    <div className="py-8 flex flex-col place-items-center">
                        <h3 className="text-3xl text-primary">No User Data</h3>
                        <br/>
                        <Link className="px-4 py-1 rounded-md text-white bg-indigo-500 shadow-lg shadow-indigo-500/50" to={`/auth`}>Try again</Link>
                    </div>
                </div>
            </SearchLayout>
        )
    }
}

export function ErrorBoundary({ error }: { error: Error }) {
    return (
        <div>
            <h1>There was an error</h1>
            <p>{error.message}</p>
            <hr />
            <p>
              Hey, developer, you should replace this with what you want your
              users to see.
            </p>
        </div>
    );
  }
