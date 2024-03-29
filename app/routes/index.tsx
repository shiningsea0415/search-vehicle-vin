import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";

import StarterKit from "../components/StarterKit"
import SiteLayout from '../components/layouts/SiteLayout'

type IndexData = {
  resources: Array<{ name: string; url: string }>;
  topPages: Array<{ name: string; to: string, isPrimary?: boolean }>;
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = () => {
  let data: IndexData = {
    resources: [
      {
        name: "Contact Me",
        url: "https://t.me/Altosey"
      },
    ],
    topPages: [
      {
        to: "/auth",
        name: "Sing In",
        isPrimary: true
      },
    ]
  };

  // https://remix.run/api/remix#json
  return json(data);
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Vehicle Search",
    description: "Welcome to out Vehicle Search Engine"
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData<IndexData>();

  return (
    <SiteLayout>
      <div className="flex flex-col justify-center">
        <main>
          <StarterKit/>
        </main>
        <aside className="text-center mt-4">
          <ul className="flex flex-row justify-center gap-2">
            {data.topPages.map(page => (
              <li key={page.to} className="remix__page__resource">
                <Link className={`action__auth btn btn-primary ${!page.isPrimary && 'btn-outline'}`} to={page.to} prefetch="intent">{page.name} &rarr;</Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </SiteLayout>
  );
}
