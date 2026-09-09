# Label and icon review: September 9, 2026

Reviewed the existing 218-resource catalog for omitted filter values. This pass adds 122 distinct resource/filter assignments across 74 resources. Existing pinned project evidence was reused; EasiEI Wiki pages and selected dependency files were retrieved for this pass. No survey marks or automated keyword matches create tags.

## Scope and decisions

- Core engine includes the engine itself and documented execution backends. Optional backends retain their conditions. Import formats, comparison baselines, and planned integrations do not establish an engine dependency.
- EasiEI: Cloud and Edge are explicit resource-pool configurations. Fog is a catalog mapping for the documented composition of processing-capable intermediate devices. IoT requires the SensorBase extension interface and concrete device implementation. These labels do not promise four ready-made presets. ns-3, UDP/IPv4/IPv6, Ubuntu, priority/FIFO scheduling, trace collection and customizable allocation have direct project sources.
- pFogSim: EdgeCloudSim and CloudSim are execution dependencies; iFogSim is described as inspiration, so it is not added as an engine.
- EdgeSimPy: Mesa and NetworkX are declared dependencies. Docker-like container abstractions do not mean real Docker workloads execute in the simulator.
- nndeploy: The documented default package includes ONNX Runtime and MNN. Other listed backends require developer-mode builds and compatible hardware.
- Generic libraries retain their documented scope; inaccessible projects and reference collections do not receive invented capabilities. This is a documentation/source audit, not runtime certification of 218 projects.

## Added assignments

