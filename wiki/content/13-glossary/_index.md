---
title: "Glossary"
---

## Glossary

This page defines common WATCHOUT terms used throughout the user guide.

### Browse Terms

- Terms are listed alphabetically below.

### Alpha Channel

A color channel that stores pixel transparency. A value of 0 means fully transparent, and 1 means fully opaque.

### ArtNet

A DMX-over-IP protocol used to bring lighting control data into WATCHOUT. Incoming ArtNet channel values can be mapped to variables using external keys.

### Asset Manager

The centralized service that handles the entire lifecycle of media in a WATCHOUT 7 show - ingesting source files, optimizing them for playback, and distributing the results to display servers.

### Asset Watcher

A service that monitors selected folders and automatically imports new or changed files into the show. It enables unattended content ingestion workflows.

### Audio Bus

An audio bus is a virtual mono path that collects tracks from one or more audio cues and routes them to one or more output device channels. Buses are numbered from 1 upward and can be named.

### Audio Device

An audio device is any device capable of playback. In WATCHOUT, device types include WASAPI, WASAPI exclusive, Dante, and ASIO.

### Auto Run

A per-timeline property that starts the timeline automatically when the show is loaded by the Director. It is commonly used for unattended playback workflows.

### Axis Gizmo

An axis gizmo is a 3D editor control used to move, scale, and rotate objects.

### Bezier Handle

A directional control on a warp or mask junction point that shapes mesh curvature. Each handle has a length and angle, and smooth mode keeps opposing handles tangent.

### Bits Per Pixel

Bits per pixel (bpp) is the number of bits used to represent one pixel. For example, 8 bits per channel with three channels gives 24 bpp.

### Blend Mode

A compositing mode that controls how a cue's pixels combine with content behind it. Common modes include Normal, Add, Multiply, Screen, Lighten, Darken, and Linear Burn.

### Blind Edit Mode

A mode that lets you edit timeline content without affecting live playback. Changes are staged in a temporary copy and applied only when you explicitly take them live.

### Channel Mapping

Channel mapping routes audio cue channels to device channels in two stages: cue channels map to buses, then buses map to output device channels.

### Chroma Key

A keying effect that removes a selected color, typically green or blue screen, from a cue. The keyed areas become transparent for compositing over other content.

### Chromaticity

Chromaticity describes color without brightness information.

### Chrominance

Chrominance describes color information in relation to luminance.

### Codec

A codec is software or hardware used to encode and decode data streams such as audio or video.

### Codec Mapping

A configurable rule table that determines how source codecs are converted during optimization. For example, ProRes or H.264 inputs can be mapped to GPU-friendly playback codecs.

### Color Bit Depth

Color bit depth is the number of bits used per color channel. With 8-bit channels, each channel can represent 256 values.

### Color Channel

A color channel is one component in a color model. RGB has red, green, and blue channels.

### Color Depth

Color depth is the number of distinct colors that can be represented. It is related to color bit depth.

### Color Gamut

A color gamut is the full range of chromaticities a device can capture or display.

### Color Model

A color model is a numeric representation of color, such as RGB, HSV, or CMYK.

### Color Space

A color space is a constrained coordinate system for representing color values, such as sRGB or Rec.2020.

### Composition

A nested timeline unit that groups multiple cues into a single, self-contained entity. It appears as one cue in a parent timeline but contains its own layers and timing.

### Compression

Compression refers to methods used to reduce data size, such as in image or video files.

### Conditional Cue

A cue with an expression-based condition that controls whether it renders or triggers. Conditions are evaluated during playback against current variable values.

### Content-Addressed Storage

WATCHOUT's internal storage model where optimized media chunks are identified by cryptographic hash rather than filename. This enables deduplication and efficient incremental transfers.

### Control Cue

A point-in-time instruction on a timeline that changes playback state for one or more target timelines when reached by the playhead.

### Corner Pinning

A per-cue distortion effect that lets you move each corner of a cue independently for perspective and quadrilateral mapping adjustments.

### Cross-Fade

A transition where one cue fades out while another fades in over an overlap region. It is commonly used for smooth scene changes.

### Cue

An object placed on a timeline layer. Cues can hold media or control behavior such as markers, outputs, and variable automation.

### Cue List

A tabular window showing cues across timelines with sorting and filtering tools. It is useful for auditing and managing cues at scale.

### Cue Set

A named group containing one or more variants. The active variant determines which media is used by cues assigned to that set.

