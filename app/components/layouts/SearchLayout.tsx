import { PropsWithChildren, ReactElement, Fragment } from "react";
import type { User } from '@supabase/supabase-js'
import SearchHeader from './SearchHeader'

type SearchLayoutProps = {
    user?: User
}

function SearchLayout({ user, children }: PropsWithChildren<SearchLayoutProps>): ReactElement {
    return (
        <Fragment>
            <div className="header">
                <SearchHeader user={user} />
            </div>
            <div className="container mx-auto">
                {children}
            </div>
        </Fragment>
    )
}

export default SearchLayout;
