# Edge Computing Tool Explorer

The public tool lives at `/repositories/edge-computing/` and is linked from the top of `/repositories/`. It uses the existing Jekyll/al-folio layout and GitHub Pages deployment. All filtering happens in the browser, using the published static JSON; visitors do not call the GitHub API.

## Data ownership and evidence

- `_data/edge_catalog/README.snapshot.md`, `inventory.json`, and `source.json`: The pinned upstream inventory and source line ranges. The initial snapshot is commit `96b38d3cb95bdc38ef49d9853986172854e93426`, retrieved September 8, 2026, with 218 primary resources.
- `_data/edge_catalog/summaries.tsv`: Reviewed Chinese summaries keyed by stable ID. English summaries default to the first sentence of the source description; neutral rewrites can be entered in `curated.json` as `summaryEn`.
- `_data/edge_catalog/curated.json`: Display names, aliases, corrected URLs, use cases, source-backed claims, capability states, project/version notes, and explicit paper-name mappings. Sync never writes this file or the translations.
- `_data/edge_catalog/paper.json`: Structured records of Tables I–V from arXiv:2505.09995v1. Forty-two current inventory resources map to all five tables. Merged paper rows are explicitly mapped to the separate catalog entries. The README’s EdgeSim URL points to SimEdgeIntel; its display name and explicit paper mapping now reflect that identity. Phantom remains absent from the inventory and is not equated with Shadow.
- `_data/edge_catalog/official.json`: URLs, retrieval dates, and Git blob SHAs for checked official READMEs. `official:<owner>/<repo>` refers to these records.
- `_data/edge_catalog/verification.json`: Manual evidence audit keyed by stable ID. Each resource has five bilingual dimension slots, dated/ versioned sources, supported feature claims, and optional access notes. Sync never writes this file. Null dimensions indicate insufficient evidence; access failures are not capability evidence.
- `assets/data/edge-tools.json`: Generated, public data. Regenerate it after changing reviewed annotations. Do not edit the generated file directly.

