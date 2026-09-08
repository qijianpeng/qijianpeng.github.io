# Edge Tool Evidence Audit — September 8, 2026

## Scope and limits

Reviewed all 218 inventory resources; 211 have additional source records. There are 1005 non-null bilingual dimension records and 171 resources with records across all five dimensions. A record may describe a boundary or a documented configuration; it does not establish every optional capability.

Across the 210 comparable resources and six required capabilities, documented support increased from 109 to 372; unknown cells decreased from 1,151 to 888. No unknown cell was converted to unsupported merely because documentation omitted it. Reference resources remain outside capability comparison.

The audit reads official documentation, APIs, selected implementation files, and original papers. It does not install or benchmark all projects. GitHub sources point to fixed commits; web sources include access dates and available version information. Full third-party documents are not republished.

## Identity and version corrections

- EdgeSim resolves to SimEdgeIntel; it now maps to all five survey tables.
- DFaaS replaces obsolete Containernet engine facets with its documented Kubernetes/OpenFaaS stack.
- Huawei archive inspected directly: Scoring code, task/resource CSV schemas and submission example are now documented; its SHA-256 identifies the reviewed archive.
- EUA dataset URL corrected to the official `swinedge/eua-dataset` repository.
- LEAF Java remains distinct from the survey’s combined Java/Python description.
- LiteRT successor APIs, historical PyTorch Mobile support and archived projects retain explicit version notes.

## Access or identity issues

| Resource | Review outcome |
| --- | --- |
| RECAP-DES | The Bitbucket endpoint returned only a JavaScript shell. The 2025 survey remains available; current source interfaces were not confirmed. |
| RECAP Simulator Framework | The former project URL now redirects to unrelated WordPress content; it cannot verify the original simulator framework. |
| ClawBox | The former product domain now hosts an unrelated AI resource hub; no current ClawBox specification was recovered. |
| FogAtlas | The project URL redirects to a Google sign-in page; public technical details were not accessible. |
| Neural Network Accelerator Comparison | The original comparison page returned HTTP 404; this remains a reference entry. |
| vivo Cell-Free Scheduling Dataset | The sharing page exposed no readable dataset description or schema; contents were not verified. |
| Eman's Edge Computing System For AI Applications | The original GitHub repository returned HTTP 404. Its implementation cannot be verified from that endpoint. |
| CLOUDS Laboratory | The original page provides a redirect to the CLOUDS laboratory; it is an institutional reference, not a comparable tool. |
| Explore Edge Computing | The original website failed TLS hostname validation; its current directory contents could not be verified. |

## Dimensions needing further evidence

The following slots remain null in the manual review. Where available, the page offers the original survey row separately. Blank/NaF values remain unknown.

| Resource | Unresolved dimensions |
| --- | --- |
| Artery | Performance metrics |
| CloudSim Plus Automation | Performance metrics |
| Cooja | Resource management |
| CORE | Performance metrics |
| EasiEI | Performance metrics |
| FogNetSim++ | Performance metrics, Resource management |
| gem5 | Resource management |
| iTETRIS | Performance metrics |
| Kathará | Performance metrics |
| MEC-simulator | Performance metrics |
| Mininet-WiFi | Performance metrics |
| NDN4IVC | Performance metrics |
| PeerSim | Performance metrics |
| Shadow | Performance metrics, Resource management |
| SimGrid | Resource modeling |
| Simu5G | Resource management |
| Step-ONE | Resource modeling, Performance metrics |
| SVL Simulator | Resource modeling, Performance metrics, Resource management |
| Veins - ITS | Resource modeling, Performance metrics, Resource management |
| Veins LTE - ITS | Performance metrics |
| VNS | Performance metrics, Resource management |
| ClawBox | Computing paradigms, Resource modeling, Performance metrics, Resource management, Usability |
| Apache OpenWhisk | Performance metrics |
| Bochs | Performance metrics |
| BOINC | Performance metrics |
| Chameleon | Performance metrics |
| EdgeGallery | Performance metrics |
| EdgeMesh | Performance metrics |
| EdgeX Foundry | Performance metrics |
| FogAtlas | Computing paradigms, Resource modeling, Performance metrics, Resource management, Usability |
| k3OS | Performance metrics |
| Krustlet | Performance metrics |
| Wasmer | Performance metrics |
| EdgeNet | Performance metrics |
| Mosquitto | Performance metrics |
| VerneMQ | Performance metrics |
| Neural Network Accelerator Comparison | Computing paradigms, Resource modeling, Performance metrics, Resource management, Usability |
| vivo Cell-Free Scheduling Dataset | Computing paradigms, Resource modeling, Performance metrics, Resource management, Usability |
| Eman's Edge Computing System For AI Applications | Computing paradigms, Resource modeling, Performance metrics, Resource management, Usability |
| Apache TVM | Performance metrics |
| DeepIoT | Performance metrics |
| PyTorch Mobile | Performance metrics, Resource management |
| SparseZoo | Performance metrics |
| SNPE | Performance metrics, Resource management |
| TNN | Performance metrics |
| CLOUDS Laboratory | Computing paradigms, Resource modeling, Performance metrics, Resource management, Usability |
| Explore Edge Computing | Computing paradigms, Resource modeling, Performance metrics, Resource management, Usability |

## Validation

Catalog tests check complete README coverage, stable identities, bilingual dimension/source integrity, immutable manual annotations during sync, strict unknown handling, and search over API details. Validation passed: 12 catalog tests; Ruby 3.2.2 / Bundler 2.5.7 production Jekyll build; PurgeCSS output inspection; browser filtering, four-item limit, language switching, URL reload restoration and keyboard focus. Light/dark desktop views and the real page inside a 390 px iframe were inspected. The mobile check uses a browser viewport, not a physical phone. Local screenshots are stored under `_previews/edge-evidence/` and are not published as site assets.
