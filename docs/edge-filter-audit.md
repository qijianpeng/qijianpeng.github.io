# Filter coverage audit — September 8, 2026

All 218 inventory entries were checked against their recorded project descriptions and source references. This is a documentation and code audit, not execution testing of each tool. The survey is cited as classification context and supplies no new capability flags.

Explicit tags now live next to the relevant bilingual dimension in `verification.json` (`dimensions[].facets`). The builder publishes both together and carries the dimension source into the claim. Additional source-specific corrections use `claims`. No keyword extraction or parent-engine inheritance runs during the build.

## Coverage

| Filter group | Resources before | Resources after |
|---|---:|---:|
| type | 59 | 76 |
| paradigm | 26 | 162 |
| scenario | 33 | 50 |
| engine | 32 | 95 |
| language | 132 | 139 |
| protocol | 33 | 44 |
| resource | 51 | 140 |
| metric | 59 | 101 |
| scheduling | 23 | 55 |
| platform | 48 | 69 |
| purpose | 207 | 208 |

186 resources have corrected or additional filter assignments; 732 distinct resource–filter assignments were added. Counts are catalog coverage, not performance or exhaustive compatibility guarantees.

## Classification boundaries

- A resource may have several paradigms. Edge includes documented device-side execution. Dataset paradigms identify the observed or benchmarked setting, not executable support.
- Fog and mist remain separate explicit tags; a tool is not assigned Cloud or Edge merely because its parent engine has that capability.
- General architecture simulators, monitoring libraries, graph libraries, and offline model-compression tools need not have a computing-paradigm tag. Their documented purpose, abstraction, language, and other applicable groups remain searchable.
- Reference collections and inaccessible projects do not acquire technical capabilities merely from their names.
- Network impairments are not reported performance measurements; host runtime and simulated delay have separate labels. Compiler transformations are not task scheduling.
- The simulation-level group now includes system/architecture and traffic/mobility resources so they are not forced into a cloud-application or packet-level category.

## Project-specific source checks

