import { PropsWithChildren, ReactElement } from "react";
import FooterContent from "./FooterContent";
import HeaderContent from "./HeaderContent";

function SiteLayout({ children }: PropsWithChildren<{}>): ReactElement {
    return (
        <div className="remix-app bg-primary">
            <header className="remix-app__header">
                {/* Header content goes here */}
                <HeaderContent />
            </header>
            <div className="remix-app__main min-h-[calc(100vh-197px)]">
                <div className="container mx-auto remix-app__main-content">{children}</div>
            </div>
            <footer className="remix-app__footer">
                {/* Footer content goes here */}
                <FooterContent />
            </footer>
        </div>
    )
}

export default SiteLayout;
