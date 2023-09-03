# flixverse

This is a simple application that uses the [The Movie Database API](https://developers.themoviedb.org/3/getting-started/introduction) to display movies and TV shows.

The goal of this project is to get (re)familiar with Angular (now at v16) and try out different technologies and patterns.

There's no real goal to this project other than to have fun and learn. Do not expect this to be a fully functional application.

The live version of this app can be found at [flixverse-iota.vercel.app](flixverse-iota.vercel.app/). It's hosted on Vercel, and deploys on every push to the `main` branch.

## Tech

- Angular 16
- Nx
- TailwindCSS (css)
- Spartan (an Angular-alternative to shadcn-ui, in alpha)
- NgPrime (ui components)
- Lucide (icons)
- Swiper (carousel)
- ngneat/query (an Angular-alternative to Tanstack Query, in beta)

## Start the app

To start the development server run `nx serve flixverse`. Open your browser and navigate to http://localhost:4200/. Happy coding!

## Generate code

If you happen to use Nx plugins, you can leverage code generators that might come with it.

Run `nx list` to get a list of available plugins and whether they have generators. Then run `nx list <plugin-name>` to see what generators are available.

Learn more about [Nx generators on the docs](https://nx.dev/plugin-features/use-code-generators).

## Running tasks

To execute tasks with Nx use the following syntax:

```
nx <target> <project> <...options>
```

You can also run multiple targets:

```
nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/core-features/run-tasks).

## Todo

- Move discover to movies
  - Add order by
- Clone discover/movies to tvshows
- Clone discover/movies/tvshows to people ?
- Add to portfolio
- Add analytics
- Replace modal by spartan dialog
- Add loading animations
- Add error handling
- Add sentry
- Design review
