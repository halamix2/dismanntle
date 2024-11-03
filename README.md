# dismanntle

This template should help get you started developing with Vue 3 in Vite.

## Loading default badge

- If player is on a MVM map - select corresponding badge
- ~~If only one badge has any progress on it - select it~~ - skipping for now
- Default to Two Cities otherwise

## Changing current tour

- based on current mission

## Wanted options

- support for vanity name instead of steamid

## GET parameters

- required:
  - key
  - steamid
- optional:
  - css - link to a custom css
  - refresh(rate) - r - ri + rm
  - refresh items delay - ri
  - refresh map delay - rm
  - theme?
  - defaultMission
  - changeMission = true - reload the URL or keep the current mission no matter what (except the first load)?

## IDs

Website uses these ID internally to identify medals/maps

- tour_intermediate1 - Oil Spill (870)
  - map - Name (bit in bitfield)
  - mvm_coaltown_intermediate - Cave-in (1)
  - mvm_coaltown_intermediate2 - Quarry (2)
  - mvm_decoy_intermediate - Doe's Doom (3)
  - mvm_decoy_intermediate2 - Day of Wreckening (4)
  - mvm_mannworks_intermediate - Mean Machines (5)
  - mvm_mannworks_intermediate2 - Mannhunt (6)
- tour_advanced1 - Steel Trap (726)
  - mvm_coaltown_advanced - Ctrl+Alt+Destruction (1)
  - mvm_coaltown_advanced2 - CPU Slaughter (2)
  - mvm_decoy_advanced - Disk Deletion (8)
  - mvm_decoy_advanced2 - Data Demolition (9)
  - mvm_mannworks_advanced - Machine Massacre (15)
  - mvm_mannworks_ironman - Mech Mutilation (16)
- tour_advanced2 - Mecha Engine (975)
  - mvm_bigrock_advanced1 - Broken Parts (1)
  - mvm_bigrock_advanced2 - Bone Shaker (2)
  - mvm_decoy_advanced3 - Disintegration (3)
- tour_advanced3 - Two Cities (1066)
  - mvm_mannhattan_advanced1 - Empire Escalation (1)
  - mvm_mannhattan_advanced2 - Metro Malice (2)
  - mvm_rottenburg_advanced1 - Hamlet Hostility (3)
  - mvm_rottenburg_advanced2 - Bavarian Botbash (4)
- tour_expert1 - Gear Grinder (871)
  - mvm_coaltown_expert1 - Cataclysm (1)
  - mvm_decoy_expert1 - Desperation (2)
  - mvm_mannworks_expert1 - Mannslaughter (3)

TODO: map these IDs to names

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
