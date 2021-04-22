# Intersections Notes

## General Overview

- We have began developing the site for mobile first
- To view the current changes, view the rendered results at a width of less than 1024px
- In Figma, use the page DEVELOPMENT for reference

### Albert's notes

I've been developing with the idea to separate items into their own components and lay them out responsively on the page. I'm not worrying about the content just yet. We need to work on functionality and basic animation of the sidebar, navigation comp, etc

### David's notes

a place for your notes and thoughts

---

## To-do items

- TESTING

  - AT tables / required fields breaks all the things

- index.js page

  - the layout does not stretch to full screen on various mobile devices (maybe to do with h-screen class?)

- Hooks (all Airtable hooks)
- Cannot get the hooks to authenticate to Airtable with process.env variables
- I've been specifying the keys in plain text during dev, removing when pushing to the repo (annoying as hell- lol)

- NodeGraph component

  - Mucho work is needed, too much to list here
  - Need to correct coloring
  - Create a parameter that specifies selector color and the selected filter
  - Node sizing, gravity, distance, etc
  - Node tooltips
  - font-sizing
  - link colors (default and filtered)

- Sidebar component

  - sidebar needs to move to the right-side at min-width 1024px (through Tailwind)
  - 'open' functionality (slide up / slide out effect)
  - expand icon needs to stay at the top of the container when scrolling (and expanding)

- ArtistsAndArtwork component

  - This needs to be refactored to take props and render according to our mockup
  - The idea is that we can use this one component to display a picture (artwork or artist bio pic?) and associated data

- Header component

  - layout/transition of mobile icon / desktop nav elements (about, home, videos)
  - responsive layout appears to not work - logo is not centered during repositioning

- Navigation component

  - layout nav items (nav items need to be created - see below)

- Node component

  - layout new components: filter title, zoom

- Create components
  - Nav items (we need to determine if we're using radio btns)
  - Footer (for copyright, logos, etc)
  - Filter Title (lives in desktop view at the top of the Node graph)
  - Zoom component (lives in desktop view for zooming into Node graph)
