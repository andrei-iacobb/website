# instant-nav rig: andrei-portfolio

- BUILD: `EXPOSE_TESTING_API=1 pnpm build`, served with `pnpm start --hostname 127.0.0.1 --port 3102`.
- EXPOSE: `EXPOSE_TESTING_API=1` enables `experimental.exposeTestingApiInProductionBuild`; production builds omit it.
- RUN: `pnpm test:instant` runs Playwright against `INSTANT_BASE_URL` or `http://127.0.0.1:3102`.
- TEST USER: anonymous public visitor; no login, role, plan, flags, or seeded data are required.
- DRIFT: browser viewport and the optional Romanian language preference in local storage; shell markers are invariant across both.
- LOOP: local build -> start -> hard/soft navigation tests; fully agent-drivable. Port 3102 is dedicated to the rig and existing servers are not reused.
- LIVENESS: not applicable; each run starts the production artifact it just built.
- WALLS: GitHub and Forgejo data may be unavailable, so instant assertions target static headings rather than external data. Chromium must be installed once with `pnpm exec playwright install chromium`.
