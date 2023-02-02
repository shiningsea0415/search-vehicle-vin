import { PropsWithChildren, ReactElement } from "react";
import type { User } from '@supabase/supabase-js'
import { Form, Link, useTransition } from 'remix'

type SearchHeaderProps = {
    user?: User,
    vin?: string
}

function SearchHeader({ user, vin }: PropsWithChildren<SearchHeaderProps>): ReactElement {
    const transition = useTransition()
    return (
        <nav className="w-full py-3 bg-blue-50 shadow-md ">
            <div className="container flex justify-end place-content-end">
                <ul className="list-none flex gap-4 text-center">
                    {vin && (
                        <li>
                            <button className="px-4 py-1 rounded-md bg-green-500 text-white shadow-md shadow-green-500/50">
                                <Link to="/search">Search again</Link>
                            </button>
                        </li>
                    )}
                    <li className="flex gap-2 items-center">
                    {transition.state === 'submitting' ?? <em>signing out, </em>}{transition.state === 'submitting' ?? <em>...</em>} &nbsp;
                        <Form method="post" action="/signout">
                            <button type="submit" className="px-4 py-1 rounded-md bg-cyan-500 text-white shadow-md shadow-cyan-500/50" disabled={transition.state === 'submitting'}>Sign Out</button>
                        </Form>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default SearchHeader
