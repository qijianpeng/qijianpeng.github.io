# Edge Computing Tool Explorer

The public tool lives at `/repositories/edge-computing/` and is linked from the top of `/repositories/`. It uses the existing Jekyll/al-folio layout and GitHub Pages deployment. All filtering happens in the browser, using the published static JSON; visitors do not call the GitHub API.

## Data ownership and evidence

- `_data/edge_catalog/README.snapshot.md`, `inventory.json`, and `source.json`: The pinned upstream inventory and source line ranges. The initial snapshot is commit `96b38d3cb95bdc38ef49d9853986172854e93426`, retrieved September 8, 2026, with 218 primary resources.
- `_data/edge_catalog/summaries.tsv`: Reviewed Chinese summaries keyed by stable ID. English summaries default to the first sentence of the source description; neutral rewrites can be entered in `curated.json` as `summaryEn`.
- `_data/edge_catalog/curated.json`: Display names, aliases, corrected URLs, use cases, source-backed claims, capability states, project/version notes, and explicit paper-name mappings. Sync never writes this file or the translations.
- `_data/edge_catalog/paper.json`: Historical survey archive. The builder does not read it, and the public page does not display or use its rows. Legacy `paperNames` / `paperClaims` fields in curated annotations are archival only.
- `_data/edge_catalog/official.json`: URLs, retrieval dates, and Git blob SHAs for checked official READMEs. `official:<owner>/<repo>` refers to these records.
- `_data/edge_catalog/verification.json`: Manual evidence audit keyed by stable ID. Each resource has five bilingual dimension slots, dated/ versioned sources, supported feature claims, and optional access notes. Sync never writes this file. Resources with unavailable technical sources retain null dimension slots and a concrete access note. Access failures are not capability evidence.
- `assets/data/edge-tools.json`: Generated, public data. Regenerate it after changing reviewed annotations. Do not edit the generated file directly.

All filter claims have a source. The upstream inventory (`readme`) supplies identity, categories and use cases. Active capabilities and dimension evidence must cite a project source with `kind: official`: Project websites, manuals, API references, fixed-commit source files, or project technical deliverables. Research sources (`primary`) may remain in manual archival records but are excluded from published dimensions, filters and capability states. A filename ending in PDF is not itself a research paper; classify it by its actual content and authorship.

A claim consists of `facet`, `value`, `source`, and an optional bilingual `note`. Features use `supported`, `unsupported`, `unknown`, or `not-applicable`. Describe the actual interface, output, and configuration conditions. A missing project source leaves the internal capability state unknown; it does not generate a user-facing placeholder. A survey flag must never restore support.

LEAF Java, Mininet, Mininet-WiFi, and historical versus current runtime versions are reviewed separately. SimEdgeIntel retains EdgeSim as an alias. The inventory categories include non-software resources; inclusion does not imply that every resource is maintained or open-source.

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

After applying, review changed descriptions and outdated claims, translate added resources, and add only explicitly sourced attributes. When both a name and URL change, reconcile the identity manually before release. Use `clearFacets` to replace obsolete filters with current project claims. Categories such as packet-level simulation must be justified by the project’s stated model, not inferred from a survey row or automatically inherited from a dependency.

```sh
npm run catalog:build
npm run test:catalog
npm run catalog:check
```

The build fails if a new resource lacks a reviewed Chinese summary or if an annotation references an absent source. Inspect unusual links and the current inventory before publishing. Updated source information is not automatically a current capability verification.

## Updating a dimension review

Edit `verification.json` after reading the actual source, not just a search snippet or a repository name. `dimensions` must contain exactly five entries in this order: Computing paradigms, resource modeling, performance metrics, resource management, usability. Each non-null entry has `text: {en, zh}` and a `source` ID. Sources need a URL, access date and version (prefer a full commit SHA and a file URL for code). Describe API names, configuration requirements and measurement scope where relevant.

Set a feature only when the source establishes that feature. A fixed metric is not an arbitrary metric interface; event scheduling is not application task scheduling; deployment code does not prove a simulator runs real applications. External plotting tools and optional extensions must be named. Keep original research papers as `primary` archive sources; they do not enter the public capability catalog. The access date is not the implementation release date.

Use `clearFacets` when replacing outdated facets, then provide the new sourced claims. DFaaS, for example, replaces its old Containernet engine with the current documented Kubernetes/OpenFaaS dependencies. Historical source material remains in the manual archive. Do not reuse capabilities of a successor as if they were capabilities of every historical version (e.g., LiteRT versus TensorFlow Lite, or ExecuTorch versus PyTorch Mobile).

A resource may have evidence across all five dimensions without a documented claim for every required feature. Internal unknown states remain for evidence integrity, but are never rendered as status badges or repeated comparison cells. The page shows concrete dimension descriptions and documented capability lists. Missing dimensions for inaccessible resources are summarized once in the source-availability note; reference resources have no capability comparison. The audit does not mean every tool was installed or benchmarked. Current unresolved dimensions and access issues are listed in `docs/edge-evidence-audit.md`; update that report with subsequent reviews.

## Behavior

