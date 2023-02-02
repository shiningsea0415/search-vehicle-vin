import { useState } from 'react'
import { LoaderFunction, MetaFunction, redirect, useLoaderData } from "remix"
import { User } from '@supabase/supabase-js'
import { isAuthenticated, getUserByRequestToken } from "~/lib/auth"
import SearchLayout from '~/components/layouts/SearchLayout'

const VEHICLE_API = 'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/'

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
    return {
      title: "Vehicle Detail",
      description: "Vehicle Detail Information"
    };
};

export let loader: LoaderFunction = async ({ request, params }) => {
    if (!(await isAuthenticated(request))) return redirect('/auth')
    let vehicle = {};
    let errors = {};
    const { user } = await getUserByRequestToken(request);
    try {
        const responsePromise = (await fetch(`${VEHICLE_API + params.id}?format=json`)).json();
        const data = await responsePromise.then(data => data.Results[0]);
        vehicle = data;
    } catch(error) {
        // @ts-ignore
        errors = [ error.message ]
    }
    return { user, vehicle, errors, params }
}

export default function SearchResult() {
    const { user, vehicle, errors } = useLoaderData<{ user?: User, vehicle?: any, errors: any }>();

    return (
        <SearchLayout user={user}>
            <div className="flex flex-col justify-center items-center relative">
                <div className="py-8 flex flex-col place-items-center">
                    <div>
                        <div className='w-full font-normal border py-2 px-4 text-gray-700 hover:bg-gray-50 focus:border-indigo-500 rounded-md focus:outline-none'>
                            {vehicle?.ErrorText.split(';').map((error: string, index: number) => (
                                <li key={index} className="leading-[18px]">{error}</li>
                            ))}
                        </div>

                        <div className="text-purple-600 pb-2 text-2xl border-b my-2 uppercase text-center">Vehicle Picture</div>
                        <div className="mt-2 text-center">
                            <div className="flex flex-col gap-3 items-center space-x-6">
                                <div className="shrink-0">
                                    {/* <img className="w-36 h-36 object-cover rounded-full shadow-lg" src={`/images/avatars/${avatarUrl}`} alt={profile?.username} /> */}
                                </div>
                            </div>
                            {/* <small className="h-4 inline-block text-gray-500">{avatarLoading ? `updating...`: `choose an image file to update your profile pic`}</small> */}
                        </div>
                        <br/>
                        {/* <div className="text-purple-600 pb-2 text-2xl border-b mb-2 uppercase text-center">Vehicle Details</div> */}
                        <fieldset>
                            <legend className="text-purple-600 pb-2 text-2xl border-b mb-2 uppercase">Vehicle Details</legend>
                            <div className="w-full mb-6">
                                <label className="block uppercase font-semibold text-gray-600 text-base" htmlFor="username">MAKE</label>
                                <div className="w-full font-normal border py-2 px-4 text-gray-700 hover:bg-gray-50 focus:border-indigo-500 rounded-md focus:outline-none">{vehicle.Make ? vehicle.Make : 'N/A'}</div>
                            </div>
                            <div className="w-full mb-6">
                                <label className="block uppercase font-semibold text-gray-600 text-base" htmlFor="username">Model</label>
                                <div className="w-full font-normal border py-2 px-4 text-gray-700 hover:bg-gray-50 focus:border-indigo-500 rounded-md focus:outline-none">{vehicle.Model ? vehicle.Model : 'N/A'}</div>
                            </div>
                            <div className="w-full mb-6">
                                <label className="block uppercase font-semibold text-gray-600 text-base" htmlFor="username">Body Class</label>
                                <div className="w-full font-normal border py-2 px-4 text-gray-700 hover:bg-gray-50 focus:border-indigo-500 rounded-md focus:outline-none">{vehicle.BodyClass ? vehicle.BodyClass : 'N/A'}</div>
                            </div>
                            <div className="w-full mb-6">
                                <label className="block uppercase font-semibold text-gray-600 text-base" htmlFor="username">Year</label>
                                <div className="w-full font-normal border py-2 px-4 text-gray-700 hover:bg-gray-50 focus:border-indigo-500 rounded-md focus:outline-none">{vehicle.ModelYear ? vehicle.ModelYear : 'N/A'}</div>
                            </div>
                            <div className="w-full mb-6">
                                <label className="block uppercase font-semibold text-gray-600 text-base" htmlFor="username">Manufacturer</label>
                                <div className="w-full font-normal border py-2 px-4 text-gray-700 hover:bg-gray-50 focus:border-indigo-500 rounded-md focus:outline-none">{vehicle.Manufacturer ? vehicle.Manufacturer : 'N/A'}</div>
                            </div>
                            <div className="w-full mb-6">
                                <label className="block uppercase font-semibold text-gray-600 text-base" htmlFor="username">Vehicle Type</label>
                                <div className="w-full font-normal border py-2 px-4 text-gray-700 hover:bg-gray-50 focus:border-indigo-500 rounded-md focus:outline-none">{vehicle.VehicleType ? vehicle.VehicleType : 'N/A' }</div>
                            </div>
                            <div className="w-full mb-6">
                                <label className="block uppercase font-semibold text-gray-600 text-base" htmlFor="website">Gross Vehicle Weight Rating(GVWR)</label>
                                <div className="w-full font-normal border py-2 px-4 text-gray-700 hover:bg-gray-50 focus:border-indigo-500 rounded-md focus:outline-none">{vehicle.GVWR ? vehicle.GVWR : 'N/A' }</div>
                            </div>
                            <div className="w-full mb-6">
                                <label className="block uppercase font-semibold text-gray-600 text-base" htmlFor="website">Doors</label>
                                <div className="w-full font-normal border py-2 px-4 text-gray-700 hover:bg-gray-50 focus:border-indigo-500 rounded-md focus:outline-none">{vehicle.Doors ? vehicle.Doors : 'N/A' }</div>
                            </div>
                            <div className="w-full mb-6">
                                <label className="block uppercase font-semibold text-gray-600 text-base" htmlFor="website">Plant City</label>
                                <div className="w-full font-normal border py-2 px-4 text-gray-700 hover:bg-gray-50 focus:border-indigo-500 rounded-md focus:outline-none">{vehicle.PlantCity ? vehicle.PlantCity : 'N/A' }</div>
                            </div>
                            <div className="w-full mb-6">
                                <label className="block uppercase font-semibold text-gray-600 text-base" htmlFor="website">Plant Country</label>
                                <div className="w-full font-normal border py-2 px-4 text-gray-700 hover:bg-gray-50 focus:border-indigo-500 rounded-md focus:outline-none">{vehicle.PlantCountry ? vehicle.PlantCountry : 'N/A' }</div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        </SearchLayout>)
}