### Dante

A professional networked audio protocol for routing multi-channel audio over IP with low latency and precise synchronization.

### Devices Window

A Producer window for managing logical devices in the show, such as displays, virtual displays, audio devices, and capture sources.

### Director

The system coordinator in a WATCHOUT network. The Director keeps authoritative show state, coordinates playback across Runners, and hosts external control integration.

### Display

The fundamental output unit in WATCHOUT. A display maps a rectangular stage area to a physical or network output on a specific node.

### Display Grid

A tiled arrangement of displays created as rows and columns in one operation. It is used for LED walls, monitor arrays, and projector matrices.

### Display Mask

An alpha-based overlay applied per display to control visible output areas and edge shaping. Masks are applied after warp in the render pipeline.

### Display Server

A machine running the Runner service that renders show content to outputs such as projectors, LED processors, monitors, or audio devices.

### DMX / DMX Universe

DMX is a control protocol widely used in lighting systems. A DMX universe is a block of up to 512 channels; in WATCHOUT this data is typically received via ArtNet.

### DNxHR

An Avid intermediate video codec supported as a source format in WATCHOUT. During optimization, DNxHR media is transcoded to a configured playback codec.

### EDID

Extended Display Identification Data (EDID) communicates display capabilities to connected devices, such as a GPU.

### Easing Curve

The interpolation profile between tween points that controls acceleration and deceleration over time. Examples include Linear, Cubic InOut, and Bounce.

### Edge Blending

The process of smoothing overlap regions between adjacent outputs so they appear as one continuous image, instead of showing a bright seam.

### EXR

OpenEXR is a high dynamic range image format with high precision and alpha support. It is commonly used for HDR pipelines and image sequences.

### Expression

A mathematical formula that drives dynamic behavior in a show. Expressions can reference variables and are used in tweens, triggers, and cue logic.

### External Key

A protocol-specific identifier string that links an incoming external message to a WATCHOUT variable. Without an external key, a variable cannot receive external input.

### Failover

A basic redundancy approach where a backup machine shares the same host alias as a primary machine. If the primary node disappears, WATCHOUT can switch to the backup.

### Feedback Report

A compressed diagnostic package containing logs, system details, and optionally show data for troubleshooting and support cases.

### Frame Blending

A playback mode that crossfades between neighboring source frames when source and output frame rates differ, reducing judder at the cost of higher GPU bandwidth.

### Free Running

A cue behavior where media playback follows system time instead of timeline transport. Free-running media can continue while the timeline is paused or scrubbed.

### Gamma Correction

Gamma correction is a concept that includes gamma encoding and gamma decoding, used to align image storage and display with human visual perception.

### Gamma Decoding

Gamma decoding reverses gamma encoding and converts encoded values back to linear values.

### Gamma Encoding

Gamma encoding transforms image data so darker tones receive relatively more precision and brighter tones receive relatively less.

### Gaussian Blur

A blur effect based on a Gaussian distribution, used to soften and defocus content. Higher blur radius increases quality cost.

### GDTF

General Device Type Format, an open standard for describing intelligent lighting fixtures. In WATCHOUT it can be used for fixture/channel mapping workflows.

### Genlock / Framelock

Hardware synchronization methods used to align output timing across devices. Genlock ties timing to an external reference signal, while framelock synchronizes buffer swaps across GPUs.

### HAP / HAP Q / HAP Alpha

A family of GPU-oriented video codecs designed for high playback performance and responsive scrubbing. HAP Q emphasizes quality, and HAP Alpha preserves transparency.

### Hands Off

The strictest timeline lock mode. It prevents editing and operator playback control from Producer for that timeline.

### HDR

High Dynamic Range (HDR) techniques enable a wider luminance range between dark and bright image regions than SDR.

### HEVC

H.265 video codec known for strong compression efficiency. In WATCHOUT it is often used as an optimization target when smaller file size is important.

### Hit Testing

An API function that checks whether a stage coordinate intersects active visual cues. It is used for touch and interactive control workflows.

### Host Alias

A human-readable node name used by WATCHOUT as the primary identifier for networked machines. Device bindings are tied to aliases rather than raw IP addresses.

### HTTP REST API

WATCHOUT's HTTP control interface for timeline playback, variables, cue sets, monitoring streams, and other automation actions.

### Image Sequence

A numbered set of still frames treated as one media asset. WATCHOUT optimizes image sequences into efficient playback media.