| Resource | Added filters | Direct sources |
| --- | --- | --- |
| CloudSim | engine: CloudSim; scheduling: VM placement | [Cloudslab/cloudsim / README.md](https://github.com/Cloudslab/cloudsim/blob/703cf19e37c3e588e2991e58fed5b583f51b4b43/README.md) |
| CloudSim Express | scheduling: VM placement | [Cloudslab/cloudsim-express / docs/examples/writing-custom-vm-allocation-policy-example/writing-custom-vm-allocation-policy.md](https://github.com/Cloudslab/cloudsim-express/blob/04010594ffb2dcd33daa4ab43cd21b48ba2c27d4/docs/examples/writing-custom-vm-allocation-policy-example/writing-custom-vm-allocation-policy.md) |
| CloudSim Plus | scheduling: VM placement; engine: CloudSim Plus | [cloudsimplus/cloudsimplus / README.md](https://github.com/cloudsimplus/cloudsimplus/blob/32c1af3f9831926112d021052c5efa89a50ce23d/README.md) |
| CloudSim+ - Py4j gateway | scheduling: VM placement; platform: Docker | [pkoperek/cloudsimplus-gateway / src/main/java/pl/edu/agh/csg/CloudSimProxy.java](https://github.com/pkoperek/cloudsimplus-gateway/blob/9ed8f5eced109f201f96f09f1919f8534e8827d4/src/main/java/pl/edu/agh/csg/CloudSimProxy.java); [pkoperek/cloudsimplus-gateway / README.md](https://github.com/pkoperek/cloudsimplus-gateway/blob/9ed8f5eced109f201f96f09f1919f8534e8827d4/README.md) |
| CFN | engine: ns-3 | [CFN / ndnSIM branch README](https://github.com/spirosmastorakis/CFN/blob/9f7bdd82382c525e31aa722ef121dea629c5ad3b/README.md) |
| Cooja | paradigm: IoT | [contiki-ng/cooja / README.md](https://github.com/contiki-ng/cooja/blob/2adeaed7991cd789957e4e23c32680837bb2b2b9/README.md) |
| EasiEI | paradigm: Cloud; paradigm: Fog; paradigm: IoT; scenario: IoT; engine: ns-3; platform: Linux; scheduling: FIFO; scheduling: Priority; scheduling: User-defined; protocol: UDP; protocol: IPv4; protocol: IPv6 | [EasiEI / Functional components](https://gitlab.com/Mirrola/ns-3-dev/-/wikis/Functional-components); [EasiEI / Quick Start](https://gitlab.com/Mirrola/ns-3-dev/-/wikis/Quick-Start); [EasiEI / Computing resource unit](https://gitlab.com/Mirrola/ns-3-dev/-/wikis/Computing-resource-unit); [EasiEI / SensorBase interface](https://gitlab.com/Mirrola/ns-3-dev/-/blob/e96572819b3de4e5831dc870affaab5f168c1a51/contrib/devices/model/sensorbase.h); [EasiEI / Server application](https://gitlab.com/Mirrola/ns-3-dev/-/blob/e96572819b3de4e5831dc870affaab5f168c1a51/contrib/myapplication/model/server.cc); [EasiEI / Development environment](https://gitlab.com/Mirrola/ns-3-dev/-/wikis/Guide/EasiEI开发环境配置) |
| ECHOES | scheduling: Task offloading | [TadavomnisT/ECHOES / README.md](https://github.com/TadavomnisT/ECHOES/blob/855e891555c6d80f56cdf63bbd09d62337ccf2f7/README.md) |
| EdgeAISim | engine: PyTorch | [edgeaisim / Project README](https://github.com/MuhammedGolec/EdgeAISIM/blob/0a1bdea66be763a74734fa1418ba33476549d011/README.md) |
| EdgeCloudSim | engine: EdgeCloudSim | [CagataySonmez/EdgeCloudSim / README.md](https://github.com/CagataySonmez/EdgeCloudSim/blob/0c82e35bcbd5708c1a6278777eb108419ae6af13/README.md) |
| EdgeSimPy | engine: Mesa; engine: NetworkX; engine: EdgeSimPy | [EdgeSimPy/EdgeSimPy / README.md](https://github.com/EdgeSimPy/EdgeSimPy/blob/76eb5ead74596bb4240759fa4336f1d6f190c70a/README.md); [edgesimpy / pyproject.toml](https://raw.githubusercontent.com/EdgeSimPy/EdgeSimPy/76eb5ead74596bb4240759fa4336f1d6f190c70a/pyproject.toml) |
| EmuFog | engine: Docker | [emufog / Project README](https://github.com/emufog/emufog/blob/d79defb13b203ef5bfb45c3396782516ade9338f/README.md) |
| iFogSim | engine: CloudSim; engine: iFogSim | [Cloudslab/iFogSim / README.md](https://github.com/Cloudslab/iFogSim/blob/5f68d3947e450d8d2b4af42670be819206be68c9/README.md); [ifogsim / Project README](https://github.com/Cloudslab/iFogSim/blob/5f68d3947e450d8d2b4af42670be819206be68c9/README.md) |
| IoTSim-Osmosis | scheduling: VM placement; scheduling: Time sharing; resource: CPU; resource: Virtual machines; resource: Energy | [kalwasel/IoTSim-Osmosis / IoTSim-Osmosis_User_Manual.pdf](https://github.com/kalwasel/IoTSim-Osmosis/blob/53832b57c1c64ea8558447be63faf078149372d9/IoTSim-Osmosis_User_Manual.pdf); [kalwasel/IoTSim-Osmosis / IoTSim-Osmosis_User_Manual.pdf](https://github.com/kalwasel/IoTSim-Osmosis/blob/53832b57c1c64ea8558447be63faf078149372d9/IoTSim-Osmosis_User_Manual.pdf) |
| MARSSx86 | metric: Instruction count | [avadhpatel/marss / README](https://github.com/avadhpatel/marss/blob/86575619f5d30227a2bb3f1285d1b041961ec03b/README) |
| MaxiNet | engine: MaxiNet | [MaxiNet/MaxiNet / MaxiNet/Frontend/examples/monitoring.py](https://github.com/MaxiNet/MaxiNet/blob/f02524ad131fb0464e35e35a05c5b6d1a457cf8d/MaxiNet/Frontend/examples/monitoring.py) |
| MEC-simulator | paradigm: IoT | [telematics-dev/MEC-simulator / README.md](https://github.com/telematics-dev/MEC-simulator/blob/438301dd2da1c14a19dac6f142bf617192420cf3/README.md) |
| MobFogSim | paradigm: IoT; engine: CloudSim | [diogomg/MobFogSim / README.md](https://github.com/diogomg/MobFogSim/blob/30c949474eee5538207fb0900b11ddcf4ec13103/README.md); [mobfogsim / Project README](https://github.com/diogomg/MobFogSim/blob/30c949474eee5538207fb0900b11ddcf4ec13103/README.md) |
| Mininet | engine: Mininet | [mininet/mininet / README.md](https://github.com/mininet/mininet/blob/6eb8973c0bfd13c25c244a3871130c5e36b5fbd7/README.md) |
| Mininet-WiFi | platform: Docker; engine: Mininet-WiFi | [intrig-unicamp/mininet-wifi / README.md](https://github.com/intrig-unicamp/mininet-wifi/blob/99ba09b269f8e5e08cd9698c24b8b7e2949016a9/README.md) |
| MobEmu | language: Java | [raduciobanu/mobemu / README.md](https://github.com/raduciobanu/mobemu/blob/e10d0378ae2c229e30fa81ac7d09ffbc81e651b5/README.md) |
| ndnSIM | engine: ndnSIM | [named-data-ndnSIM/ndnSIM / README.md](https://github.com/named-data-ndnSIM/ndnSIM/blob/90d50396654dabad54b6979f2dc8fa929ade544c/README.md) |
| NFaaS | engine: ns-3 | [README.md](https://gitlab.com/mharnen/NFaaS/-/blob/a720c3154fe93db5d775112e59e2debe0074c523/README.md) |
| NS-3 | engine: ns-3; protocol: WiFi | [ns3-stats / Official guide](https://www.nsnam.org/docs/manual/html/statistics.html); [nsnam/ns-3-dev-git / README.md](https://github.com/nsnam/ns-3-dev-git/blob/29f6a374c394efcabb19c528bf13502578840a56/README.md) |
| OMNeT++ | engine: OMNeT++ | [omnetpp/omnetpp / doc/src/manual/ch-sim-lib.tex](https://github.com/omnetpp/omnetpp/blob/820d04e7bb0ef53acaf6a41858ee7ea29f2754ca/doc/src/manual/ch-sim-lib.tex) |
| pFogSim | paradigm: IoT; engine: CloudSim; engine: EdgeCloudSim | [pfogsim / src/edu/boun/edgecloudsim/core/SimManager.java](https://raw.githubusercontent.com/jihall77/pFogSim/3d3591ef44ef74a08cab4e3e6f53a2b84e3d30dd/src/edu/boun/edgecloudsim/core/SimManager.java); [pfogsim / Project README](https://github.com/jihall77/pFogSim/blob/3d3591ef44ef74a08cab4e3e6f53a2b84e3d30dd/README.md) |
| PureEdgeSim | engine: PureEdgeSim | [CharafeddineMechalikh/PureEdgeSim / README.md](https://github.com/CharafeddineMechalikh/PureEdgeSim/blob/bcdd239fa301bd7164526dc47685058288c305ef/README.md) |
| SUMO - ITS | engine: SUMO | [sumo-its / Official documentation](https://sumo.dlr.de/docs/SUMO_at_a_Glance.html) |
| SimGrid | engine: ns-3 | [simgrid / docs/source/Models.rst](https://github.com/simgrid/simgrid/blob/12a63c78cdaa56b78836c95c6a18484f367dca38/docs/source/Models.rst) |
| SimuLTE | scheduling: Max C/I; engine: SimuLTE | [simulte / Official documentation](https://simulte.omnetpp.org/) |
| SVL Simulator | language: C# | [Assets/Scripts/Api/Commands/AddAgent.cs](https://github.com/lgsvl/simulator/blob/4c342fd39c5eca6ce6538a144f51d5929812e417/Assets/Scripts/Api/Commands/AddAgent.cs) |
| The ONE | engine: The ONE | [the-one / Official documentation](https://akeranen.github.io/the-one/) |
| Veins - ITS | engine: Veins | [sommer/veins / README.txt](https://github.com/sommer/veins/blob/7fff7bffaec62eb1bf4007c9f2c3411f446a7ed6/README.txt) |
| Vessim | scheduling: Energy-aware | [dos-group/vessim / README.md](https://github.com/dos-group/vessim/blob/cd417e18dd28c7b5240843a34e0bce3d38ed5c9b/README.md) |
| VNS | language: C++ | [sources/vehicles/modules/travelstatsmodule.cpp](https://github.com/enriquefynn/libvns/blob/abf27bad43abbe572c2eeeca537de31f881ffc30/sources/vehicles/modules/travelstatsmodule.cpp) |
| WoTemu | engine: WoTPy; engine: NetEm | [agmangas/wotemu / README.md](https://github.com/agmangas/wotemu/blob/8adf3d57e8b9a85959089d53cc4f7f8a1bc1aeec/README.md) |
| YAFS | engine: SimPy | [yafs-yet-another-fog-simulator / pyproject.toml](https://raw.githubusercontent.com/acsicuib/YAFS/d98c0053626840d4deadafa4c8c8b6db78929117/pyproject.toml) |
| K3s | engine: K3s | [k3s / Official documentation](https://k3s.io/) |
| KubeEdge | engine: KubeEdge | [kubeedge/kubeedge / README.md](https://github.com/kubeedge/kubeedge/blob/509543d78311bb696dcfa525c168cf739527819f/README.md) |
| WasmEdge Runtime | platform: Kubernetes | [WasmEdge/WasmEdge / README.md](https://github.com/WasmEdge/WasmEdge/blob/3e63e42cf0ba32c74a5d2c59cf7f1d0440b571b7/README.md) |
| Wasmer | engine: Cranelift | [examples/metering.rs](https://github.com/wasmerio/wasmer/blob/6a844cff9bd2eb391ab91b7e41fee94260f0ec46/examples/metering.rs) |
| Wasmtime | engine: Cranelift; engine: Wasmtime | [bytecodealliance/wasmtime / README.md](https://github.com/bytecodealliance/wasmtime/blob/668016926adfd1b8a79dbce894f1e203d8892599/README.md) |
| Komondor | engine: COST | [wn-upf/Komondor / README.md](https://github.com/wn-upf/Komondor/blob/a40896d881bfb377c07a9ccef249cdab52849445/README.md) |
| Node-RED | platform: Docker | [node-red / Official documentation](https://nodered.org/) |
| Open vSwitch | engine: Open vSwitch | [open-vswitch / Official documentation](https://www.openvswitch.org/) |
| RICE | engine: ns-3 | [harnen/timers / README.md](https://github.com/harnen/timers/blob/20084ee486f7a75ec0a59545169760629e9d89c3/README.md) |
| CloudSuite | engine: Docker | [parsa-epfl/cloudsuite / README.md](https://github.com/parsa-epfl/cloudsuite/blob/c9d7584b9f4f0dec56e6683ebd61dad66ac1d06a/README.md) |
| MLPerf Inference Benchmark Suite | engine: PyTorch; engine: TensorFlow; engine: TVM; engine: ncnn | [mlperf-inference-benchmark-suite / Project README](https://github.com/mlcommons/inference/blob/3fbc329939999c13d0a7b5e67fb2092287e06047/README.md) |
| networkX | engine: NetworkX | [networkx/networkx / README.rst](https://github.com/networkx/networkx/blob/caa3b60b526afe51f0120d22b91df10f10972352/README.rst) |
| TinyMLPerf | engine: TensorFlow Lite Micro | [mlcommons/tiny / README.md](https://github.com/mlcommons/tiny/blob/4addd0fa08d216e20637637874e084895f289da4/README.md) |
| netem | engine: NetEm | [iproute2/iproute2 / man/man8/tc-netem.8](https://github.com/iproute2/iproute2/blob/873daf67da6d330b2d5778a335463a03ff30c1f2/man/man8/tc-netem.8) |
| Adlik | platform: Docker | [Adlik/Adlik / README.md](https://github.com/Adlik/Adlik/blob/9e61295845447d4452cf9589127d36be44443770/README.md) |
| Apache TVM | engine: TVM | [apache/tvm / README.md](https://github.com/apache/tvm/blob/0eaf1cb019f8bd2bcb225b92aaa36d2878b19a16/README.md) |
| Core ML | engine: Core ML | [apple/coremltools / README.md](https://github.com/apple/coremltools/blob/c59d1a2fe535367db7b9b95a8cc2cffaa82dac4d/README.md) |
| FATE | platform: Docker | [FederatedAI/FATE / README.md](https://github.com/FederatedAI/FATE/blob/5a06d9e4c4cd7ab97a5c8357828adbffaca87785/README.md) |
| FedProx | language: Shell; engine: TensorFlow | [litian96/FedProx / README.md](https://github.com/litian96/FedProx/blob/d2a4501f319f1594b732d88315c5ca1a72855f50/README.md); [fedprox / requirements.txt](https://raw.githubusercontent.com/litian96/FedProx/d2a4501f319f1594b732d88315c5ca1a72855f50/requirements.txt) |
| MegEngine | resource: Memory | [MegEngine/MegEngine / README.md](https://github.com/MegEngine/MegEngine/blob/47952c075d868665e1116214bea760d786144081/README.md) |
| MNN | engine: MNN | [alibaba/MNN / README.md](https://github.com/alibaba/MNN/blob/bef71b9756a2c77549eddbe33eb97290e3b16602/README.md) |
| Model Compression Toolkit (MCT) | engine: TensorFlow | [model-compression-toolkit-mct / Project README](https://github.com/SonySemiconductorSolutions/mct-model-optimization/blob/5d0a96f238e90fb9e68f794e8b88ffae69d2c4a7/README.md) |
| ncnn | engine: ncnn | [Tencent/ncnn / README.md](https://github.com/Tencent/ncnn/blob/3b7bdba7fc8aea8fd46779533eee027df77c639d/README.md) |
| nndeploy | engine: ONNX Runtime; engine: TensorRT; engine: OpenVINO; engine: MNN; engine: TNN; engine: ncnn; engine: Core ML; engine: AscendCL; engine: RKNN; engine: SNPE; engine: TVM; engine: PyTorch; engine: nndeploy; resource: Memory | [nndeploy/nndeploy / README_EN.md](https://github.com/nndeploy/nndeploy/blob/1c9e2d508bf82fd8ee47656897906d133ebf7f3d/README_EN.md); [nndeploy / Project README](https://github.com/nndeploy/nndeploy/blob/1c9e2d508bf82fd8ee47656897906d133ebf7f3d/README_EN.md) |
| ns3-ai | scheduling: Reinforcement learning | [hust-diangroup/ns3-ai / README.md](https://github.com/hust-diangroup/ns3-ai/blob/b8c9858294b1d6a7f122b5154a3ce25057a54740/README.md) |
| ns3-gym | scheduling: Reinforcement learning | [tkn-tub/ns3-gym / README.md](https://github.com/tkn-tub/ns3-gym/blob/cfff7f3217b7da2c263c717a4540d6adf189eeb1/README.md) |
| NVIDIA TensorRT | engine: TensorRT | [nvidia-tensorrt / Official documentation](https://developer.nvidia.com/tensorrt) |
| Once for All | purpose: training; purpose: compression; engine: PyTorch | [mit-han-lab/once-for-all / README.md](https://github.com/mit-han-lab/once-for-all/blob/f03b2673db313b9167e2a1c2b7a5cad540cc1313/README.md); [once-for-all / Project README](https://github.com/mit-han-lab/once-for-all/blob/f03b2673db313b9167e2a1c2b7a5cad540cc1313/README.md) |
| ONNX Runtime | engine: ONNX Runtime | [microsoft/onnxruntime / README.md](https://github.com/microsoft/onnxruntime/blob/bb331b7a235435863a89f4bfcc3b2138928026ec/README.md) |
| OpenVINO | engine: OpenVINO | [openvinotoolkit/openvino / README.md](https://github.com/openvinotoolkit/openvino/blob/73d942d762acb322e45d0e1784f8e69768309479/README.md) |
| Pocket | engine: TensorFlow | [pocket / Project README](https://github.com/GTkernel/Pocket/blob/f7c4bd008da95bd1dd1ad2fef71558cbb0b28b04/README.md) |
| PyTorch Mobile | engine: PyTorch | [torch/utils/mobile_optimizer.py](https://github.com/pytorch/pytorch/blob/v2.2.0/torch/utils/mobile_optimizer.py) |
| SNPE | engine: SNPE | [Qualcomm / Install Neural Processing Engine SDK](https://docs.qualcomm.com/bundle/publicresource/topics/80-70015-15B/snpe-download.html) |
| Tengine | metric: Latency | [OAID/Tengine / README.md](https://github.com/OAID/Tengine/blob/5ec1c383c8adb0078c025b9fec6fa3dea254034a/README.md) |
| TensorFlow Lite | engine: TensorFlow Lite | [google-ai-edge/LiteRT / README.md](https://github.com/google-ai-edge/LiteRT/blob/4ff1d3f57c9ceb3b6d1518ad7b3d350987083086/README.md) |
| TNN | engine: TNN | [Tencent/TNN / README.md](https://github.com/Tencent/TNN/blob/f0cb08129a05c5b60f08e4ef66042a54a883a56a/README.md) |
| Torch-Pruning (TP) | engine: PyTorch | [torch-pruning-tp / Project README](https://github.com/VainF/Torch-Pruning/blob/e80127d7c6935c319a7dd6719b8a72e3c1fcbff9/README.md) |

## Interface changes

- Local inline SVG icons identify 10 resource categories, 12 filter groups, computing paradigms, and five evidence dimensions. Icons are decorative and hidden from assistive technology; text remains the accessible label.
- Computing paradigm and Core engine are the first two filter groups and open by default.
- Cards display all paradigm and engine values in separate labeled rows, followed by all type/language/purpose tags. Values are not truncated at five.
- Comparison tables now include the exact paradigm and engine tags.
- Colors inherit the existing light/dark site theme.

## Validation

- 18 catalog tests pass, including EasiEI four-paradigm/ns-3 combinations and engine dependency boundaries.
- Public inventory remains 218 resources; every added assignment retains an official source.
- Production Jekyll build passed with Ruby 3.2.2 / Bundler 2.5.7; PurgeCSS completed and retained the icon/card styles.
- Browser checks on the generated site passed for Cloud + ns-3 filtering, EasiEI selection, Chinese switching with retained filters/shortlist, comparison conditions, decorative SVG accessibility, 390-pixel mobile layout, and light/dark rendering.
