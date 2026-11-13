# Hiking Time Estimator (步程試算)

Estimate how long a hiking route will take from a GPX track. Accounts for grade, terrain, rain, pack weight, and group pace.

**Live demo:** https://shainyhsu.github.io/class-hiking-calculator/

## Features

- Default model: average of **Tobler’s hiking function** and **DIN 33466**
- Upload past GPX logs and fit a group-specific **Lorentz speed curve** (Gauss–Newton); once fitted, that curve becomes the base speed
- Per-segment tags: normal trail / roots & rock / muddy grass / forest road, heavy vs light pack, rain, running
- Elevation profile, checkpoints, timetable, short stops, and an optional 10% buffer
- Export image, GPX (with segment and timing settings), or plain-text summary
- Terrain sunrise/sunset and direct-sun shading on the profile
- Traditional Chinese / English interface and a time-zone setting
- Light/dark switch (dark by default); two-column layout on laptops and desktops

## How to use

1. Open the link above (fully client-side; nothing is uploaded to a server)
2. Load a route GPX, or try the sample
3. Adjust settings, terrain segments, and checkpoints as needed
4. Optionally upload historical GPX files to optimize the Lorentz parameters
5. Review the timetable and summary, then share or download

## Tech

Single HTML page on GitHub Pages. No backend, no install. Formula sources and limitations are documented in the in-app “how the model works” section.

## License

Copyright (c) 2026 Shainy Hsu. All rights reserved. See [LICENSE](LICENSE).

## Version history

Newest first. Times are Taiwan time (UTC+8). Also kept in [CHANGELOG.md](CHANGELOG.md).

