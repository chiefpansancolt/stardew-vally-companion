# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-04-05

### Added

#### Playthrough Management
- Create playthroughs manually (build wizard) or by uploading a PC save file
- Multi-step create wizard: character info → bundle selection → review
- Community Center and Joja bundle modes (standard and remix)
- Edit playthrough modal with per-section editing
- Switch between multiple playthroughs from the sidebar
- Full import / export / reset in settings

#### Farm
- Character page — skills (Farming, Mining, Foraging, Fishing, Combat), professions, mastery levels, tools, fishing rods, backpacks, and pet tracking
- Buildings page — add/remove farm buildings and track animal counts per building
- Animals page — track animal friendship and produce
- Ginger Island page — golden walnut count, parrot upgrades, and island progress

#### Collections
- Collections overview with aggregate shipped/donated/caught statistics
- Crops — shipped status, seasons, sell prices with profession bonus calculator
- Forageables — all forageable items with season filters
- Animal Products — eggs, milk, and animal-derived artisan goods
- Artisan Goods — profession-aware price calculator for all artisan products
- Fish — caught tracking with location, season, weather, and time-of-day filters; category filter
- Cooking — recipe learned and cooked status
- Crafting — recipe learned and crafted status
- Artifacts — museum donation and found-in-world tracking
- Minerals — geode minerals, gemstones, and museum donation status
- Monster Loot — drops across all monster categories
- Special Items — rarecrows, furniture, hats (with price), rings, boots, and trinkets

#### Community & Progression
- Community Center — room-by-room bundle completion with item-level tracking
- Joja Mart — Joja membership development project milestones
- Villagers — heart levels, birthdays, gift preferences, marriage eligibility, and gift tracking
- Quests — special order and story quest completion
- Grandpa's Evaluation — score tracker and candle count
- Mines & Monsters — floor progress, elevator level, and monster eradication goals
- Perfection — overall perfection percentage with per-category breakdown
- Calendar — seasonal crop, forageable, and birthday calendar view
- Items Needed — aggregated view of items still needed across active goals
- Town — town and world unlock tracking
- Gear — equipment tracking

#### Infrastructure
- localStorage persistence — all data stored locally, no backend required
- Save file parser — map PC save XML directly to tracked game state
- `stardew-valley-data` integration — game data queries for all pages
- Sidebar navigation with collapsible playthrough switcher
- Toast notifications (success, error, info, warning)
- URL state service — filter state synced to query params
- Page header component with breadcrumb and contextual actions
- Filter popovers for collection pages (shipped, season, donation, marriage, etc.)
- Navy section and white card design system with shared UI components
- CI/CD — GitHub Actions workflows for lint + build and Vercel deployment
- Dependabot — automated dependency updates with grouped PRs
