# Edge project evidence audit

Reviewed: 2026-09-08. Source policy: Project websites, official documentation, APIs, pinned implementations, and project technical guides. Research-paper marks do not establish a capability.

The catalog retains all 218 resources in README commit `96b38d3cb95bdc38ef49d9853986172854e93426`. The accumulated audit now contains 1045 bilingual, sourced dimension records; 209 resources have all five dimensions. This revision changed dimension descriptions for 40 projects and recovered the public NFaaS implementation through GitLab’s API.

There are 352 direct positive capability records across 210 comparable resources. Internal unknown states remain for 908 capability cells; these are neither converted to negative claims nor displayed as generic badges. Required filters only accept positive evidence. The four-tool comparison uses five concrete descriptions and a documented-capability list.

## Measurement scope checks

- CloudSim Plus Automation: Its summary duration is host wall-clock execution time.
- Wasmer: Metering points are application-defined operator costs, not measured CPU time.
- EdgeX 4.0.2: Application service metric reporting is disabled by default and requires configuration.
- Chameleon: Current power-monitoring guidance is used; the obsolete Gnocchi service is not presented as available.
- NFaaS: The Kernel Store schedules modeled function completion. It is not marked as executing real unikernels.
- PyTorch Mobile: Benchmark and optimizer evidence comes from PyTorch 2.2, without transferring ExecuTorch capabilities.
- FogNetSim++: MQTT statistics and queue behavior were read from the original pinned ZIP package, without executing its code.
- SNPE: The official 2017 developer guide confirms SDK-level execution profiling and deployment flow; it does not specify every counter in current releases.

## Resource-by-resource coverage

Five dimensions are counted only when a project source supports the recorded text. Resource availability is an audit outcome, not a technical capability. A five-dimension description may include a precise documentation boundary, such as iTETRIS’s request-only technical deliverables.