- V73 | 2026-11-13 09:36 | Added a classic favicon.ico tab icon for older browsers and search tools.
- V72 | 2026-11-13 09:20 | Added a tab icon and an "All tools" link in the footer; the km range boxes and the GPX upload now have labels for screen readers, and the keyboard focus ring shows again.
- V71 | 2026-11-13 08:05 | In the portrait A4 picture the timetable runs in two columns, so each name sits close to its time and more of it fits on a page; a tag that leaves no room beside a name goes on its own line under it
- V70 | 2026-11-13 07:40 | The A4 share picture fills its pages: when it runs just over a page (up to about 18%), the whole layout is shrunk to fit one page fewer, and the room left on a nearly full page is spread between its parts instead of sitting blank at the bottom
- V69 | 2026-11-13 01:40 | One link per plan: sharing a plan again after changes asks whether to update the old link (everyone who has it opens the new version) or make a new one. The save panel, picture footer, GPX and copied text show the case code, version and time, so people can check they have the newest
- V68 | 2026-11-11 19:35 | The share picture is now A4 JPG (300 dpi, portrait 2,480 × 3,508 px or landscape), split onto more pages when long, with a live A4 preview in the Share card; new "Mirroring" button adds the same way back from the destination (sections and points mirrored) for day hikes up and down one trail, press again to undo
- V67 | 2026-11-11 11:45 | Pasting a save link into a tab that already has the page open now loads it too (before, only a fresh open did)
- V66 | 2026-11-11 11:25 | Save links are now short (about 90 characters): the save is encrypted in your browser, only the scrambled copy is stored online, and the key stays in the link, so whoever has the link can open it without signing in; the full link is used if the short one can't be made
- V65 | 2026-11-11 10:07 | New license terms: free to use in a browser for personal, work, school or club use, and the results you make are yours to share; copying, paid services built on it, and AI training need written permission. A License link sits at the bottom of the page
- V64 | 2026-11-11 09:15 | Save button at the top: share or copy a save link, or download and open a .json file, to move the whole plan (route, sections, points, settings, fitted parameters) to another device; it still autosaves in the browser
- V63 | 2026-11-10 00:18 | Example pages are hidden from search engines (noindex), including the three already on the site
- V62 | 2026-11-10 00:18 | Added a link-preview image (1200×630) so shared links show a picture in LINE, Facebook and other apps
- V61 | 2026-11-09 11:24 | On wide screens the summary and share cards move to the left column (route file, summary, settings, share)
- V60 | 2026-11-09 10:16 | Two-column layout on laptops and desktops (route file and settings on the left, profile, sections, timetable and summary on the right); phones unchanged; licence changed to an English “All rights reserved” notice
- V59 | 2026-11-09 09:23 | Added a light/dark switch at the top right, dark by default and shared with the other tools
- V58 | 2026-11-08 20:28 | Clearer page title, search description and link-preview text for search engines and AI search; language and character-set fixes
- V57 | 2026-11-05 10:07 | Crowded points on the profile are lifted apart, each with a thin line to its place; the share picture can be portrait or landscape
- V56 | 2026-11-05 09:25 | The downloaded GPX keeps the sections, points and start time, and loading it again restores them; numbers shown for narrow sections
- V55 | 2026-11-05 07:50 | Point numbers removed from the copied text and from the GPX waypoint names
- V54 | 2026-11-05 07:03 | Profile pinned under the top bar while editing sections or the timetable, both folded by default; points can be dragged along the profile; boundaries no longer snap to nearby points; share text laid out
- V53 | 2026-11-04 20:04 | Added “Share” to the pinned top bar
- V52 | 2026-11-04 19:35 | Made the 10% buffer the “Margin” option, ticked by default; redesigned the summary
- V51 | 2026-11-04 17:46 | Removed the fatigue calculation; fixed 10% buffer on (moving + stops on the way)
- V50 | 2026-11-04 14:37 | Revised the English wording; simplified the time-zone and language buttons
- V49 | 2026-11-04 13:53 | Added an English interface (instant Chinese/English switch) and a time-zone setting; made section notes collapsible
- V48 | 2026-11-04 10:34 | Turned the fatigue calculation off by default and re-fitted the base; calibration better separates stops, recording gaps and altitude drift
- V47 | 2026-10-30 12:09 | Renamed terrain “Steep roots” to “Roots & rocks”; terrain is chosen by the surface
- V46 | 2026-10-30 02:16 | Split stops on the way into “Uphill & flat” and “Downhill”; slow climbs on steep slopes count as moving, judged by the change in altitude
- V45 | 2026-10-28 09:46 | Example pages always open in the current version, with an info bar
- V44 | 2026-10-28 06:08 | Terrain sunrise and sunset now cover the whole day’s route, with their positions marked; the timetable shows “Shaded by terrain”
- V43 | 2026-10-28 05:28 | Added terrain sunrise/sunset and direct-sun shading on the elevation profile; auto points at section boundaries; “Download GPX”
- V42 | 2026-10-27 17:15 | “Run” now says what it changes
- V41 | 2026-10-27 14:20 | Tapping a section-boundary handle adds a point or splits the section there
- V40 | 2026-10-27 12:45 | Removed whole-page file sharing (sharing is the picture); added a copyright notice
- V39 | 2026-10-26 23:20 | Added picture sharing: route, profile and timetable in one image (e.g. for LINE)
- V38 | 2026-10-26 21:38 | Added sharing of the whole page as one HTML file
- V37 | 2026-10-26 21:16 | Section times now add up to the timetable’s moving time
- V36 | 2026-10-26 20:16 | Light-pack load can be 0 kg; shorter header; example corrected
- V35 | 2026-10-26 15:54 | Capped running speed on steep descents over roots or mud
- V34 | 2026-10-26 12:20 | Minor fixes
- V33 | 2026-10-26 12:06 | Minor fixes
- V32 | 2026-10-26 11:32 | Fatigue became a dynamic pool: builds with grade and load, recovers during stops
- V31 | 2026-10-26 09:41 | Minor fixes
- V30 | 2026-10-26 08:46 | Minor fixes
- V29 | 2026-10-26 08:29 | Pandolf body weight fixed at 50 kg
- V28 | 2026-10-26 07:41 | Fatigue as a slowdown with moving time (about ×0.92 per 5 hours), with an on/off box
- V27 | 2026-10-26 07:04 | Minor fixes
- V26 | 2026-10-25 23:02 | Added a fatigue slowdown (about 8% per 5 moving hours, at most 30%)
- V25 | 2026-10-25 21:54 | Added body weight and light-pack load for the Pandolf conversion
- V24 | 2026-10-25 21:34 | Fitted parameters show on upload and apply only with “Apply fit”
- V23 | 2026-10-25 21:16 | After a Lorentz fit, team speed comes from the fitted parameters
- V22 | 2026-10-25 20:55 | The Lorentz fit (past GPX records) replaced the own-record calibration
- V21 | 2026-10-25 20:01 | Added an optional Lorentz fit from past GPX records (Gauss–Newton); without enough data the Tobler + DIN mix stays
- V20 | 2026-10-23 19:51 | Minor fixes
- V19 | 2026-10-23 19:43 | Explained the light shading on the profile
- V18 | 2026-10-23 19:31 | Added dawn to the light labels
- V17 | 2026-10-23 19:22 | Light labels: daylight, dusk and night (civil twilight)
- V16 | 2026-10-23 17:27 | Profile tools: every-km and every-hour points, delete mode with undo; timetable before the summary; colour-coded profile axes
- V15 | 2026-10-23 13:16 | Moved “Settings” up next to the route file; header links jump to their card
- V14 | 2026-10-23 12:28 | Section boundaries draggable on the elevation profile; “Run” per section; terrain as tap choices; pinned result bar
- V13 | 2026-10-22 21:22 | Calibration note for loads other than 13 kg
- V12 | 2026-10-22 20:57 | Team speed (uphill & flat, downhill) replaced the overall time factor; calibration from a timed GPX record
- V11 | 2026-10-22 18:42 | Clock times along the top of the profile; “class” dropped from the title
- V10 | 2026-10-22 18:04 | Checkpoints numbered from 0 at the start; km ticks on the profile
- V9 | 2026-10-22 16:55 | Rests and buffers merged into “Stops on the way”, in minutes per hour (default 13)
- V8 | 2026-10-22 16:22 | Heavy pack and rain set per section; each terrain shows the section’s speed; Taiwan time only
- V7 | 2026-10-22 11:46 | Example is the actual 10/20 day-1 walk, with its stops
- V6 | 2026-10-22 10:19 | Example starts where the 10/20 walk actually started
- V5 | 2026-10-22 09:26 | Re-fitted with the 10/20–21 Siji Forest Road walk; added light-pack farm road (luggage by vehicle)
- V4 | 2026-10-11 14:42 | Example route updated
- V3 | 2026-10-11 13:49 | Added light-pack sections (luggage sent ahead), converted with Pandolf’s equation; new example: 10/20 day 1
- V2 | 2026-10-08 15:25 | Changed the model to a 50/50 mix of Tobler and DIN 33466, re-fitted to the 10/6 walk; altitude correction
- V1 | 2026-10-08 11:42 | First public release: walking times for a school class carrying 13 kg, calibrated on the 10/6 walk; dry vs rain/fog, rests, terrain and real distance