### Jumbo Frames / MTU

Network tuning where MTU is increased (commonly from 1500 to 9000 bytes) to improve throughput for high-bandwidth media traffic.

### Junction Point

A control point in warp or mask meshes that defines local geometry and, for masks, visibility behavior. Junction points can include Bezier handle controls.

### Key and Fill

A compositing method where one layer acts as a key source to mask another layer. It supports luma and alpha based keying modes.

### Layer

The core organizational and compositing structure in a timeline. Layer order determines draw order when cues overlap.

### Layout Preset

A saved Producer workspace arrangement for window positions and visibility. Presets allow quick switching between operational layouts.

### Learn Mode

A variable configuration feature that captures the next incoming external control signal and assigns its external key automatically.

### Linear Wipe

A wipe transition effect that reveals or hides content with a straight moving edge. It is controlled by angle, position, feather, and completion parameters.

### Linked Handles

A tween point option that keeps Bezier in/out handles coupled for smooth continuous curve motion through that point.

### Lossless Compression

Lossless compression reduces data size without losing original information.

### Lossy Compression

Lossy compression reduces data size by discarding some information, usually with quality tradeoffs.

### LTC

Linear Time Code, a time reference encoded as audio carrying hours, minutes, seconds, and frames for synchronization workflows.

### LTC Bridge

A WATCHOUT service that decodes incoming LTC and synchronizes timeline playback to external timecode.

### Luma

Luma is the perceived brightness component of an image signal.

### Luminance

Luminance is a photometric measure of emitted or reflected brightness.

### Marker Cue

A point-in-time timeline annotation used for organization, operator guidance, and navigation. It has no visual or audio output.

### Media Cue

The primary visual or audible cue type in a timeline, including image, video, audio, 3D, virtual display, and related media sources.

### Media Snapshot

A named preset that stores selected cue property states so they can be recalled later. It is used for fast look changes without swapping media files.

### Mesh

A mesh is a 3D surface composed of connected polygons.

### MIDI

Musical Instrument Digital Interface, a protocol for control and musical devices. In WATCHOUT, MIDI data can drive variables and control actions.

### MIDI Bridge

A WATCHOUT service that receives MIDI messages and forwards translated updates to the Director for variable and playback control.

### MPCDI

Multiple Projector Common Data Interchange, a format used to exchange projection calibration data such as warp and blend information.

### MSC (MIDI Show Control)

A SysEx-based command protocol used in show control. WATCHOUT supports common MSC commands such as GO and STOP for timeline operations.

### Multicast Discovery

The UDP multicast mechanism WATCHOUT nodes use to discover each other automatically on the network.

### NDI

Network Device Interface, a video-over-IP protocol used by WATCHOUT for both network video input and output.

### NDJSON

Newline-Delimited JSON, a streaming format where each line is a JSON object. WATCHOUT provides NDJSON event endpoints for real-time state updates.

### Node

A node is a machine running WATCHOUT software. Nodes can act as display computers, audio playback machines, or control servers.

### Nodes Window

A Producer window for discovering, monitoring, and managing WATCHOUT machines and service roles on the network.

### NotchLC

A high-quality GPU-accelerated video codec supported by WATCHOUT. It is commonly used as an optimization target for ProRes workflows.

### NTP

Network Time Protocol used to synchronize clocks across WATCHOUT nodes. Accurate time sync is critical for multi-machine frame alignment.

### NVIDIA Quadro Sync

A dedicated hardware sync board for NVIDIA professional GPUs that enables genlock and framelock across outputs.

### Opacity

A cue property controlling transparency from fully transparent to fully visible. Opacity can be keyframed and combined with fades.

### Operative

The external control intake service that receives protocol messages and forwards normalized input updates into the WATCHOUT control pipeline.

### Optimization

The Asset Manager process that converts source media to playback-optimized formats, stores output in chunked content-addressed form, and prepares it for distribution.

### OSC

Open Sound Control, a network protocol for structured control messages. WATCHOUT uses OSC for variable updates and playback commands.

### Output Cue

A cue that sends external payloads, such as strings over TCP, UDP, or HTTP, at precise timeline times.

### Output Type

The display routing mode that determines where rendered output goes, such as GPU, SDI, NDI, or Virtual.

### Perspective Correction

A warp option that improves interpolation behavior under perspective-heavy transformations, reducing distortion artifacts.