- [Fogbed: Cloud, fog, and limited edge resources](https://github.com/fogbed/fogbed/blob/548720b713a0b21716c94feaf2fccdf81a4c11db/docs/intro.rst): 548720b713a0b21716c94feaf2fccdf81a4c11db.
- [EdgeCloudSim: DefaultCloudServerManager](https://github.com/CagataySonmez/EdgeCloudSim/blob/0c82e35bcbd5708c1a6278777eb108419ae6af13/src/edu/boun/edgecloudsim/cloud_server/DefaultCloudServerManager.java): 0c82e35bcbd5708c1a6278777eb108419ae6af13.
- [YAFS: Topology and application modeling tutorial](https://github.com/acsicuib/YAFS/blob/d98c0053626840d4deadafa4c8c8b6db78929117/docs/introduction/basic.rst): d98c0053626840d4deadafa4c8c8b6db78929117; Bundled tutorial API may predate YAFS 3.1.
- [Simu5G: ETSI MEC model and emulation guide](https://simu5g.org/users-guide/mec): Online user guide checked 2026-09-08; MEC modules and emulation configuration required.
- [SimGrid 4.1: Introduction and supported application domains](https://simgrid.org/doc/latest/Introduction.html): 4.1; Application and platform models required.
- [ONNX Runtime: Deployment platforms and language interfaces](https://onnxruntime.ai/): Online platform overview checked 2026-09-08; Select the Mobile, Web, or server package for the target.
- [iTETRIS: Simulation platform architecture](http://www.ict-itetris.eu/simulator/platform.htm): Historical iCS / SUMO / ns-3 architecture; Checked 2026-09-08.
- [areg-sdk / Pinned project README](https://github.com/aregtech/areg-sdk/blob/49b9c31b9ff92e56001dcebf5cbd2b660e7e5c10/README.md): 49b9c31b9ff92e56001dcebf5cbd2b660e7e5c10.
- [edgeaisim / Pinned project README](https://github.com/MuhammedGolec/EdgeAISIM/blob/0a1bdea66be763a74734fa1418ba33476549d011/README.md): 0a1bdea66be763a74734fa1418ba33476549d011.
- [mobfogsim / Pinned project README](https://github.com/diogomg/MobFogSim/blob/30c949474eee5538207fb0900b11ddcf4ec13103/README.md): 30c949474eee5538207fb0900b11ddcf4ec13103.
- [pfogsim / Pinned project README](https://github.com/jihall77/pFogSim/blob/3d3591ef44ef74a08cab4e3e6f53a2b84e3d30dd/README.md): 3d3591ef44ef74a08cab4e3e6f53a2b84e3d30dd.
- [pureedgesim / Pinned project README](https://github.com/CharafeddineMechalikh/PureEdgeSim/blob/bcdd239fa301bd7164526dc47685058288c305ef/README.md): bcdd239fa301bd7164526dc47685058288c305ef.
- [sleipnir / Pinned project README](https://github.com/vindem/sleipnir/blob/26bbc2e7a8fd47b435e1fb1958235b520a2827d4/README.md): 26bbc2e7a8fd47b435e1fb1958235b520a2827d4.
- [wotemu / Pinned project README](https://github.com/agmangas/wotemu/blob/8adf3d57e8b9a85959089d53cc4f7f8a1bc1aeec/README.md): 8adf3d57e8b9a85959089d53cc4f7f8a1bc1aeec.
- [apache-edgent-incubating / Pinned project README](https://github.com/apache/incubator-retired-edgent/blob/c548b54e721e276db8e659b9d590c885577e92c2/README.md): c548b54e721e276db8e659b9d590c885577e92c2.
- [openyurt / Pinned project README](https://github.com/openyurtio/openyurt/blob/fbefb6baca665cf4431cf37100a9cc0c0528fb4d/README.md): fbefb6baca665cf4431cf37100a9cc0c0528fb4d.
- [superedge / Pinned project README](https://github.com/superedge/superedge/blob/a979e051d11981fb076619d8a49c0042138c9f2a/README.md): a979e051d11981fb076619d8a49c0042138c9f2a.
- [webassembly-micro-runtime / Pinned project README](https://github.com/wasm-micro-runtime/wasm-micro-runtime/blob/cd0497e26a7355973948f1fd903b049003cf0e85/README.md): cd0497e26a7355973948f1fd903b049003cf0e85.
- [clusterdata / Pinned project README](https://github.com/alibaba/clusterdata/blob/0d0f3f1efdbf1add6a7bcc63676eafbd1eb11f71/README.md): 0d0f3f1efdbf1add6a7bcc63676eafbd1eb11f71.
- [defog / Pinned project README](https://github.com/qub-blesson/DeFog/blob/84a700a656d567bb6a8e76be53ba774d131c4d58/README.md): 84a700a656d567bb6a8e76be53ba774d131c4d58.
- [ai-model-efficiency-toolkit-aimet / Pinned project README](https://github.com/qualcomm/aimet/blob/761ef454c39b51cd127d3104ca1d975116bedb61/README.md): 761ef454c39b51cd127d3104ca1d975116bedb61.
- [model-compression-toolkit-mct / Pinned project README](https://github.com/SonySemiconductorSolutions/mct-model-optimization/blob/5d0a96f238e90fb9e68f794e8b88ffae69d2c4a7/README.md): 5d0a96f238e90fb9e68f794e8b88ffae69d2c4a7.
- [nn-meter / Pinned project README](https://github.com/microsoft/nn-Meter/blob/cd8dab49b735d58d03746141f73ef5934559ae68/README.md): cd8dab49b735d58d03746141f73ef5934559ae68.

## Per-resource review

| Resource | Computing paradigms | New assignments |
|---|---|---|
| [Artery](http://artery.v2x-research.eu/) | Networking | paradigm: Networking; engine: Veins; engine: INET; engine: OMNeT++; resource: Network; metric: Packet count |
| [CausalSim](https://github.com/CausalSim/Unbiased-Trace-Driven-Simulation) | Purpose / source-specific scope; no paradigm assigned | type: application |
| [CloudSim](https://github.com/Cloudslab/cloudsim) | Cloud | resource: CPU; resource: Memory; scheduling: User-defined |
| [CloudSim Express](https://github.com/Cloudslab/cloudsim-express) | Cloud | Existing assignments retained after review |
| [CloudSim Plus](https://github.com/cloudsimplus/cloudsimplus) | Cloud | scheduling: Migration; scheduling: Autoscaling; scheduling: Completely fair; paradigm: Cloud |
| [CloudSim Plus Automation](https://github.com/manoelcampos/cloudsimplus-automation) | Cloud | resource: Virtual machines; metric: Host execution time; scheduling: User-defined |
| [CloudSim+ - Py4j gateway](https://github.com/pkoperek/cloudsimplus-gateway) | Cloud | type: application |
| [CloudSimSDN](https://github.com/Cloudslab/cloudsimsdn) | Cloud, Edge | scheduling: Autoscaling; engine: CloudSim |
| [CloudSimPy](https://github.com/FengcunLi/CloudSimPy) | Cloud | scheduling: Reinforcement learning; paradigm: Cloud |
| [CFN](https://github.com/spirosmastorakis/CFN/) | In-network, Networking | paradigm: In-network; paradigm: Networking; engine: ndnSIM; resource: CPU; resource: Network; scheduling: Function dispatch |
| [Cooja](https://anrg.usc.edu/contiki/index.php/Cooja_Simulator) | Networking | paradigm: Networking; engine: MSPSim; resource: CPU; resource: Network; scenario: IoT |
| [CORE](https://github.com/coreemu/core) | Networking | resource: Virtual machines; resource: Network; metric: Throughput |
| [DFaaS](https://github.com/UNIMIBInside/dfaas) | Edge, Serverless, P2P | purpose: deployment; resource: Virtual machines; resource: Network |
| [EasiEI](https://gitlab.com/Mirrola/ns-3-dev) | Edge | paradigm: Edge; metric: Resource utilization; language: C++; scheduling: Task offloading |
| [ECHOES](https://github.com/TadavomnisT/ECHOES) | Edge, Cloud | Existing assignments retained after review |
| [ECSNeT++](https://github.com/sedgecloud/ECSNeTpp) | Edge, Cloud | Existing assignments retained after review |
| [EdgeAISim](https://github.com/MuhammedGolec/EdgeAISim) | IoT, Edge | scheduling: Migration; paradigm: IoT; paradigm: Edge |
| [EdgeCloudSim](https://github.com/CagataySonmez/EdgeCloudSim) | Cloud, Edge | language: Python; language: MATLAB; paradigm: Cloud; paradigm: Edge; resource: CPU; resource: Memory; resource: Storage; resource: Virtual machines; resource: Network; metric: Resource utilization; scheduling: Time sharing; scheduling: User-defined; scheduling: Task offloading; engine: CloudSim; scenario: Vehicular; scenario: Mobility |
| [SimEdgeIntel (EdgeSim)](https://github.com/XiaofeiTJU/SimEdgeIntel) | Edge | Existing assignments retained after review |
| [EdgeSimPy](https://github.com/EdgeSimPy/EdgeSimPy) | Edge | scheduling: Migration; scheduling: Microservice placement |
| [Emu5GNet](https://github.com/tsylla/5grail-emu5gnet) | Networking, Edge | engine: Mininet-WiFi; engine: Containernet; engine: SUMO; paradigm: Networking; paradigm: Edge; scheduling: Migration |
| [EmuEdge](https://github.com/emuedge/emuedge) | Edge, Networking | paradigm: Edge; paradigm: Networking |
| [EmuFog](https://github.com/emufog/emufog) | Fog | scheduling: Constraint-based placement |
| [EPCSAC](https://github.com/TNanukem/EPCSAC) | Cloud | platform: Browser |
| [FAAP-Simulator](https://github.com/MSuter6/faap-simulator) | Fog | scenario: Industrial IoT |
| [faas-sim](https://github.com/edgerun/faas-sim) | Serverless, Edge | resource: Containers; resource: Network; resource: CPU; resource: Memory |
| [Fogbed](https://github.com/fogbed/fogbed) | Cloud, Fog, Edge, Networking | paradigm: Cloud; paradigm: Fog; paradigm: Edge; paradigm: Networking |
| [Fogify](https://ucy-linc-lab.github.io/fogify/) | Fog | paradigm: Fog; engine: Docker |
| [FogNetSim++](https://github.com/rtqayyum/fognetsimpp) | Fog | resource: Network; resource: CPU; metric: Latency; metric: Packet count; scheduling: FIFO; language: C++ |
| [FogTorchPI](https://github.com/di-unipi-socc/FogTorchPI) | Fog, Cloud | Existing assignments retained after review |
| [gem5](https://www.gem5.org/) | Purpose / source-specific scope; no paradigm assigned | type: system; resource: CPU; resource: Memory; metric: Instruction count; metric: Host execution time |
| [iFogSim](https://github.com/Cloudslab/iFogSim) | IoT, Edge, Fog, Cloud | paradigm: Cloud; metric: Bandwidth |
| [IoTSim-Edge](https://github.com/DNJha/IoTSim-Edge) | Edge, IoT | resource: Virtual machines; paradigm: Edge; paradigm: IoT; scheduling: Task offloading |
| [IoTSim-Osmosis](https://github.com/kalwasel/IoTSim-Osmosis) | IoT, Edge, Cloud, Osmotic computing | resource: Network |
| [iTETRIS](http://www.ict-itetris.eu/simulator/test_beds.htm) | Networking | paradigm: Networking; engine: ns-3; engine: SUMO; resource: Network; type: packet |
| [Kathará](https://github.com/KatharaFramework/Kathara) | Networking | resource: CPU; resource: Memory |
| [LEAF (Java)](https://github.com/dos-group/leaf-java) | Fog | scheduling: Energy-aware |
| [lightMANO](https://github.com/lightmano/lightmano-core) | Purpose / source-specific scope; no paradigm assigned | Existing assignments retained after review |
| [MARSSx86](http://www.marss86.org/~marss86/index.php/Home) | Purpose / source-specific scope; no paradigm assigned | type: system |
| [MaxiNet](https://github.com/MaxiNet/MaxiNet) | Networking | paradigm: Networking; engine: Mininet; resource: Network; resource: CPU; resource: Memory; metric: Resource utilization |
| [MEC-simulator](https://github.com/telematics-dev/MEC-simulator) | Edge | scheduling: Task offloading |
| [MobFogSim](https://github.com/diogomg/MobFogSim) | Edge, Fog | scenario: IoT; paradigm: Edge; paradigm: Fog; engine: iFogSim |
| [Mini-NDN](http://minindn.memphis.edu/) | Networking | paradigm: Networking; resource: Network; platform: Linux; metric: Resource utilization |
| [Mininet](http://mininet.org/) | Networking | paradigm: Networking; resource: Network; protocol: Ethernet |
| [Mininet-WiFi](https://github.com/intrig-unicamp/mininet-wifi) | Networking | protocol: OpenFlow; paradigm: Networking; engine: Mininet; resource: Network; metric: RSSI |
| [MintEDGE](https://github.com/blasf1/MintEDGE) | Edge | platform: Docker; metric: Resource utilization; scheduling: Energy-aware; paradigm: Edge; engine: SUMO |
| [MobEmu](https://github.com/raduciobanu/mobemu) | Networking | metric: Delivery rate; metric: Hop count; resource: Network |
| [NDN4IVC](https://github.com/insert-lab/ndn4ivc) | Networking | paradigm: Networking; resource: Network |
| [ndnSIM](https://ndnsim.net/) | Networking | metric: Packet count; paradigm: Networking; engine: ns-3; resource: Network |
| [NextGSim](https://github.com/6G-Future-Lab-Bavaria/NextGSim) | Edge, Networking | paradigm: Edge; paradigm: Networking; type: application |
| [NFaaS](https://gitlab.com/mharnen/NFaaS) | In-network, Serverless, Cloud | paradigm: In-network; paradigm: Serverless; paradigm: Cloud; engine: ndnSIM; resource: CPU; resource: Storage; metric: Latency; scheduling: FIFO; scheduling: Function dispatch; language: C++ |
| [NS-3](https://www.nsnam.org/) | Networking | metric: Packet count; paradigm: Networking; protocol: Ethernet; resource: Network |
| [NoSSim](https://github.com/zoranzhao/NoSSim) | IoT, Networking | paradigm: Networking; metric: Latency |
| [OMNeT++](https://github.com/omnetpp/omnetpp) | Networking | paradigm: Networking |
| [Open-Simulator](https://github.com/alibaba/open-simulator) | Cloud | resource: Containers; scheduling: Migration; paradigm: Cloud |
| [Packet Tracer](https://www.netacad.com/courses/packet-tracer/introduction-packet-tracer) | Networking | paradigm: Networking; type: packet |
| [PeerSim](http://peersim.sourceforge.net/) | P2P, Networking | paradigm: P2P; paradigm: Networking |
| [pFogSim](https://github.com/jihall77/pFogSim) | Fog, Cloud, Edge | paradigm: Cloud; paradigm: Edge |
| [PureEdgeSim](https://github.com/CharafeddineMechalikh/PureEdgeSim) | Fog, Cloud, Edge, Mist, IoT | paradigm: Fog; paradigm: Cloud; paradigm: Edge; paradigm: Mist; paradigm: IoT; resource: CPU; resource: Memory; resource: Storage; resource: Network; resource: Energy; scenario: Mobility; metric: Task success; scheduling: User-defined |
| [RaSim](http://snslab.kangwon.ac.kr/v2/RaSim/index.html) | Purpose / source-specific scope; no paradigm assigned | Existing assignments retained after review |
| [RECAP-DES](https://bitbucket.org/RECAP-DES/recap-des/src/master/) | Edge | paradigm: Edge; engine: CloudSim Plus; resource: Network; platform: Docker |
| [RECAP Simulator Framework](https://recap-project.eu/simulators/) | Purpose / source-specific scope; no paradigm assigned | type: application; protocol: HTTP; platform: Docker |
| [SatEdgeSim](https://github.com/wjy491156866/SatEdgeSim) | Cloud, Edge, Mist | paradigm: Cloud; paradigm: Edge; paradigm: Mist; scenario: Satellite; scenario: Mobility; engine: CloudSim Plus; engine: PureEdgeSim; resource: Energy; metric: Latency; metric: Task success; metric: Energy consumption; scheduling: User-defined |
| [Shadow](https://github.com/shadow/shadow) | Networking | paradigm: Networking; resource: Network; protocol: TCP; protocol: UDP; metric: Host execution time; metric: Resource utilization |
| [SUMO - ITS](https://sumo.dlr.de/docs/SUMO_at_a_Glance.html) | Purpose / source-specific scope; no paradigm assigned | scenario: Mobility; type: mobility |
| [SimFaaS](https://github.com/pacslab/simfaas) | Serverless | paradigm: Serverless; metric: Latency; metric: Cold start; platform: Docker |
| [SimFlex](https://parsa.epfl.ch/simflex/) | Purpose / source-specific scope; no paradigm assigned | type: system |
| [SimGrid](https://github.com/simgrid/simgrid) | Fog, Volunteer computing, Cloud, Grid, P2P, HPC | paradigm: Fog; paradigm: Volunteer computing; paradigm: Cloud; paradigm: Grid; paradigm: P2P; paradigm: HPC; language: C++; language: C; language: Python; platform: Docker; resource: CPU; resource: Storage; resource: Network; resource: Energy |
| [SimMobility](https://github.com/smart-fm/simmobility-prod) | Purpose / source-specific scope; no paradigm assigned | scenario: Mobility; scenario: Vehicular; type: mobility |
| [SimpleIoTSimulator](https://www.simplesoft.com/SimpleIoTSimulator.html) | IoT | paradigm: IoT; resource: Network |
| [Simu5G](https://github.com/Unipisa/Simu5G) | Edge, Networking | metric: Delivery rate; metric: Packet count; type: emulator; paradigm: Edge; paradigm: Networking; resource: CPU; resource: Memory; resource: Storage; resource: Network; protocol: HTTP; protocol: TCP; protocol: UDP; protocol: 5G; protocol: 4G; scheduling: Constraint-based placement; scheduling: Deficit round robin; scenario: Vehicular; engine: OMNeT++; engine: INET |
| [SimuLTE](https://simulte.omnetpp.org/) | Networking | scheduling: User-defined; paradigm: Networking; engine: OMNeT++; engine: INET; resource: Network; scenario: Mobility |
| [SLEIPNIR](https://github.com/vindem/sleipnir) | IoT, Edge, Cloud | paradigm: IoT; paradigm: Edge; paradigm: Cloud; engine: Apache Spark; engine: SUMO; scenario: Mobility; scheduling: HEFT; scheduling: Task offloading; language: Java |
| [StarryNet](https://github.com/SpaceNetLab/StarryNet) | Networking | paradigm: Networking; platform: Linux; resource: Containers; resource: Network; scenario: Satellite; scenario: Mobility; metric: Resource utilization; metric: Latency; metric: Throughput; protocol: OSPF; engine: Docker |
| [Step-ONE](https://github.com/jaks6/step-one) | Purpose / source-specific scope; no paradigm assigned | engine: The ONE; resource: CPU; scenario: Mobility; metric: Latency; metric: Task success |
| [SVL Simulator](https://github.com/lgsvl/simulator) | Purpose / source-specific scope; no paradigm assigned | type: mobility |
| [The ONE](https://akeranen.github.io/the-one/) | Networking | paradigm: Networking; resource: Network; scenario: Mobility |
| [Veins - ITS](https://github.com/sommer/veins) | Networking | scenario: Mobility; paradigm: Networking; resource: Network; metric: Packet count; metric: Packet loss; protocol: WiFi |
| [Veins LTE - ITS](http://veins-lte.car2x.org/) | Networking | paradigm: Networking; resource: Network; protocol: WiFi; protocol: 4G; metric: Latency; metric: Packet loss; metric: Jitter; metric: Throughput; metric: MOS |
| [VENTOS](https://maniam.github.io/VENTOS/#about) | Networking | language: MATLAB; paradigm: Networking; resource: Network |
| [Vessim](https://github.com/dos-group/vessim) | Purpose / source-specific scope; no paradigm assigned | type: application; resource: Energy; metric: Energy consumption; metric: Carbon emissions; metric: Cost |
| [VirtFogSim](https://github.com/mscarpiniti/VirtFogSim) | Edge, Fog, Cloud | paradigm: Edge; paradigm: Fog; paradigm: Cloud; resource: CPU; resource: Network; metric: Latency; metric: Energy consumption; scheduling: Task offloading; scheduling: Energy-aware |
| [VNS](https://omnetpp.org/download-items/VNS.html) | Networking | paradigm: Networking; scenario: Vehicular; scenario: Mobility; type: mobility; engine: OMNeT++; resource: Network; metric: Travel time; metric: Distance |
| [WoTemu](https://github.com/agmangas/wotemu) | Edge, IoT | paradigm: Edge; paradigm: IoT; engine: Docker; resource: Containers; resource: Network; scheduling: Autoscaling |
| [YAFS](https://github.com/acsicuib/YAFS) | Cloud, IoT, Fog, Edge | paradigm: Cloud; paradigm: IoT; paradigm: Fog; paradigm: Edge; resource: CPU; resource: Memory; resource: Network; scenario: IoT; engine: NetworkX; metric: Latency; scheduling: User-defined; scheduling: Microservice placement |
| [ClawBox](https://dedicated-ai-hardware.com/) | Purpose / source-specific scope; no paradigm assigned | Existing assignments retained after review |
| [AimDB](https://github.com/aimdb-dev/aimdb) | Edge, Cloud | paradigm: Edge; paradigm: Cloud; platform: Browser; engine: Tokio; engine: Embassy; engine: WebAssembly |
| [Akraino Edge Stack](https://www.lfedge.org/projects/akraino/) | Edge | paradigm: Edge; scenario: IoT |
| [Apache Edgent(incubating)](https://edgent.incubator.apache.org/) | IoT, Edge | scenario: Streaming; paradigm: IoT; paradigm: Edge |
| [Apache OpenWhisk](https://openwhisk.apache.org/) | Serverless | paradigm: Serverless; engine: Kubernetes; engine: Docker; scheduling: Autoscaling |
| [AREG SDK](https://github.com/aregtech/areg-sdk) | Edge, Mist, IoT | paradigm: Edge; paradigm: Mist; paradigm: IoT; resource: Network; metric: Latency; metric: Throughput |
| [Baetyl](https://github.com/baetyl/baetyl) | Cloud, Edge, Serverless | platform: x86; platform: Arm; paradigm: Cloud; paradigm: Edge; paradigm: Serverless; resource: Containers; engine: Kubernetes; engine: K3s |
| [Bochs](https://bochs.sourceforge.io/) | Purpose / source-specific scope; no paradigm assigned | type: system; platform: x86; metric: Instruction count |
| [BOINC](https://boinc.berkeley.edu/) | Volunteer computing | paradigm: Volunteer computing; resource: CPU; metric: CPU benchmark |
| [Chameleon](https://www.chameleoncloud.org/) | Edge, Cloud | paradigm: Edge; paradigm: Cloud |
| [Distributed Storm](http://matnar.github.io/uniroma2-storm/) | Purpose / source-specific scope; no paradigm assigned | scheduling: Microservice placement; resource: Network |
| [ENORM](https://github.com/qub-blesson/ENORM) | Edge, Cloud | paradigm: Edge; paradigm: Cloud; resource: Containers |
| [EdgeGallery](https://gitee.com/edgegallery) | Edge, Cloud | paradigm: Edge; paradigm: Cloud; resource: Virtual machines; scheduling: Microservice placement |
| [EdgeMesh](https://github.com/kubeedge/edgemesh) | Edge, Networking, P2P | paradigm: Edge; paradigm: Networking; paradigm: P2P; engine: KubeEdge; resource: Network; scheduling: Load balancing; scheduling: Round robin |
| [EdgeX Foundry](https://www.edgexfoundry.org/) | Edge, IoT | paradigm: Edge; paradigm: IoT; protocol: HTTP; protocol: MQTT; metric: Packet count |
| [Folding@home](https://foldingathome.org/) | Volunteer computing | paradigm: Volunteer computing; resource: GPU |
| [FogAtlas](https://fogatlas.fbk.eu/) | Purpose / source-specific scope; no paradigm assigned | Existing assignments retained after review |
| [FogFlow](https://github.com/smartfog/fogflow) | Cloud, Edge, IoT | paradigm: Cloud; paradigm: Edge; paradigm: IoT; scenario: Streaming; scheduling: Microservice placement; engine: Docker |
| [ForestHub edge-agents](https://github.com/ForestHubAI/edge-agents) | Edge | purpose: inference; platform: Arm; platform: x86; paradigm: Edge; resource: Containers |
| [k3OS](https://k3os.io/) | Purpose / source-specific scope; no paradigm assigned | engine: K3s; resource: Memory; resource: Storage |
| [K3s](https://k3s.io/) | Edge, IoT | platform: x86; platform: Arm; paradigm: Edge; paradigm: IoT; engine: Kubernetes |
| [Krustlet](https://krustlet.dev/) | Purpose / source-specific scope; no paradigm assigned | engine: Kubernetes; engine: WebAssembly |
| [KubeEdge](https://github.com/kubeedge/kubeedge) | Edge, Cloud | resource: Containers; resource: Network |
| [KubeStellar Console](https://github.com/kubestellar/console) | Purpose / source-specific scope; no paradigm assigned | engine: Kubernetes; platform: Browser |
| [OCI](https://github.com/marckoerner/oci) | Edge | paradigm: Edge; engine: Mininet; resource: Network; protocol: HTTP |
| [OpenStack++](http://elijah.cs.cmu.edu/development.html) | Edge | paradigm: Edge; engine: OpenStack |
| [OpenYurt](https://github.com/openyurtio/openyurt) | Cloud, Edge | paradigm: Cloud; paradigm: Edge; engine: Kubernetes; resource: Containers |
| [PhoneSploit Pro](https://github.com/AzeemIdrisi/PhoneSploit-Pro) | Purpose / source-specific scope; no paradigm assigned | Existing assignments retained after review |
| [SuperEdge](https://github.com/superedge/superedge) | Cloud, Edge | paradigm: Cloud; paradigm: Edge; engine: Kubernetes; resource: Containers; resource: Network |
| [Awesome WebAssembly](https://github.com/mbasso/awesome-wasm) | Reference entry | Existing assignments retained after review |
| [WebAssembly Micro Runtime](https://github.com/bytecodealliance/wasm-micro-runtime) | Cloud, IoT, Edge | paradigm: Cloud; paradigm: IoT; paradigm: Edge; engine: WebAssembly; metric: Binary footprint |
| [wasmCloud](https://wasmcloud.dev/) | Edge, Cloud | engine: WebAssembly; engine: Kubernetes; paradigm: Edge; paradigm: Cloud |
| [WasmEdge Runtime](https://wasmedge.org/) | Edge, Cloud, Serverless, IoT | metric: Instruction count; engine: WebAssembly; paradigm: Edge; paradigm: Cloud; paradigm: Serverless; paradigm: IoT; resource: Memory; resource: Network; language: Go; language: Rust; language: C |
| [Wasmer](https://wasmer.io/) | Edge, Cloud | engine: WebAssembly; paradigm: Edge; paradigm: Cloud; resource: Network |
| [Wasmtime](https://wasmtime.dev/) | Purpose / source-specific scope; no paradigm assigned | engine: WebAssembly |
| [WSO2-IoT Server](https://wso2.com/iot) | IoT | paradigm: IoT |
| [Xybrid](https://github.com/xybrid-ai/xybrid) | Edge | paradigm: Edge |
| [Awesome-pcaptools](https://github.com/caesar0301/awesome-pcaptools) | Reference entry | Existing assignments retained after review |
| [EdgeNet](https://github.com/EdgeNet-Project) | Edge | paradigm: Edge; engine: Kubernetes; scheduling: Constraint-based placement |
| [Komondor](https://github.com/wn-upf/Komondor) | Networking | paradigm: Networking; type: packet; resource: Network; scheduling: Reinforcement learning |
| [Mosquitto](http://mosquitto.org/) | Networking | paradigm: Networking; metric: Packet count; metric: Resource utilization; resource: Memory; resource: Network |
| [Naming Data Network Platform](https://named-data.net/codebase/platform/) | Networking | paradigm: Networking |
| [Node-RED](https://nodered.org/) | Edge, Cloud | paradigm: Edge; paradigm: Cloud; engine: Node.js |
| [Open vSwitch](https://www.openvswitch.org/) | Networking | paradigm: Networking; resource: Network; platform: Linux; platform: BSD |
| [POX](https://github.com/noxrepo/pox) | Networking | paradigm: Networking; resource: Network; platform: Linux; platform: macOS; platform: Windows |
| [RICE](https://github.com/harnen/timers) | In-network, Networking | language: Shell; paradigm: In-network; paradigm: Networking; engine: ndnSIM; resource: Network |
| [VerneMQ](https://vernemq.com/) | IoT, Networking | paradigm: IoT; paradigm: Networking; resource: CPU; resource: Network; resource: Memory; metric: Packet count; metric: Resource utilization |
| [Wonder Shaper](https://github.com/magnific0/wondershaper) | Networking | paradigm: Networking; resource: Network; scheduling: Traffic shaping |
| [aBeacon Data](https://people.cs.rutgers.edu/~dz220/Data.html) | Purpose / source-specific scope; no paradigm assigned | Existing assignments retained after review |
| [AI Benchmark](https://ai-benchmark.com/) | Edge | paradigm: Edge; platform: Mobile; metric: Benchmark score |
| [CloudSuite](https://www.cloudsuite.ch/) | Cloud | platform: Arm; paradigm: Cloud |
| [ClusterData](https://github.com/alibaba/clusterdata) | Serverless, Cloud | paradigm: Serverless; paradigm: Cloud; resource: GPU; metric: Resource utilization; metric: Latency; metric: Throughput |
| [DeFog](https://github.com/qub-blesson/DeFog) | Fog, Edge, Cloud | paradigm: Fog; paradigm: Edge; paradigm: Cloud; resource: Containers; engine: Docker |
| [Edge AIBench](https://www.benchcouncil.org/EdgeAIBench/index.html) | Edge, Cloud | paradigm: Edge; paradigm: Cloud; scenario: Healthcare; scenario: Vehicular; scenario: Smart home |
| [EUA Datasets](https://github.com/swinedge/eua-dataset) | Edge | paradigm: Edge |
| [GT-ITM](https://www.cc.gatech.edu/projects/gtitm/) | Networking | paradigm: Networking; resource: Network |
| [Huawei Network AI Scheduling Dataset](https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/6gana/1681784385302642219.zip) | Cloud, Networking | paradigm: Cloud; paradigm: Networking |
| [MLPerf Inference Benchmark Suite](https://github.com/mlcommons/inference) | Edge, Cloud | paradigm: Edge; paradigm: Cloud; metric: Accuracy |
| [networkX](https://networkx.github.io/) | Purpose / source-specific scope; no paradigm assigned | Existing assignments retained after review |
| [Network Modeling Datasets](https://github.com/BNN-UPC/NetworkModelingDatasets) | Networking | paradigm: Networking; resource: Network; engine: OMNeT++ |
| [Neural Network Accelerator Comparison](http://nicsefc.ee.tsinghua.edu.cn/projects/neural-network-accelerator/) | Reference entry | Existing assignments retained after review |
| [Rocketfuel](https://research.cs.washington.edu/networking/rocketfuel/) | Networking | paradigm: Networking; resource: Network; metric: Latency |
| [CAIDA Anonymized Internet Traces 2015](https://www.caida.org/data/passive/passive_2015_dataset.xml) | Networking | paradigm: Networking; resource: Network |
| [TinyMLPerf](https://github.com/mlcommons/tiny) | Edge | paradigm: Edge; resource: CPU; resource: DSP; resource: NPU |
| [vivo Cell-Free Scheduling Dataset](https://commonbox.vivo.xyz/s/rUeNxBRZfKL) | Purpose / source-specific scope; no paradigm assigned | Existing assignments retained after review |
| [ASSOLO](http://netlab-mn.unipv.it/assolo/) | Networking | paradigm: Networking; resource: Network |
| [netem](https://wiki.linuxfoundation.org/networking/netem) | Networking | purpose: simulation; paradigm: Networking; type: emulator; scheduling: Traffic shaping |
| [nmon](http://nmon.sourceforge.net/pmwiki.php) | Purpose / source-specific scope; no paradigm assigned | Existing assignments retained after review |
| [GeoLite2](https://dev.maxmind.com/geoip/geoip2/geolite2/) | Purpose / source-specific scope; no paradigm assigned | Existing assignments retained after review |
| [Sigar](https://github.com/hyperic/sigar/wiki/overview) | Purpose / source-specific scope; no paradigm assigned | Existing assignments retained after review |
| [Edge Courier](https://github.com/bumoslab/EdgeCourier) | Edge, Cloud | paradigm: Edge; paradigm: Cloud; purpose: deployment |
| [Eman's Edge Computing System For AI Applications](https://github.com/emmanuelacastillo/python-edge-computing-system) | Purpose / source-specific scope; no paradigm assigned | Existing assignments retained after review |
| [Adlik](https://github.com/Adlik/Adlik) | Cloud, Edge | paradigm: Cloud; paradigm: Edge; resource: Containers; resource: CPU; resource: GPU; engine: TensorRT; engine: OpenVINO; engine: TensorFlow Lite |
| [AI Model Efficiency Toolkit (AIMET)](https://github.com/quic/aimet) | Edge | paradigm: Edge; engine: PyTorch; engine: ONNX |
| [Apache TVM](https://tvm.apache.org/) | Purpose / source-specific scope; no paradigm assigned | Existing assignments retained after review |
| [AutoDiCE](https://github.com/parrotsky/AutoDiCE) | Edge | paradigm: Edge; engine: ONNX; engine: MPI; engine: OpenMP; resource: GPU; scheduling: Model partitioning |
| [BerryNet](https://github.com/DT42/BerryNet) | Edge | paradigm: Edge; platform: Raspberry Pi |
| [Bi-Real Net](https://github.com/liuzechun/Bi-Real-net) | Purpose / source-specific scope; no paradigm assigned | metric: Accuracy; engine: PyTorch; engine: Caffe |
| [BMXNet](https://github.com/hpi-xnor/BMXNet) | Purpose / source-specific scope; no paradigm assigned | purpose: compression; engine: MXNet |
| [BranchyNet](https://github.com/kunglab/branchynet) | Purpose / source-specific scope; no paradigm assigned | resource: GPU; metric: Latency; metric: Accuracy; engine: Chainer |
| [Caffe2](https://github.com/pytorch/pytorch/tree/master/caffe2) | Edge | purpose: inference; paradigm: Edge; platform: Mobile; resource: CPU; resource: GPU |
| [CMSIS-NN](https://www.keil.com/pack/doc/CMSIS/NN/html/index.html) | Edge | paradigm: Edge |
| [Communication-Aware DNN Pruning (CaP)](https://github.com/neu-spiral/CaP) | Purpose / source-specific scope; no paradigm assigned | purpose: compression; resource: Network; metric: Accuracy; metric: Latency; engine: PyTorch |
| [Compute Library](https://github.com/ARM-software/ComputeLibrary) | Purpose / source-specific scope; no paradigm assigned | Existing assignments retained after review |
| [Condensa](https://github.com/NVlabs/condensa) | Purpose / source-specific scope; no paradigm assigned | engine: PyTorch |
| [Core ML](https://developer.apple.com/documentation/coreml) | Edge | purpose: training; paradigm: Edge |
| [daBNN](https://github.com/JDAI-CV/dabnn) | Edge | paradigm: Edge; metric: Accuracy; metric: Latency |
| [DDNN](https://github.com/kunglab/ddnn) | Cloud, Edge | paradigm: Cloud; paradigm: Edge; metric: Accuracy; scheduling: Model partitioning; engine: Chainer |
| [DeepIoT](https://github.com/yscacaca/DeepIoT) | Purpose / source-specific scope; no paradigm assigned | metric: Model size; engine: TensorFlow |
| [DeepStack](https://www.deepstack.cc/) | Cloud, Edge | platform: NVIDIA Jetson; platform: Arm; paradigm: Cloud; paradigm: Edge |
| [DeepThings](https://github.com/SLAM-Lab/DeepThings) | Edge, IoT | platform: Raspberry Pi; paradigm: Edge; paradigm: IoT; scheduling: Work stealing; scheduling: Model partitioning; engine: Darknet |
| [Distiller](https://github.com/IntelLabs/distiller) | Purpose / source-specific scope; no paradigm assigned | engine: PyTorch |
| [FATE](https://github.com/FederatedAI/FATE) | Federated learning | paradigm: Federated learning; scheduling: DAG scheduling |
| [FedProx](https://github.com/litian96/FedProx) | Federated learning | paradigm: Federated learning; metric: Accuracy; metric: Training loss |
| [Genesis 2](https://github.com/larionovavi-stack/genesis2-cascade-moe) | Purpose / source-specific scope; no paradigm assigned | resource: CPU; engine: PyTorch |
| [GNN-RL pipleline](https://gnn-rl.readthedocs.io/en/latest/) | Purpose / source-specific scope; no paradigm assigned | Existing assignments retained after review |
| [Ianvs](https://github.com/kubeedge/ianvs) | Edge, Cloud | paradigm: Edge; paradigm: Cloud; resource: Containers |
| [KitNET](https://github.com/ymirsky/KitNET-py) | Purpose / source-specific scope; no paradigm assigned | Existing assignments retained after review |
| [MACE](https://github.com/XiaoMi/mace) | Edge | resource: DSP; paradigm: Edge |
| [MegEngine](https://github.com/MegEngine/MegEngine) | Purpose / source-specific scope; no paradigm assigned | purpose: inference; platform: x86; platform: Arm |
| [MindSpore Lite](https://www.mindspore.cn/lite/en) | Edge | purpose: training; paradigm: Edge; resource: Memory |
| [ML Kit](https://developers.google.com/ml-kit) | Edge | paradigm: Edge |
| [MLC LLM](https://github.com/mlc-ai/mlc-llm) | Edge | resource: CPU; resource: GPU; paradigm: Edge |
| [MNN](https://github.com/alibaba/MNN) | Edge, IoT | paradigm: Edge; paradigm: IoT; platform: Mobile; resource: GPU; resource: DSP |
| [Model Compression Toolkit (MCT)](https://github.com/sony/model_optimization) | Edge | paradigm: Edge; engine: PyTorch; engine: Keras |
| [MQBench](https://github.com/ModelTC/MQBench) | Purpose / source-specific scope; no paradigm assigned | engine: PyTorch |
| [ncnn](https://github.com/Tencent/ncnn) | Edge | platform: Browser; paradigm: Edge |
| [Neurosurgeon](https://github.com/njcpe/neurosurgeon) | Purpose / source-specific scope; no paradigm assigned | resource: CPU; resource: GPU; scheduling: Model partitioning; platform: Windows; platform: Linux; engine: TensorFlow |
| [nn-Meter](https://github.com/microsoft/nn-Meter) | Edge | paradigm: Edge |
| [nndeploy](https://github.com/nndeploy/nndeploy/blob/main/README_EN.md) | Edge, Cloud | resource: CPU; resource: GPU; paradigm: Edge; paradigm: Cloud; scheduling: Pipeline parallelism; scheduling: Task parallelism |
| [ns3-ai](https://github.com/hust-diangroup/ns3-ai) | Networking | paradigm: Networking; protocol: WiFi; protocol: TCP |
| [ns3-gym](https://github.com/tkn-tub/ns3-gym) | Networking | paradigm: Networking; platform: Linux |
| [NVIDIA TensorRT](https://developer.nvidia.com/tensorrt) | Edge, Cloud | paradigm: Edge; paradigm: Cloud |
| [Once for All](https://github.com/mit-han-lab/once-for-all) | Purpose / source-specific scope; no paradigm assigned | Existing assignments retained after review |
| [ONNX Runtime](https://github.com/microsoft/onnxruntime) | Edge, Cloud | paradigm: Edge; paradigm: Cloud; language: Python; language: C#; language: C++; language: Java; language: JavaScript; language: Rust; platform: Linux; platform: Windows; platform: macOS; platform: iOS; platform: Android; platform: Browser; resource: CPU; resource: GPU; resource: NPU |
| [OpenVINO](https://github.com/openvinotoolkit/openvino) | Edge, Cloud | paradigm: Edge; paradigm: Cloud |
| [Paddle-Lite](https://github.com/PaddlePaddle/Paddle-Lite) | Edge | paradigm: Edge |
| [Pocket](https://github.com/GTkernel/Pocket) | Purpose / source-specific scope; no paradigm assigned | platform: x86; engine: Docker; resource: GPU; resource: Containers |
| [PyTorch Mobile](https://pytorch.org/mobile/home/) | Edge | paradigm: Edge; resource: CPU; resource: GPU |
| [SparseML](https://github.com/neuralmagic/sparseml) | Purpose / source-specific scope; no paradigm assigned | Existing assignments retained after review |
| [Shimmy](https://github.com/Michael-A-Kuykendall/shimmy) | Edge | paradigm: Edge; engine: Airframe |
| [SparseZoo](https://github.com/neuralmagic/sparsezoo) | Purpose / source-specific scope; no paradigm assigned | Existing assignments retained after review |
| [SNPE](https://developer.qualcomm.com/sites/default/files/docs/snpe/index.html) | Edge | paradigm: Edge; resource: CPU; resource: GPU; resource: DSP |
| [Tengine](https://github.com/OAID/Tengine) | Edge | paradigm: Edge |
| [TensorFlow Lite](https://www.tensorflow.org/lite) | Edge | paradigm: Edge |
| [TNN](https://github.com/Tencent/TNN) | Edge, Cloud | paradigm: Edge; paradigm: Cloud; platform: Mobile; platform: Arm; platform: x86 |
| [Torch-Pruning (TP)](https://github.com/VainF/Torch-Pruning) | Purpose / source-specific scope; no paradigm assigned | resource: GPU; resource: Memory |
| [uTensor](https://github.com/uTensor/uTensor) | Edge | paradigm: Edge; resource: Memory; metric: Binary footprint |
| [CLOUDS Laboratory](http://www.cloudbus.org/intro.html) | Reference entry | Existing assignments retained after review |
| [AI at the edge](https://github.com/crespum/edge-ai) | Reference entry | Existing assignments retained after review |
| [Edge Computing & Internet Of Things](https://github.com/yarncraft/awesome-edge) | Reference entry | Existing assignments retained after review |
| [Explore Edge Computing](https://kandi.openweaver.com/explore/edge-computing) | Reference entry | Existing assignments retained after review |
| [MEC Ecosystem](https://mecwiki.etsi.org/index.php?title=MEC_Ecosystem) | Reference entry | Existing assignments retained after review |
