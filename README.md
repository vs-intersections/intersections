# Intersections Notes

## General Overview

- We have began developing the site for mobile first
- To view the current changes, view the rendered results at a width of less than 1024px
- In Figma, use the page DEVELOPMENT for reference

### Albert's notes

I've been developing with the idea to separate items into their own components and lay them out responsively on the page. I'm not worrying about the content just yet. We need to work on functionality and basic animation of the sidebar, navigation comp, etc

Personal To-do:

- Get node graph to render at same VX, VX, X and Y (it currently jumps) - still an issue - maybe not a huge one?
- Graph zooming

SCHEDULE

Wednesday

- Infinite Scroll mobile navigation (DAVID)
- ~~Mobile Sidebar expanding/compressing animation (DAVID)~~
- Link Artists to collab artists (ALBERT)
- Sidebar content and media (ALBERT)
- Sidebar title centering (it is not currently centered within the tab) (ALBERT)
- ~~On Location view, when clicking 'Buffalo Thunder", the Artist field is empty and media and themes are IDs instead of names (ALBERT)~~
- ~~On Theme view: click Franklin's in Location, then click Fantasy in Theme - the theme node links are inconsistent (ALBERT)~~
- Render images in sidebar content (ALBERT)
- Add links for all metadata in sidebar (ALBERT)
- Graph aspect ratio is fucky: click any dropdown and select something, open sidebar and select something else from dropdown (keep sidebar open), then collapse sidebar (ALBERT)
- Alphabetically list items in Navbar dropdowns (ALBERT)
- Min-height the sidebar images (some of them are rendering too short) (ALBERT)
- ~~Find a way to parse double-spaces as delimiters from Airtable bios and descriptions (ALBERT)~~
- ~~Title in Artwork sidebar content is not populating (ALBERT)~~
- Data appears to be rendering multiple times during events like clicking or expanding sidebar

Thursday

- Pages: Video and about (DAVID)
- Node graph zooming (ALBERT - SECONDARY)

### David's notes

- ~~Display Link data in sidebar~~
- Infinite Scroll mobile navigation (DAVID)
- ~~Info mobile sidebar expanding/compressing animation (DAVID)~~
- Mobile Sidebar expanding/compressing animation (DAVID)
- ~~Mobile hamburger menu (DAVID)~~
- Pages: Video and about (DAVID)

---

## To-do items

- TESTING

  - AT tables / required fields breaks all the things

- index.js page

  - the layout does not stretch to full screen on various mobile devices (maybe to do with h-screen class?)

- NodeGraph component
  - zooming
  - layout new components: zoom