### Playhead / Play Cursor

The vertical time indicator in the timeline editor showing current playback position. It advances during playback and can be moved for scrubbing.

### Polygon

A polygon is a surface defined by three or more vertices. In WATCHOUT, polygons are triangles.

### Presentation Tier

A visibility filtering layer used to decide which cues are rendered on which displays. Cues and displays must share at least one tier to render together.

### Producer

The design and programming application for WATCHOUT. It is used to build shows, configure outputs, and operate production workflows.

### ProRes

A family of intermediate video codecs commonly used in professional production. WATCHOUT supports ProRes as input and optimizes it for playback.

### PSN (PosiStageNet)

An open UDP protocol for real-time positional tracking data. WATCHOUT can map PSN fields to variables for interactive stage behavior.

### Render Info Overlay

A per-display diagnostic overlay that shows runtime technical information directly on output, such as display identity and frame data.

### Route

The destination assignment for display output, including output type and channel/port selection on a target node.

### Runner

The rendering engine in a WATCHOUT network. Runners receive show state and playback instructions from the Director and render assigned outputs.

### SDI

Serial Digital Interface, a professional uncompressed video transport standard over coaxial cable used in broadcast and live production.

### SDR

Standard Dynamic Range (SDR) is the traditional luminance range used by standard video systems.

### Show

The top-level production container that includes timelines, cues, displays, variables, and media references.

### Snap / Snapping

Timeline editing behavior that aligns cue edges to nearby reference points such as cue boundaries or the playhead to improve timing precision.

### Soft Edge

A gradual intensity falloff at overlapping display boundaries used to create seamless projector blends.

### SSE

Server-Sent Events, an HTTP streaming mechanism used by WATCHOUT APIs to push live updates to connected clients.

### Stacking Order

The rules that determine which overlapping content appears in front. Stacking can be controlled by layer order, Z depth, and timeline-level options.

### Stage

The visual canvas of WATCHOUT - a continuous spatial workspace representing your full output surface and display layout.

### Static IP

A fixed manually assigned network address for a node. Static IPs are recommended for stable show networking.

### SVG Shape

A vector-based shape asset created in WATCHOUT's built-in shape tools. Shapes are rasterized at configured resolution for playback.

### Test Pattern

A built-in diagnostic output mode used to verify routing, geometry, masking, and signal path independently of show content.

### Texture

A texture is an image applied to a mesh surface.

### Timeline

The main time-based workspace where cues are placed, sequenced, and controlled across layers.

### Timeline Trigger

An expression-based rule on a timeline that automatically issues play, pause, or stop actions when conditions become true.

### Tween

A time-based property animation on a cue. Tweens define how values such as position, scale, and opacity change over cue duration.

### Tween Expression

An expression that dynamically modifies tween values at runtime, enabling data-driven and interactive animations.

### Tween Point

A value at a specific time inside a tween, also called a keyframe. Transition type controls interpolation to the next point.

### Uniform Scaling

Uniform scaling means scaling equally on x, y, and z axes.

### UV-Coordinate

UV-coordinates map texture positions onto polygon surfaces and are also called texture coordinates.

### Variable

A named numeric value used as dynamic input for expressions and control logic. Variables can be driven externally or by variable cues.

### Variable Cue

A cue that animates a variable value over time using tween data on the timeline.

### Variant

A named slot within a cue set that stores an alternate media choice. Switching active variants changes all assigned cues together.

### Vertex

A vertex is a point in space. Three vertices define a triangle in a mesh.

### Virtual Display

A display that renders to an internal texture buffer instead of a physical connector. Its output can be reused as media elsewhere in the show.

### VLAN

Virtual Local Area Network, a network segmentation technique used to isolate and prioritize show traffic.

### Warp / Warp Mesh

Mesh-based geometry correction that repositions rendered pixels so output aligns with physical surfaces. Warp is controlled by editable junction points and curves.

### WATCHOUT 6 Protocol

A legacy-compatible text command protocol supported in WATCHOUT 7 for backward integration with existing control systems.

### WATCHPAX

Dataton's dedicated media server hardware line, preconfigured and optimized for WATCHOUT deployments.

### White Point

A white point is the reference color used to represent white in a given color space or output system.

### Wireframe

Wireframe rendering draws polygon edges as visible lines to show mesh topology and polygon density.

### Working Directory

The local folder where a WATCHOUT node stores cached assets, show data, and internal runtime files.