| Resource | Dimension records | Project sources | Availability / scope |
| --- | ---: | ---: | --- |
| [Artery](<http://artery.v2x-research.eu/>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [CausalSim](<https://github.com/CausalSim/Unbiased-Trace-Driven-Simulation/blob/2b215dae0004c2c6b06cbb1c02a15c4df049d18c/Readme.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [CloudSim](<https://github.com/Cloudslab/cloudsim/blob/703cf19e37c3e588e2991e58fed5b583f51b4b43/README.md>) | 5/5 | 3 | Project descriptions and source links are available in the explorer. |
| [CloudSim Express](<https://github.com/Cloudslab/cloudsim-express/blob/04010594ffb2dcd33daa4ab43cd21b48ba2c27d4/README.md>) | 5/5 | 4 | Project descriptions and source links are available in the explorer. |
| [CloudSim Plus](<https://github.com/cloudsimplus/cloudsimplus/blob/32c1af3f9831926112d021052c5efa89a50ce23d/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [CloudSim Plus Automation](<https://github.com/cloudsimplus/cloudsimplus-automation/blob/3b48a4dc373b761667cd16edbced48ba8cb57ebc/README.md>) | 5/5 | 3 | Project descriptions and source links are available in the explorer. |
| [CloudSim+ - Py4j gateway](<https://github.com/pkoperek/cloudsimplus-gateway/blob/9ed8f5eced109f201f96f09f1919f8534e8827d4/README.md>) | 5/5 | 4 | Project descriptions and source links are available in the explorer. |
| [CloudSimSDN](<https://github.com/Cloudslab/cloudsimsdn/blob/36157f38bc02d1da8bed0ad4c5ab0ec33db4b716/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [CloudSimPy](<https://github.com/FC-Li/CloudSimPy/blob/c103672f51d6617707501f05548a7df6090cdca5/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [CFN](<https://github.com/spirosmastorakis/CFN/blob/9f7bdd82382c525e31aa722ef121dea629c5ad3b/apps/cfn.cpp>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Cooja](<https://github.com/contiki-ng/cooja/blob/2adeaed7991cd789957e4e23c32680837bb2b2b9/README.md>) | 5/5 | 5 | Project descriptions and source links are available in the explorer. |
| [CORE](<https://github.com/coreemu/core/blob/a5cff7f99e02a2acf629e19c307926c62c818fd6/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [DFaaS](<https://github.com/unimib-datAI/dfaas/blob/eed7c5e5c30fe2261ee938e62b0ab9fc747afcc7/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [EasiEI](<https://gitlab.com/Mirrola/ns-3-dev/-/wikis/EasiEI-Simulator.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [ECHOES](<https://github.com/TadavomnisT/ECHOES/blob/855e891555c6d80f56cdf63bbd09d62337ccf2f7/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [ECSNeT++](<https://github.com/sedgecloud/ECSNeTpp/blob/edcd614b722ab77f1854ecf2901c53d81a59664d/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [EdgeAISim](<https://github.com/MuhammedGolec/EdgeAISIM/blob/0a1bdea66be763a74734fa1418ba33476549d011/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [EdgeCloudSim](<https://github.com/CagataySonmez/EdgeCloudSim/blob/0c82e35bcbd5708c1a6278777eb108419ae6af13/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [SimEdgeIntel (EdgeSim)](<https://github.com/XiaofeiTJU/SimEdgeIntel/blob/809a1968bbfa9ff7cc218d357272cf5ee11e0e2c/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [EdgeSimPy](<https://github.com/EdgeSimPy/EdgeSimPy/blob/76eb5ead74596bb4240759fa4336f1d6f190c70a/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Emu5GNet](<https://github.com/tsylla/5grail-emu5gnet/blob/be1b16809ba9005322c396f0bff3a72beed9d0bb/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [EmuEdge](<https://github.com/emuedge/emuedge/blob/7d8ebb0108674db00ccf9f74485eabe69b98aa00/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [EmuFog](<https://github.com/emufog/emufog/blob/d79defb13b203ef5bfb45c3396782516ade9338f/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [EPCSAC](<https://github.com/TNanukem/EPCSAC/blob/8eaa04f10d8a6f48435fd6208a71c6f1d0bf144a/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [FAAP-Simulator](<https://github.com/MSuter6/faap-simulator/blob/d52a23e89b4587889fc48dad86a30728782a60d4/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [faas-sim](<https://github.com/edgerun/faas-sim/blob/6bebc51247d484a3dc65e3930a6cd0de3e24afd5/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [Fogbed](<https://github.com/fogbed/fogbed/blob/548720b713a0b21716c94feaf2fccdf81a4c11db/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Fogify](<https://ucy-linc-lab.github.io/fogify/>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [FogNetSim++](<https://github.com/rtqayyum/fognetsimpp/blob/d2a91b3b986a1fcb8293ac5bf686c1ff8d6c53ed/README.md>) | 5/5 | 3 | Project descriptions and source links are available in the explorer. |
| [FogTorchPI](<https://github.com/di-unipi-socc/FogTorchPI/blob/e59e7ba935d4684e18a295a30bc205b63d0b0355/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [gem5](<https://www.gem5.org/>) | 5/5 | 3 | Project descriptions and source links are available in the explorer. |
| [iFogSim](<https://github.com/Cloudslab/iFogSim/blob/5f68d3947e450d8d2b4af42670be819206be68c9/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [IoTSim-Edge](<https://github.com/DNJha/IoTSim-Edge/blob/9001649536e24d8e6db9d01a0b1cddf00bbfc55e/README.md>) | 5/5 | 4 | Project descriptions and source links are available in the explorer. |
| [IoTSim-Osmosis](<https://github.com/kalwasel/IoTSim-Osmosis/blob/53832b57c1c64ea8558447be63faf078149372d9/README.md>) | 5/5 | 3 | Project descriptions and source links are available in the explorer. |
| [iTETRIS](<http://www.ict-itetris.eu/simulator/test_beds.htm>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [Kathará](<https://github.com/KatharaFramework/Kathara/blob/9fd24a5b94817c41bc1c84505131ed20dbd13db0/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [LEAF (Java)](<https://github.com/dos-group/leaf-java/blob/f3481a1df7e906a685d9613eff1f79e563598ffa/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [lightMANO](<https://github.com/qijianpeng/awesome-edge-computing/blob/96b38d3cb95bdc38ef49d9853986172854e93426/README.md#L297-L300>) | 0/5 | 0 | The original lightmano/lightmano-core GitHub endpoint returned HTTP 404. The inventory description remains available, but no public implementation was recovered from that endpoint. |
| [MARSSx86](<https://github.com/avadhpatel/marss/blob/86575619f5d30227a2bb3f1285d1b041961ec03b/README>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [MaxiNet](<https://github.com/MaxiNet/MaxiNet/blob/f02524ad131fb0464e35e35a05c5b6d1a457cf8d/MaxiNet/Frontend/examples/monitoring.py>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [MEC-simulator](<https://github.com/telematics-dev/MEC-simulator/blob/438301dd2da1c14a19dac6f142bf617192420cf3/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [MobFogSim](<https://github.com/diogomg/MobFogSim/blob/30c949474eee5538207fb0900b11ddcf4ec13103/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [Mini-NDN](<https://github.com/named-data/mini-ndn/blob/96203aa5c5b7506194fd06793c97d64a333e151b/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [Mininet](<https://github.com/mininet/mininet/blob/6eb8973c0bfd13c25c244a3871130c5e36b5fbd7/README.md>) | 5/5 | 3 | Project descriptions and source links are available in the explorer. |
| [Mininet-WiFi](<https://github.com/intrig-unicamp/mininet-wifi/blob/99ba09b269f8e5e08cd9698c24b8b7e2949016a9/README.md>) | 5/5 | 3 | Project descriptions and source links are available in the explorer. |
| [MintEDGE](<https://github.com/blasf1/MintEDGE/blob/754623ab93bdb6973639e57a2a962c14f54aa5c6/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [MobEmu](<https://github.com/raduciobanu/mobemu/blob/e10d0378ae2c229e30fa81ac7d09ffbc81e651b5/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [NDN4IVC](<https://github.com/insert-lab/ndn4ivc/blob/5c57662a2485e51e25f65c9242ade6b0be37fe4d/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [ndnSIM](<https://github.com/named-data-ndnSIM/ndnSIM/blob/90d50396654dabad54b6979f2dc8fa929ade544c/README.md>) | 5/5 | 3 | Project descriptions and source links are available in the explorer. |
| [NextGSim](<https://github.com/6G-Future-Lab-Bavaria/NextGSim/blob/795d6306823214281b1d68decb9f8f2f3dacbc1a/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [NFaaS](<https://gitlab.com/mharnen/NFaaS/-/blob/a720c3154fe93db5d775112e59e2debe0074c523/README.md>) | 5/5 | 3 | Project descriptions and source links are available in the explorer. |
| [NS-3](<https://github.com/nsnam/ns-3-dev-git/blob/29f6a374c394efcabb19c528bf13502578840a56/README.md>) | 5/5 | 3 | Project descriptions and source links are available in the explorer. |
| [NoSSim](<https://github.com/zoranzhao/NoSSim/blob/7b0e9edde0fe19f83d7aaa946fd580a6d9dab978/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [OMNeT++](<https://github.com/omnetpp/omnetpp/blob/820d04e7bb0ef53acaf6a41858ee7ea29f2754ca/doc/src/manual/ch-sim-lib.tex>) | 5/5 | 3 | Project descriptions and source links are available in the explorer. |
| [Open-Simulator](<https://github.com/alibaba/open-simulator/blob/c11c72ed298fa8b2174fa94394fb32c5c5e03478/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Packet Tracer](<https://www.cisco.com/c/dam/global/hr_hr/assets/ciscoexpo2009/assets/Packet_Tracer_-_Darko_Paric.pdf>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [PeerSim](<https://peersim.sourceforge.net/>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [pFogSim](<https://github.com/jihall77/pFogSim/blob/3d3591ef44ef74a08cab4e3e6f53a2b84e3d30dd/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [PureEdgeSim](<https://github.com/CharafeddineMechalikh/PureEdgeSim/blob/bcdd239fa301bd7164526dc47685058288c305ef/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [RaSim](<https://github.com/qijianpeng/awesome-edge-computing/blob/96b38d3cb95bdc38ef49d9853986172854e93426/README.md#L424-L430>) | 0/5 | 0 | The original RaSim download endpoint could not be opened. The inventory description is retained; executable downloads and implementation details are unavailable from that endpoint. |
| [RECAP-DES](<https://d-nb.info/1217328300/34#page=51>) | 5/5 | 1 | The old project endpoint is unavailable. The retained descriptions come from the project’s 2019 D4.4 technical deliverable and do not verify a current release. |
| [RECAP Simulator Framework](<https://d-nb.info/1217328300/34#page=51>) | 5/5 | 1 | The old project endpoint is unavailable. The retained descriptions come from the project’s 2019 D4.4 technical deliverable and do not verify a current release. |
| [SatEdgeSim](<https://github.com/wjy491156866/SatEdgeSim/blob/b8c7a4119506a48879b456903e10b1ec0c8c554e/README.md>) | 5/5 | 3 | Project descriptions and source links are available in the explorer. |
| [Shadow](<https://github.com/shadow/shadow/blob/49180a30800ecc3127f4aec0730bd11a9441a383/README.md>) | 5/5 | 3 | Project descriptions and source links are available in the explorer. |
| [SUMO - ITS](<https://sumo.dlr.de/docs/SUMO_at_a_Glance.html>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [SimFaaS](<https://github.com/pacslab/simfaas/blob/5dd1623ad873d005b457676c060232205de7f552/README.md>) | 5/5 | 3 | Project descriptions and source links are available in the explorer. |
| [SimFlex](<https://parsa.epfl.ch/simflex/software/Flexus-Getting-Started-4.0.0.pdf>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [SimGrid](<https://github.com/simgrid/simgrid/blob/12a63c78cdaa56b78836c95c6a18484f367dca38/README.md>) | 5/5 | 5 | Project descriptions and source links are available in the explorer. |
| [SimMobility](<https://github.com/smart-fm/simmobility-prod/blob/b79cfed3247cb9a53ab7546e38ebade579487e51/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [SimpleIoTSimulator](<https://simplesoft.com/SimpleIoTSimulator.html>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Simu5G](<https://github.com/Unipisa/Simu5G/blob/abace2a35a9df7eeef9731032d408b6cc3558a06/README.md>) | 5/5 | 4 | Project descriptions and source links are available in the explorer. |
| [SimuLTE](<https://simulte.omnetpp.org/>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [SLEIPNIR](<https://github.com/vindem/sleipnir/blob/26bbc2e7a8fd47b435e1fb1958235b520a2827d4/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [StarryNet](<https://github.com/SpaceNetLab/StarryNet/blob/91d87bd0d77c2c164b88db0adb0d28f3305a1b53/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Step-ONE](<https://github.com/jaks6/step-one/blob/25ce4c3d75de898daecf2b0251ad259a0eeb95a9/README.MD>) | 5/5 | 4 | Project descriptions and source links are available in the explorer. |
| [SVL Simulator](<https://github.com/lgsvl/simulator/blob/4c342fd39c5eca6ce6538a144f51d5929812e417/README.md>) | 5/5 | 4 | Project descriptions and source links are available in the explorer. |
| [The ONE](<https://akeranen.github.io/the-one/>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Veins - ITS](<https://github.com/sommer/veins/blob/7fff7bffaec62eb1bf4007c9f2c3411f446a7ed6/README.txt>) | 5/5 | 3 | Project descriptions and source links are available in the explorer. |
| [Veins LTE - ITS](<http://veins-lte.car2x.org/>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [VENTOS](<https://maniam.github.io/VENTOS/#about>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Vessim](<https://github.com/dos-group/vessim/blob/cd417e18dd28c7b5240843a34e0bce3d38ed5c9b/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [VirtFogSim](<https://github.com/mscarpiniti/VirtFogSim/blob/ed07988c4d55b497dfb1d872bdf41e1694efa5d5/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [VNS](<https://omnetpp.org/download-items/VNS.html>) | 5/5 | 3 | Project descriptions and source links are available in the explorer. |
| [WoTemu](<https://github.com/agmangas/wotemu/blob/8adf3d57e8b9a85959089d53cc4f7f8a1bc1aeec/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [YAFS](<https://github.com/acsicuib/YAFS/blob/d98c0053626840d4deadafa4c8c8b6db78929117/README.md>) | 5/5 | 4 | Project descriptions and source links are available in the explorer. |
| [ClawBox](<https://github.com/qijianpeng/awesome-edge-computing/blob/96b38d3cb95bdc38ef49d9853986172854e93426/README.md#L598-L599>) | 0/5 | 0 | The former ClawBox product domain now serves an unrelated AI resource hub. Its current contents provide no ClawBox product specification. |
| [AimDB](<https://github.com/aimdb-dev/aimdb/blob/30aad0743a1d059817339277cfeac6e2ed844f1e/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Akraino Edge Stack](<https://lfedge.org/projects/akraino/>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Apache Edgent(incubating)](<https://github.com/apache/incubator-retired-edgent/blob/c548b54e721e276db8e659b9d590c885577e92c2/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [Apache OpenWhisk](<https://openwhisk.apache.org/>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [AREG SDK](<https://github.com/aregtech/areg-sdk/blob/49b9c31b9ff92e56001dcebf5cbd2b660e7e5c10/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Baetyl](<https://github.com/baetyl/baetyl/blob/854e32419785b8edb884aca7cfa7b6a88245b776/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Bochs](<https://bochs.sourceforge.io/>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [BOINC](<https://github.com/BOINC/boinc/blob/019f539b92dd2b9f1c4301b511cf33c4cf7a4bd3/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [Chameleon](<https://www.chameleoncloud.org/>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [Distributed Storm](<http://matnar.github.io/uniroma2-storm/>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [ENORM](<https://github.com/qub-blesson/ENORM/blob/7efd8c0dcf3e1cbb7c4bdb139636306986a1f780/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [EdgeGallery](<https://gitee.com/edgegallery>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [EdgeMesh](<https://github.com/kubeedge/edgemesh/blob/cde4c95d68acfe35ad6db2887dce272d0f36c1bb/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [EdgeX Foundry](<https://www.edgexfoundry.org/>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [Folding@home](<https://foldingathome.org/>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [FogAtlas](<https://github.com/qijianpeng/awesome-edge-computing/blob/96b38d3cb95bdc38ef49d9853986172854e93426/README.md#L706-L715>) | 0/5 | 0 | The project URL redirects to a Google sign-in page; public technical details were not accessible. |
| [FogFlow](<https://github.com/smartfog/fogflow/blob/e44329be828096f31eaa8dc8a620452dfceef7c9/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [ForestHub edge-agents](<https://github.com/ForestHubAI/edge-agents/blob/dad48b7ae08bfc3469c2c26e118c115aefcc8599/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [k3OS](<https://github.com/rancher/k3os/blob/8cdfdf2675f1a4c06b2413fa8e3b669a8729a4a2/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [K3s](<https://k3s.io/>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Krustlet](<https://krustlet.dev/>) | 5/5 | 3 | Project descriptions and source links are available in the explorer. |
| [KubeEdge](<https://github.com/kubeedge/kubeedge/blob/509543d78311bb696dcfa525c168cf739527819f/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [KubeStellar Console](<https://github.com/kubestellar/console/blob/ad22cb2b3f74e758b1270dca630f45b1cc28659d/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [OCI](<https://github.com/marckoerner/oci/blob/933c6a6b0b24b4da97891039f0e49bade90b9208/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [OpenStack++](<https://elijah.cs.cmu.edu/development.html>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [OpenYurt](<https://github.com/openyurtio/openyurt/blob/fbefb6baca665cf4431cf37100a9cc0c0528fb4d/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [PhoneSploit Pro](<https://github.com/AzeemIdrisi/PhoneSploit-Pro/blob/8bde97116d1eea9833a00d482b0d3d0b3e3c8ad3/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [SuperEdge](<https://github.com/superedge/superedge/blob/a979e051d11981fb076619d8a49c0042138c9f2a/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Awesome WebAssembly](<https://github.com/mbasso/awesome-wasm/blob/0424b220ca668cb9a1c8ce99ff4ab9ff55625457/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [WebAssembly Micro Runtime](<https://github.com/wasm-micro-runtime/wasm-micro-runtime/blob/cd0497e26a7355973948f1fd903b049003cf0e85/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [wasmCloud](<https://github.com/wasmCloud/wasmCloud/blob/d5733f743b0c9b76d18354960077c62668226b43/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [WasmEdge Runtime](<https://github.com/WasmEdge/WasmEdge/blob/3e63e42cf0ba32c74a5d2c59cf7f1d0440b571b7/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [Wasmer](<https://github.com/wasmerio/wasmer/blob/6a844cff9bd2eb391ab91b7e41fee94260f0ec46/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [Wasmtime](<https://github.com/bytecodealliance/wasmtime/blob/668016926adfd1b8a79dbce894f1e203d8892599/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [WSO2-IoT Server](<https://wso2.com/iot/>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Xybrid](<https://github.com/xybrid-ai/xybrid/blob/7da994ec0510b3069cdbaec44140bcee6d81eb82/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [Awesome-pcaptools](<https://github.com/caesar0301/awesome-pcaptools/blob/d6f8b267e4359e693815bf6c331c4951577c6b6a/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [EdgeNet](<https://github.com/EdgeNet-project/edgenet/blob/a59d6e033c8f47aae18e85bdd94bc077ee95cb5a/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [Komondor](<https://github.com/wn-upf/Komondor/blob/a40896d881bfb377c07a9ccef249cdab52849445/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Mosquitto](<https://mosquitto.org/>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [Naming Data Network Platform](<https://named-data.net/codebase/platform/>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Node-RED](<https://nodered.org/>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Open vSwitch](<https://www.openvswitch.org/>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [POX](<https://github.com/noxrepo/pox/blob/5f82461e01f8822bd7336603b361bff4ffbd2380/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [RICE](<https://github.com/harnen/timers/blob/20084ee486f7a75ec0a59545169760629e9d89c3/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [VerneMQ](<https://vernemq.com/>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [Wonder Shaper](<https://github.com/magnific0/wondershaper/blob/98792b55c2ebf4ab4cafffb0780e0c4185fdc03d/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [aBeacon Data](<https://people.cs.rutgers.edu/~dz220/Data.html>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [AI Benchmark](<https://ai-benchmark.com/>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [CloudSuite](<https://github.com/parsa-epfl/cloudsuite/blob/c9d7584b9f4f0dec56e6683ebd61dad66ac1d06a/README.md>) | 5/5 | 4 | Project descriptions and source links are available in the explorer. |
| [ClusterData](<https://github.com/alibaba/clusterdata/blob/0d0f3f1efdbf1add6a7bcc63676eafbd1eb11f71/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [DeFog](<https://github.com/qub-blesson/DeFog/blob/84a700a656d567bb6a8e76be53ba774d131c4d58/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Edge AIBench](<https://www.benchcouncil.org/EdgeAIBench/index.html>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [EUA Datasets](<https://github.com/PhuLai/eua-dataset/blob/61238e00a6f01019c8a6ba1619675337a879a3d4/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [GT-ITM](<https://sites.cc.gatech.edu/projects/gtitm/>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Huawei Network AI Scheduling Dataset](<https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/6gana/1681784385302642219.zip>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [MLPerf Inference Benchmark Suite](<https://github.com/mlcommons/inference/blob/3fbc329939999c13d0a7b5e67fb2092287e06047/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [networkX](<https://github.com/networkx/networkx/blob/caa3b60b526afe51f0120d22b91df10f10972352/README.rst>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Network Modeling Datasets](<https://github.com/BNN-UPC/NetworkModelingDatasets/blob/cfecb7a0ce2b8218ef3b7d3f844b4b8bf3d8cca4/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Neural Network Accelerator Comparison](<https://github.com/qijianpeng/awesome-edge-computing/blob/96b38d3cb95bdc38ef49d9853986172854e93426/README.md#L992-L995>) | 0/5 | 0 | The original comparison page returned HTTP 404; this remains a reference entry. |
| [Rocketfuel](<https://research.cs.washington.edu/networking/rocketfuel/>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [CAIDA Anonymized Internet Traces 2015](<https://www.caida.org/catalog/datasets/passive_dataset/>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [TinyMLPerf](<https://github.com/mlcommons/tiny/blob/4addd0fa08d216e20637637874e084895f289da4/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [vivo Cell-Free Scheduling Dataset](<https://github.com/qijianpeng/awesome-edge-computing/blob/96b38d3cb95bdc38ef49d9853986172854e93426/README.md#L1019-L1024>) | 0/5 | 0 | The vivo sharing page returned no readable dataset description or schema. Access to the data files is needed to describe its fields and evaluation outputs. |
| [ASSOLO](<https://netlab-mn.unipv.it/assolo/>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [netem](<https://github.com/iproute2/iproute2/blob/873daf67da6d330b2d5778a335463a03ff30c1f2/man/man8/tc-netem.8>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [nmon](<https://nmon.sourceforge.io/pmwiki.php>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [GeoLite2](<https://dev.maxmind.com/geoip/geolite2-free-geolocation-data/>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Sigar](<https://github.com/hyperic/sigar/blob/ad47dc3b494e9293d1f087aebb099bdba832de5e/include/sigar.h>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Edge Courier](<https://github.com/busyslab/EdgeCourier/blob/c314f026f840531f97d48f5015a19b0e323af683/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Eman's Edge Computing System For AI Applications](<https://github.com/qijianpeng/awesome-edge-computing/blob/96b38d3cb95bdc38ef49d9853986172854e93426/README.md#L1069-L1077>) | 0/5 | 0 | The original GitHub repository returned HTTP 404. Its implementation is not accessible through the listed endpoint. |
| [Adlik](<https://github.com/Adlik/Adlik/blob/9e61295845447d4452cf9589127d36be44443770/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [AI Model Efficiency Toolkit (AIMET)](<https://github.com/qualcomm/aimet/blob/761ef454c39b51cd127d3104ca1d975116bedb61/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Apache TVM](<https://github.com/apache/tvm/blob/0eaf1cb019f8bd2bcb225b92aaa36d2878b19a16/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [AutoDiCE](<https://github.com/parrotsky/AutoDiCE/blob/82d61922db599c19ec1edfed85c4dea364de65da/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [BerryNet](<https://github.com/DT42/BerryNet/blob/2f13f5b559ee22d1c0e325834677b10a504fd117/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Bi-Real Net](<https://github.com/liuzechun/Bi-Real-net/blob/f58aa4d1fa730fcd2e33c3745fcd6c479d7f42e3/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [BMXNet](<https://github.com/hpi-xnor/BMXNet/blob/ed0b201da6667887222b8e4b5f997c4f6b61943d/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [BranchyNet](<https://github.com/kunglab/branchynet/blob/a33d136af511a4852715fcf189ee9405543056d7/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Caffe2](<https://caffe2.ai/docs/caffe-migration.html>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [CMSIS-NN](<https://github.com/ARM-software/CMSIS-NN/blob/888fb973df62592b3c5432699e1903ed131b40a5/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Communication-Aware DNN Pruning (CaP)](<https://github.com/neu-spiral/CaP/blob/e18706714d823fa28b55ca4d0fcd6102bf3686be/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Compute Library](<https://github.com/ARM-software/ComputeLibrary/blob/91982cfabb07f2b680e6fce5c3c3ae27967796b9/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [Condensa](<https://github.com/NVlabs/condensa/blob/e81e4f2e9738c3704ed852189207521f47e4cabf/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Core ML](<https://github.com/apple/coremltools/blob/c59d1a2fe535367db7b9b95a8cc2cffaa82dac4d/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [daBNN](<https://github.com/JDAI-CV/dabnn/blob/d93aa950788319d92ade545eb7fe7ac6f1589fd1/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [DDNN](<https://github.com/kunglab/ddnn/blob/adbe5c20f2f6b2c3d875af8b651cce22138928ff/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [DeepIoT](<https://github.com/yscacaca/DeepIoT/blob/c668b54e9ee384fd0160f6b61d4cf31a183e1c74/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [DeepStack](<https://deepstack.readthedocs.io/en/latest/>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [DeepThings](<https://github.com/SLAM-Lab/DeepThings/blob/5db2c034ef117988406748eca140cac42745d441/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [Distiller](<https://intellabs.github.io/distiller/>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [FATE](<https://github.com/FederatedAI/FATE/blob/5a06d9e4c4cd7ab97a5c8357828adbffaca87785/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [FedProx](<https://github.com/litian96/FedProx/blob/d2a4501f319f1594b732d88315c5ca1a72855f50/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Genesis 2](<https://github.com/larionovavi-stack/genesis2-cascade-moe/blob/85f1f3b7573393b1a2550c56c6f4fb9c673d6176/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [GNN-RL pipleline](<https://gnn-rl.readthedocs.io/en/latest/>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Ianvs](<https://github.com/kubeedge/ianvs/blob/95016dbf7699fac09a877c108133cb38f515119b/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [KitNET](<https://github.com/ymirsky/KitNET-py/blob/02eb5e804568ee9f3968d4fc5bdfd37a9c0bc190/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [MACE](<https://github.com/XiaoMi/mace/blob/0fc55a548ef41b37fd15fd8944de5155eb09b3c1/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [MegEngine](<https://github.com/MegEngine/MegEngine/blob/47952c075d868665e1116214bea760d786144081/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [MindSpore Lite](<https://www.mindspore.cn/lite/docs/en/master/index.html>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [ML Kit](<https://developers.google.com/ml-kit>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [MLC LLM](<https://github.com/mlc-ai/mlc-llm/blob/9fa644f54b04983adea4d0168f49fc6af4a893ba/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [MNN](<https://github.com/alibaba/MNN/blob/bef71b9756a2c77549eddbe33eb97290e3b16602/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Model Compression Toolkit (MCT)](<https://github.com/SonySemiconductorSolutions/mct-model-optimization/blob/5d0a96f238e90fb9e68f794e8b88ffae69d2c4a7/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [MQBench](<https://github.com/ModelTC/MQBench/blob/00f477d58ef67c1c1bbe71d14312731fd3a4960d/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [ncnn](<https://github.com/Tencent/ncnn/blob/3b7bdba7fc8aea8fd46779533eee027df77c639d/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [Neurosurgeon](<https://github.com/njcpe/neurosurgeon/blob/94805ea40016ebeae43a841b63c987069c33f89f/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [nn-Meter](<https://github.com/microsoft/nn-Meter/blob/cd8dab49b735d58d03746141f73ef5934559ae68/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [nndeploy](<https://github.com/nndeploy/nndeploy/blob/1c9e2d508bf82fd8ee47656897906d133ebf7f3d/README_EN.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [ns3-ai](<https://github.com/hust-diangroup/ns3-ai/blob/b8c9858294b1d6a7f122b5154a3ce25057a54740/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [ns3-gym](<https://github.com/tkn-tub/ns3-gym/blob/cfff7f3217b7da2c263c717a4540d6adf189eeb1/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [NVIDIA TensorRT](<https://developer.nvidia.com/tensorrt>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Once for All](<https://github.com/mit-han-lab/once-for-all/blob/f03b2673db313b9167e2a1c2b7a5cad540cc1313/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [ONNX Runtime](<https://github.com/microsoft/onnxruntime/blob/bb331b7a235435863a89f4bfcc3b2138928026ec/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [OpenVINO](<https://github.com/openvinotoolkit/openvino/blob/73d942d762acb322e45d0e1784f8e69768309479/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [Paddle-Lite](<https://github.com/PaddlePaddle/Paddle-Lite/blob/8c07d68f8508b722b903f366dc6a84efb2e086ef/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Pocket](<https://github.com/GTkernel/Pocket/blob/f7c4bd008da95bd1dd1ad2fef71558cbb0b28b04/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [PyTorch Mobile](<https://docs.pytorch.org/tutorials/recipes/mobile_interpreter.html>) | 5/5 | 3 | Project descriptions and source links are available in the explorer. |
| [SparseML](<https://github.com/neuralmagic/sparseml/blob/1c04a016c830b0ccfbb0402e291405a2252c19a6/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [Shimmy](<https://github.com/Michael-A-Kuykendall/shimmy/blob/4895730a700cb164ac2855d2ad35cb3ce59e557e/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [SparseZoo](<https://github.com/neuralmagic/sparsezoo/blob/fe098ce026764ab4537c7bc10321ce75ef3add1d/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [SNPE](<https://docs.qualcomm.com/bundle/publicresource/topics/80-70015-15B/snpe-download.html>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [Tengine](<https://github.com/OAID/Tengine/blob/5ec1c383c8adb0078c025b9fec6fa3dea254034a/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [TensorFlow Lite](<https://github.com/google-ai-edge/LiteRT/blob/4ff1d3f57c9ceb3b6d1518ad7b3d350987083086/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [TNN](<https://github.com/Tencent/TNN/blob/f0cb08129a05c5b60f08e4ef66042a54a883a56a/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [Torch-Pruning (TP)](<https://github.com/VainF/Torch-Pruning/blob/e80127d7c6935c319a7dd6719b8a72e3c1fcbff9/README.md>) | 5/5 | 2 | Project descriptions and source links are available in the explorer. |
| [uTensor](<https://github.com/uTensor/uTensor/blob/6aa081bf06c0106205b846291e1a6495f103f477/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [CLOUDS Laboratory](<https://github.com/qijianpeng/awesome-edge-computing/blob/96b38d3cb95bdc38ef49d9853986172854e93426/README.md#L1486-L1496>) | 0/5 | 0 | The original page provides a redirect to the CLOUDS laboratory; it is an institutional reference, not a comparable tool. |
| [AI at the edge](<https://github.com/crespum/edge-ai/blob/64726820fb1ed92f9261b7f9883483f1e5ea6e30/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Edge Computing & Internet Of Things](<https://github.com/yarncraft/awesome-edge/blob/f2fed4bc808c53161c1b09e3412e8775b09299cc/README.md>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |
| [Explore Edge Computing](<https://github.com/qijianpeng/awesome-edge-computing/blob/96b38d3cb95bdc38ef49d9853986172854e93426/README.md#L1504-L1507>) | 0/5 | 0 | The original directory URL failed TLS hostname validation during this review. Its resource listings could not be read through that endpoint. |
| [MEC Ecosystem](<https://mecwiki.etsi.org/index.php?title=MEC_Ecosystem>) | 5/5 | 1 | Project descriptions and source links are available in the explorer. |

## Validation

The catalog tests check full inventory coverage, source integrity, strict required filters (including legacy URLs), preserved manual annotations, four-item comparison, bilingual evidence search, and the public copy policy. Production Jekyll and browser checks are recorded in the change handoff. A documentation/source review is not an installation or benchmark of all projects.
