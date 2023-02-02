<div align="center"><strong>Vehicle Search by VIN(Remix + Supabase + Typescript)</strong></div>

Out of the box you get all the `essentials`
- __Typescript__ as the language choice
- __Tailwind CSS__ for quick styling without getting out of your HTML
- __Daisy UI__ for pre-made TailwindCSS component classes
- __Headless UI + React Hot Toast__ for robust headless logic you can use for components like Dialog/Modal, Dropdown, List, etc.
- __WorkSans__ as the App font
- __Icons through React-icons__ for on-demand, tree-shakeable icons
- __ESLint__ for static code analysis
- __Prettier__ for code formatting (even for your TailwindCSS classes - sorted as per Tailwindlab reccomendations)
- __Playwright__ for reliable end-to-end test cases (+ end-to-end test cases for the homepage and the sign-in page)

with [Supabase](https://supabase.io/) support
- __Authentication System__ with Supabase GoTrue

and a bunch of pre-made, hand-rolled(easily replace-able) components, that you almost always end up installing/using for any non-trivial project

## Quick Start

The best way to start with this template is to click "Use this template" above, create your own copy and work with it

### Development

To start the project locally, run:
```bash
npm run dev
```
which kickstarts the Remix development and build server as well as TailwindCSS compilation in the watch mode. Open `http://localhost:3000` in your browser to start working.

Check `package.json` for the full list of commands available at your disposal.

## How to Setup Supabase for Vehicle Search?
If new to Supabase
- Create account at [Supabase](https://app.supabase.io/)
- Create a Organisation, and a project

Once done, or if you already have a Supabase project
- Copy the generated project's API authentication details from `https://app.supabase.io/project/<your-awesome-remix-project>/api?page=auth`
- Place the details in `.env` as `SUPABASE_URL` and `SUPABASE_KEY`
- Install NPM dependencies, by running `npm install` or `npm i`

Vehicle Search supports user profiles and user avatars. To get the profile table and storage ready, execute the following queries at `https://app.supabase.io/project/<your-awesome-remix-project>/editor/sql`