All filter claims have a source. A source ID is either `readme` (the tool's pinned README lines), `paper-1` through `paper-5`, an `official:` ID, or an `audit:` ID. Audit sources distinguish official material from original research papers (`primary`). Add a new official source before citing it. A claim consists of `facet`, `value`, `source`, and optional bilingual `note`. Features use `supported`, `unsupported`, `unknown`, or `not-applicable`, with a source for affirmative or negative assertions. Absence is unknown, not false. Inherited paper shorthand remains visible in original fields and is not expanded into undocumented capabilities.

The LEAF inventory entry points to **LEAF Java**, while the survey combines information about Java and Python implementations. Its original paper fields remain visible, but only explicitly checked Java attributes drive its filters. Mininet and Mininet-WiFi display the survey's combined-row caveat. OpenVINO's missing upstream link is corrected in the curated layer. The catalog preserves source categories, including non-software resources; inclusion is not a claim that every entry is open-source or currently maintained.

## Review and synchronize

Install the locked dependencies with Node.js 22 or later:

```sh
npm ci
```

Choose a full upstream commit SHA, then run a read-only preview:

```sh
npm run catalog:sync -- --commit FULL_40_CHARACTER_COMMIT_SHA
```

The report lists added, changed, removed, and unusual resource links. Review those differences against the source. A renamed entry keeps its stable ID when its URL is unchanged. Ambiguous identities must be resolved before applying. Removed entries disappear from the current inventory while their curated annotations remain available for review; no automatic deletion of annotations occurs.

Apply that exact reviewed commit:

```sh
npm run catalog:sync -- --commit FULL_40_CHARACTER_COMMIT_SHA --apply
```

For an offline source copy, add `--file /absolute/path/README.md`; the caller must ensure the file corresponds to the stated SHA. `--date YYYY-MM-DD` records a supplied retrieval date; otherwise the command uses the current UTC date.

After applying, review changed descriptions and outdated claims, translate added resources, and add only explicitly sourced attributes. When both a name and URL change, reconcile the identity manually before release. Use `clearFacets` to replace obsolete paper-derived filters with official claims, and retain an explanatory bilingual note and the original paper record. Set `paperClaims: false` when paper attributes describe a different implementation; this preserves the raw paper record but prevents it from entering the active filters.

```sh
npm run catalog:build
npm run test:catalog
npm run catalog:check
```

The build fails if a new resource lacks a reviewed Chinese summary or if an annotation references an absent source. Inspect unusual links and the current inventory before publishing. Updated source information is not automatically a current capability verification.

## Updating a dimension review

Edit `verification.json` after reading the actual source, not just a search snippet or a repository name. `dimensions` must contain exactly five entries in this order: Computing paradigms, resource modeling, performance metrics, resource management, usability. Each non-null entry has `text: {en, zh}` and a `source` ID. Sources need a URL, access date and version (prefer a full commit SHA and a file URL for code). Describe API names, configuration requirements and measurement scope where relevant.

Set a feature only when the source establishes that feature. A fixed metric is not an arbitrary metric interface; event scheduling is not application task scheduling; deployment code does not prove a simulator runs real applications. External plotting tools and optional extensions must be named. Mark a source as `primary` for an original research paper, retaining its publication year in `version`; the access date is not the implementation release date.

Use `clearFacets` when replacing outdated facets, then provide the new sourced claims. DFaaS, for example, replaces its old Containernet engine with the current documented Kubernetes/OpenFaaS dependencies. Preserve the original survey fields. Do not reuse capabilities of a successor as if they were capabilities of every historical version (e.g., LiteRT versus TensorFlow Lite, or ExecuTorch versus PyTorch Mobile).

A resource may have evidence across all five dimensions while individual required features remain unknown. These are separate measures. The audit does not mean every tool was installed or benchmarked. Current unresolved dimensions and access issues are listed in `docs/edge-evidence-audit.md`; update that report with subsequent reviews.

## Behavior

- Facet choices within a group use OR; groups use AND. All selected required capabilities must be satisfied.
- `Include unverified candidates` permits unknown required features, lists those candidates after documented matches, and labels the unresolved requirements. Explicitly unsupported and inapplicable features never match.
- Search covers names, aliases, English and Chinese summaries, facet values, and both languages of the five reviewed dimensions. Text search does not create positive capability claims. Results are alphabetical within documented and tentative groups. Category bars show matching counts with the category constraint removed; sidebar counts show total catalog coverage.
- Up to four comparable resources can be shortlisted. References are excluded. Filtering and language changes preserve the shortlist. `lang=en|zh` and a JSON-encoded `state` query parameter capture search, facets, required capabilities, unknown inclusion, and comparison IDs. Invalid/obsolete values are sanitized.
- The first 24 matching resources render initially; `Show more resources` reveals another 24. Comparison always uses the selected IDs, independent of the current result page.
- A dataset load error provides retry and the source repository link. JavaScript-disabled visitors can follow the complete original list.

## Build and publish

The production workflow uses Ruby 3.2.2, Bundler 2.5.7, Node.js 22, Jekyll, and the locked PurgeCSS dependency. It runs catalog validation before building. PurgeCSS scans `.mjs` files and preserves the explorer's dynamic CSS classes.

If the host Ruby cannot build the site, the isolated build image contains the same Ruby and Bundler versions plus ImageMagick and Jupyter:

```sh
docker build -f bin/edge-catalog/Dockerfile -t codex-edge-site-build:3.2.2 .
docker run --rm -v "$PWD:/site" -e JEKYLL_ENV=production codex-edge-site-build:3.2.2 bundle exec jekyll build
npx purgecss -c purgecss.config.js
python3 -m http.server 8765 --bind 127.0.0.1 --directory _site
```

Open the real generated page at `http://127.0.0.1:8765/repositories/edge-computing/`. Check desktop and mobile layouts, both themes and languages, search and filters, unknown capability behavior, four-item comparison, sharing, browser Back, source links, keyboard navigation, and the repositories entry. Do not report a static mockup as a successful Jekyll/browser build.

Publishing the reviewed change to `master` triggers the existing deployment workflow. Confirm that the matching commit's deployment succeeds and verify the public route and its data after release. Revert the feature commit through normal Git history if a rollback is needed; never force-push over unrelated work.