- Facet choices within a group use OR; groups use AND. All selected required capabilities must be satisfied.
- Required capability filters always use direct positive project evidence. The broad candidate checkbox was removed. Legacy URLs with `includeUnknown: true` retain their language, search, facets, requirements, and shortlist but normalize that retired flag to false.
- Search covers names, aliases, English and Chinese summaries, facet values, and both languages of the five reviewed dimensions. Text search does not create positive capability claims. Results are alphabetical. Category bars show matching counts with the category constraint removed; sidebar counts show total catalog coverage.
- Up to four comparable resources can be shortlisted. References are excluded. Filtering and language changes preserve the shortlist. `lang=en|zh` and a JSON-encoded `state` query parameter capture search, facets, required capabilities, comparison IDs, and a retired compatibility flag. Invalid/obsolete values are sanitized.
- The first 24 matching resources render initially; `Show more resources` reveals another 24. Comparison always uses the selected IDs, independent of the current result page.
- A dataset load error provides retry and the source repository link. JavaScript-disabled visitors can follow the complete original list.

## Build and publish

The production workflow uses Ruby 3.2.2, Bundler 2.5.7, Node.js 22, Jekyll, and the locked PurgeCSS dependency. It runs catalog validation before building. PurgeCSS scans `.mjs` files and preserves the explorer's dynamic CSS classes.

Each build adds the same release timestamp to the catalog URL and the JavaScript entry point. The entry point forwards that version to its module imports, so a refreshed page does not combine cached labels, filter logic, or data from an earlier release.

If the host Ruby cannot build the site, the isolated build image contains the same Ruby and Bundler versions plus ImageMagick and Jupyter:

```sh
docker build -f bin/edge-catalog/Dockerfile -t codex-edge-site-build:3.2.2 .
docker run --rm -v "$PWD:/site" -e JEKYLL_ENV=production codex-edge-site-build:3.2.2 bundle exec jekyll build
npx purgecss -c purgecss.config.js
python3 -m http.server 8765 --bind 127.0.0.1 --directory _site
```

Open the real generated page at `http://127.0.0.1:8765/repositories/edge-computing/`. Check desktop and mobile layouts, both themes and languages, search and filters, strict capability matching, four-item comparison, sharing, browser Back, source links, keyboard navigation, and the repositories entry. Do not report a static mockup as a successful Jekyll/browser build.

Publishing the reviewed change to `master` triggers the existing deployment workflow. Confirm that the matching commit's deployment succeeds and verify the public route and its data after release. Revert the feature commit through normal Git history if a rollback is needed; never force-push over unrelated work.
## September 2026 filter maintenance update

The [filter audit](edge-filter-audit.md) records the review of all 218 entries, coverage changes, and per-resource assignments. Add explicit filter values to the corresponding `verification.json` dimension using `facets`, for example:

```json
{
  "text": { "en": "Cloud, edge, and mist workload simulation.", "zh": "云、边缘与雾端工作负载仿真。" },
  "source": "Existing official source ID",
  "facets": { "paradigm": ["Cloud", "Edge", "Mist"] }
}
```

The source must describe each assigned value. The build publishes these tags alongside the text, with the same source reference. It does not infer tags from keywords, project names, or parent-engine capabilities. Use a separate sourced `claims` entry when a new document supports additional tags, and retain version/configuration conditions. Update `facetReviewedAt` and `facetReviewNote` after review. General-purpose and reference resources may have no paradigm; this does not mean that a possible application is unsupported.

The regression suite checks that every dimension tag reaches the public filters and exercises real catalog combinations. Run `npm run catalog:build`, `npm run test:catalog`, and `npm run catalog:check` after editing. Keep the American-English labels and corresponding Chinese labels in `labels.mjs` synchronized for new terms.

The page header links directly to awesome-edge-computing and the survey. The citation section identifies the arXiv preprint and offers `assets/bibliography/edge-computing-survey.bib`; this bibliographic reference is separate from project capability evidence.

## Engine tags and icons

The Core engine filter includes base-engine entries as well as projects that explicitly use the engine. Preserve conditions for optional integrations and version-specific execution stacks. Do not tag an engine merely because a README lists its model format or compares against it. For composable scenarios, state the required components or extension interfaces instead of implying a ready-made preset. See [the September 9 review](edge-label-review-2026-09-09.md) for examples.

`assets/js/edge-explorer/icons.mjs` supplies local decorative SVGs for categories, facets, and paradigms. Add a mapping when a new category needs its own symbol; retain visible text and `aria-hidden="true"` / `focusable="false"` on icons. Cards and comparison tables show all recorded paradigm and engine tags.


## Network model and protocol maintenance

`_data/edge_catalog/network.json` is the authoritative network facet. Keep one record per stable inventory ID, including resources with only a scope description or an actual access outcome. `entries` contain `values`, `scope`, `source`, and bilingual `note`; the builder rejects missing reviews and non-project evidence. The README sync command leaves this manual file unchanged. Newly synchronized IDs require a reviewed record before generation succeeds.

The six scopes distinguish protocol simulation, analytical abstraction, real networking, application interfaces, optional integrations, and data/trace resources. Record the installed module, compatible version, firmware, backend, and limitations in the note. Do not copy all protocols from a dependency. Keep original evidence in `verification.json`; the network file overrides older protocol tags while preserving the other five-dimension annotations.

After editing, run `npm run catalog:build`, `npm run test:catalog`, and `npm run catalog:check`. Inspect both the expandable network section on a result card and the network row in the comparison table in English and Chinese. When a README conflicts with code, link the exact implementation and describe which version it establishes.

The complete September 9 network audit is in [the review register](edge-network-review-2026-09-09.md).
