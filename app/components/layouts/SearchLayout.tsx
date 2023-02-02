import { PropsWithChildren, ReactElement, Fragment } from "react";
import type { User } from '@supabase/supabase-js'
import SearchHeader from './SearchHeader'

type SearchLayoutProps = {
    user?: User,
    vin?: string
}

function SearchLayout({ user, vin, children }: PropsWithChildren<SearchLayoutProps>): ReactElement {
    return (
        <Fragment>
            <div className="header">
                <SearchHeader user={user} vin={vin} />
            </div>
            <div className="container mx-auto">
                {children}
            </div>
        </Fragment>
    )
}

export default SearchLayout;
