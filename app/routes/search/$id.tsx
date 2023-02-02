import { useState } from 'react'
import { LoaderFunction, redirect, useLoaderData } from "remix"
import { User } from '@supabase/supabase-js'
import { isAuthenticated, getUserByRequestToken } from "~/lib/auth"
import SearchLayout from '~/components/layouts/SearchLayout'

const VEHICLE_API = 'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/'

export let loader: LoaderFunction = async ({ request, params }) => {
    if (!(await isAuthenticated(request))) return redirect('/auth')
    let vehicle = {};
    let errors = {};
    const { user } = await getUserByRequestToken(request);
    try {
        const responsePromise = (await fetch(`${VEHICLE_API + params}?format=json`)).json();
        const data = await responsePromise.then(data => data.Results[0]);
        vehicle = data;
    } catch(error) {
        // @ts-ignore
        errors = [ error.message ]
    }
    return { user, vehicle, errors }
}

export default function SearchResult() {
    const { user, vehicle, errors } = useLoaderData<{ user?: User, vehicle?: any, errors: any }>();

    return (
        <SearchLayout user={user}>
            <div className="flex flex-col justify-center items-center relative">
                <div className="py-8 flex flex-col place-items-center">
                    <div>
                        <div className="text-purple-600 pb-4 text-2xl border-b mb-4 uppercase text-center">Profile Picture</div>
                        <div className="mt-2 text-center">
                            <div className="flex flex-col gap-3 items-center space-x-6">
                                <div className="shrink-0">
                                    {/* <img className="w-36 h-36 object-cover rounded-full shadow-lg" src={`/images/avatars/${avatarUrl}`} alt={profile?.username} /> */}
                                </div>
                            </div>
                            {/* <small className="h-4 inline-block text-gray-500">{avatarLoading ? `updating...`: `choose an image file to update your profile pic`}</small> */}
                        </div>
                        <br/>
                        <div className="text-purple-600 pb-4 text-2xl border-b mb-4 uppercase text-center">Profile Details</div>
                        <div>{vehicle?.ErrorText}</div>
                        {/* <Form className="w-full px-10 py-8" method="post">
                            <fieldset>
                                <legend className="text-purple-600 pb-4 text-2xl border-b mb-4 uppercase">Profile Details</legend>
                                <div className="w-full mb-6">
                                    <label className="block uppercase font-semibold text-gray-600 text-base" htmlFor="username">Username</label>
                                    <input id="username" className="w-full font-normal border py-2 px-4 text-gray-700 hover:bg-gray-50 focus:border-indigo-500 rounded-md focus:outline-none" name="username" type="text" required placeholder="your username" defaultValue={profile.username} />
                                </div>
                                <div className="w-full mb-6">
                                    <label className="block uppercase font-semibold text-gray-600 text-base" htmlFor="website">Website</label>
                                    <input id="website" className="w-full font-normal border py-2 px-4 text-gray-700 hover:bg-gray-50 focus:border-indigo-500 rounded-md focus:outline-none" name="website" type="text" required placeholder="Your website." defaultValue={profile.website} />
                                </div>
                            </fieldset>
                        </Form> */}
                    </div>
                </div>
            </div>
        </SearchLayout>)
}
