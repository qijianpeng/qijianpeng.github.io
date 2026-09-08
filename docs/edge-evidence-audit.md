# Edge Tool Project Evidence Audit — September 8, 2026

## Current evidence policy

Capabilities, comparison rows and detailed filters use direct project documentation, APIs, pinned code, and project technical deliverables. The survey tables are no longer imported by the builder or displayed on the page. Original research papers are retained only in manual archival records. The five dimensions organize the evidence without supplying capability assertions.

All 218 inventory resources retain review records. The published catalog has 992 non-null bilingual dimension records; 169 resources have evidence in all five dimensions. There are 346 supported and 914 unverified required-capability cells across 210 comparable resources. These counts describe evidence coverage, not runtime tests.

The preceding release had 51 capability cells whose active source was a survey table. This revision replaces 28 with concrete project evidence and leaves 23 unverified with review notes. It does not infer unsupported status from silence.

## Examples of direct evidence

- ns-3: NetAnim requires compatible simulation traces and a separate Qt application.
- ndnSIM: The documented visualizer requires its matching Python bindings and dependencies.
- OMNeT++: Qtenv supplies graphical animation; event logging requires `record-eventlog = true`.
- SimGrid: Paje traces are visualized externally. Default analytical networking is distinguished from the optional ns-3 integration.
- YAFS: The tutorial draws topology with NetworkX/Matplotlib; current metrics code writes CSV, and `deploy_monitor` invokes custom observation callbacks.
- SimFaaS: Plotly examples and debug transition output are verified; fixed built-in metrics do not establish an arbitrary metric interface.
- DFaaS: Current Kubernetes deployment is no longer labeled as a confirmed emulator.
- RECAP: The source is the project’s 2019 technical deliverable; current endpoints remain unavailable.

## Former table-based capabilities still needing project evidence

| Resource | Capability |
| --- | --- |
| Artery | visualization |
| Artery | scenario-scripts |
| Artery | logging |
| CFN | visualization |
| CFN | scenario-scripts |
| DFaaS | custom-scheduling |
| EasiEI | visualization |
| EasiEI | scenario-scripts |
| EasiEI | logging |
| EasiEI | custom-scheduling |
| ECSNeT++ | visualization |
| EmuFog | custom-scheduling |
| IoTSim-Edge | visualization |
| IoTSim-Osmosis | visualization |
| MaxiNet | custom-scheduling |
| NS-3 | custom-scheduling |
| OMNeT++ | custom-scheduling |
| RECAP-DES | custom-metrics |
| SimFaaS | custom-metrics |
| Simu5G | visualization |
| StarryNet | custom-metrics |
| Step-ONE | custom-scheduling |
| VirtFogSim | logging |

## Dimensions needing further evidence

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
| lightMANO | Computing paradigms, Resource modeling, Performance metrics, Resource management, Usability |
| MEC-simulator | Performance metrics |
| Mininet-WiFi | Performance metrics |
| NDN4IVC | Performance metrics |
| NFaaS | Computing paradigms, Resource modeling, Performance metrics, Resource management, Usability |
| PeerSim | Performance metrics |
| RaSim | Computing paradigms, Resource modeling, Performance metrics, Resource management, Usability |
| Shadow | Performance metrics, Resource management |
| Simu5G | Resource management |
| Step-ONE | Resource modeling |
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

## Access or source limitations

| Resource | Outcome |
| --- | --- |
| lightMANO | Direct project documentation has not yet been recovered. Historical research records are excluded from capability judgments. |
| NFaaS | Direct project documentation has not yet been recovered. Historical research records are excluded from capability judgments. |
| RaSim | Direct project documentation has not yet been recovered. Historical research records are excluded from capability judgments. |
| RECAP-DES | The old project endpoint is unavailable. The retained descriptions come from the project’s 2019 D4.4 technical deliverable and do not verify a current release. |
| RECAP Simulator Framework | The old project endpoint is unavailable. The retained descriptions come from the project’s 2019 D4.4 technical deliverable and do not verify a current release. |
| ClawBox | The former product domain now hosts an unrelated AI resource hub; no current ClawBox specification was recovered. |
| FogAtlas | The project URL redirects to a Google sign-in page; public technical details were not accessible. |
| Neural Network Accelerator Comparison | The original comparison page returned HTTP 404; this remains a reference entry. |
| vivo Cell-Free Scheduling Dataset | The sharing page exposed no readable dataset description or schema; contents were not verified. |
| Eman's Edge Computing System For AI Applications | The original GitHub repository returned HTTP 404. Its implementation cannot be verified from that endpoint. |
| CLOUDS Laboratory | The original page provides a redirect to the CLOUDS laboratory; it is an institutional reference, not a comparable tool. |
| Explore Edge Computing | The original website failed TLS hostname validation; its current directory contents could not be verified. |

## Validation

The 13 catalog tests cover full inventory coverage, source integrity, sync preservation, filtering, comparison limits, and direct-project evidence requirements. Ruby 3.2.2 / Bundler 2.5.7 production Jekyll build and PurgeCSS passed. Actual browser checks passed for strict versus unknown-inclusive filtering, preserved comparison selections, Chinese/English comparison, five-dimensional rows, and absence of survey table explanations. A rendered screenshot is retained locally at `_previews/edge-evidence/project-sources-comparison.png`. This audit reads documentation and selected code; it does not install or benchmark every project.
