import { Outlet } from "remix"
import SiteLayout from "../components/layouts/SiteLayout";
import StarterKit from "../components/StarterKit";

export default function AuthLayout() {
  return (
      <SiteLayout>
        <div className=" flex flex-col justify-center items-center relative">
            <main className="w-full sm:w-3/4 md:w-8/12 lg:w-6/12 xl:w-4/12">
                <StarterKit/>
                <Outlet/>
            </main>
        </div>
    </SiteLayout>
  );
}
