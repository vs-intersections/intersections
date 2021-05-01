# Intersections Notes

## General Overview

- We have began developing the site for mobile first
- To view the current changes, view the rendered results at a width of less than 1024px
- In Figma, use the page DEVELOPMENT for reference

### Albert's notes

I've been developing with the idea to separate items into their own components and lay them out responsively on the page. I'm not worrying about the content just yet. We need to work on functionality and basic animation of the sidebar, navigation comp, etc

Personal To-do:

- Get node graph to render at same VX, VX, X and Y (it currently jumps) - still an issue - maybe not a huge one?
- Node Haloing - LOL - maybe.... it's wack
- Node tooltips
- Graph zooming

Other things:

- First query of data needs to have all meta data
- Tie this data to its respective node
- The nodes will also have a 'selected' property with a selector that has been chosen (artist, theme, etc)
- The 'selected' property will only be populated the selected node(s) (noting here for my own sanity)
- I need to figure out why the graph repopulates with additional nodes when new nodes/links are created from linkGenerator
- look at the data before and after
- there be your answer

SCHEDULE

Saturday

- Node linking (medium and influence) - medium doesn't link children properly

Sunday

- Child node haloing
- Node graph zooming

Monday

- Mobile Sidebar expanding/compressing animation
- Info mobile sidebar expanding/compressing animation

Tuesday

- Infinite Scroll mobile navigation
- Navigation filtering selectors (styling and updating node graph)

Wednesday

- Sidebar content and media
- Sidebar title centering (it is not currently centered within the tab)

Thursday

- Pages: Video and about
- Mobile hamburger menu

### David's notes

a place for your notes and thoughts

IDEA: Add node context - use nodecontext to track to state of

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

  - INFO tab needs to stay at the right side of the screen responsively (currently does not)
  - expand icon needs to stay at the top of the container when scrolling (and expanding)

- ArtistsAndArtwork component

  - This needs to be refactored to take props and render according to our mockup
  - The idea is that we can use this one component to display a picture (artwork or artist bio pic?) and associated data

- Header component

  - layout/transition of mobile icon / desktop nav elements (about, home, videos)
  - responsive layout appears to not work - logo is not centered during repositioning

- Navigation component

  - When a node is clicked, the dropdown no longer functions correctly

- Node component

  - layout new components: filter title, zoom

- Create components
  - Nav items (we need to determine if we're using radio btns)
  - Footer (for copyright, logos, etc)
  - Filter Title (lives in desktop view at the top of the Node graph)
  - Zoom component (lives in desktop view for zooming into Node graph)
