/**
 * Shared metadata for the 3D cards and viewers. Thumbnails render the actual GLBs.
 * Triangle counts include mesh instances in each GLB's default scene.
 */
export const models3dCatalog = [
  {
    id: "kitchen",
    name: "Kitchen Interior",
    subtitle: "Cabinetry, Appliances & Interior Layout",
    category: "Spatial Environment",
    image: "/models/thumbs/kitchen.jpg",
    file: "/models/Kitchen 3D.glb",
    description: "A kitchen scene with cabinets, a sink, cooker, refrigerator, and countertop details arranged within a two-wall interior layout.",
    tags: ["Interior Modeling", "Kitchen Design", "Appliance Modeling"],
    polyCount: "23,740 Tris",
    textureFormat: "glTF PBR Materials",
    specs: [
      { label: "Scene Triangles", value: "23,740" },
      { label: "Embedded Images", value: "0" },
      { label: "Animation Clips", value: "0" },
      { label: "Format", value: "GLB / glTF 2.0" }
    ]
  },
  {
    id: "school-presentation-hall",
    name: "School Presentation Hall",
    subtitle: "Architectural Space & Presentation Equipment",
    category: "Spatial Environment",
    image: "/models/thumbs/school-presentation-hall.jpg",
    file: "/models/school presentation hall.glb",
    description: "A school presentation-hall scene with a podium, television, doors, windows, fans, and security-camera props. The GLB includes six animation clips.",
    tags: ["Architecture", "Interior Modeling", "Presentation Space"],
    polyCount: "269,206 Tris",
    textureFormat: "glTF PBR Materials & Image Textures",
    // An oversized camera source object sits outside the hall in the supplied file.
    framingExcludeMeshNames: ["Object_4"],
    specs: [
      { label: "Scene Triangles", value: "269,206" },
      { label: "Embedded Images", value: "2" },
      { label: "Animation Clips", value: "6" },
      { label: "Format", value: "GLB / glTF 2.0" }
    ]
  },
  {
    id: "m4-rifle",
    name: "M4 Rifle",
    subtitle: "Hard-Surface Prop Study",
    category: "Prop Modeling",
    image: "/models/thumbs/m4-rifle.jpg",
    file: "/models/m4 again.glb",
    scale: 1,
    position: [0, -0.2, 0],
    cameraPosition: [3.4, 1.6, 3.4],
    fov: 40,
    description: "A rifle prop with a modeled stock, magazine, barrel and sight assembly, available to inspect in the interactive viewer.",
    tags: ["Hard-Surface Modeling", "Prop Study", "Interactive 3D"],
    polyCount: "26,750 Tris",
    textureFormat: "glTF PBR Materials",
    specs: [
      {
        label: "Scene Triangles",
        value: "26,750"
      },
      {
        label: "Embedded Images",
        value: "0"
      },
      {
        label: "Format",
        value: "GLB / glTF 2.0"
      }
    ]
  },
  {
    id: "dream-room",
    name: "Dream Room Interior",
    subtitle: "Furnished Interior & Workspace",
    category: "Spatial Environment",
    image: "/models/thumbs/dream-room.jpg",
    file: "/models/dream room.glb",
    scale: 0.9,
    position: [0, -0.4, 0],
    cameraPosition: [4.2, 3.2, 4.2],
    fov: 42,
    description: "A furnished room scene with a desk setup, storage, appliances and interior props arranged within an open-top layout.",
    tags: ["Interior Modeling", "Furniture", "Spatial Composition"],
    polyCount: "296,644 Tris",
    textureFormat: "glTF PBR Materials & Image Textures",
    specs: [
      {
        label: "Scene Triangles",
        value: "296,644"
      },
      {
        label: "Embedded Images",
        value: "5"
      },
      {
        label: "Format",
        value: "GLB / glTF 2.0"
      }
    ]
  },
  {
    id: "flask-vessel",
    name: "Drinking Flask",
    subtitle: "Bottle & Cap Product Study",
    category: "Product CGI",
    image: "/models/thumbs/flask-vessel.jpg",
    file: "/models/flask.glb",
    scale: 1.35,
    position: [0, -0.15, 0],
    cameraPosition: [0, 0.4, 4.2],
    fov: 40,
    description: "A drinking flask with a separate cap, presented in a simple product scene with two embedded animation clips.",
    tags: ["Product Modeling", "Bottle & Cap", "Interactive 3D"],
    polyCount: "13,574 Tris",
    textureFormat: "glTF PBR Materials",
    specs: [
      {
        label: "Scene Triangles",
        value: "13,574"
      },
      {
        label: "Embedded Images",
        value: "0"
      },
      {
        label: "Format",
        value: "GLB / glTF 2.0"
      }
    ]
  },
  {
    id: "chess-set",
    name: "Chess Set & Board",
    subtitle: "Black & White Pieces on a Checkered Board",
    category: "Sculpture & Props",
    image: "/models/thumbs/chess-set.jpg",
    file: "/models/chess pieces.glb",
    scale: 1.1,
    position: [0, -0.25, 0],
    cameraPosition: [0, 1.8, 3.8],
    fov: 40,
    description: "A complete chess arrangement with black and white pieces on a green-and-white board, enclosed by a raised surround.",
    tags: ["Chess Pieces", "Prop Modeling", "Board Layout"],
    polyCount: "59,324 Tris",
    textureFormat: "glTF PBR Materials",
    specs: [
      {
        label: "Scene Triangles",
        value: "59,324"
      },
      {
        label: "Embedded Images",
        value: "0"
      },
      {
        label: "Format",
        value: "GLB / glTF 2.0"
      }
    ]
  },
  {
    id: "rain-umbrella",
    name: "Umbrella Character Scene",
    subtitle: "Stylized Rain Scene & Character Study",
    category: "Character Scene",
    image: "/models/thumbs/rain-umbrella.jpg",
    file: "/models/umbrella and rain scene1.glb",
    scale: 0.9,
    position: [0, -0.35, 0],
    cameraPosition: [0, 1.2, 4.4],
    fov: 42,
    description: "A stylized scene combining a rigged character, an umbrella and an oversized raindrop form, with an embedded animation clip.",
    tags: ["Character Rigging", "Umbrella Prop", "Stylized Scene"],
    polyCount: "36,164 Tris",
    textureFormat: "glTF PBR Materials & Image Textures",
    specs: [
      {
        label: "Scene Triangles",
        value: "36,164"
      },
      {
        label: "Embedded Images",
        value: "4"
      },
      {
        label: "Format",
        value: "GLB / glTF 2.0"
      }
    ]
  },
  {
    id: "street-basketball",
    name: "Basketball Character Scene",
    subtitle: "Sports Character & Hoop Staging",
    category: "Sports Scene",
    image: "/models/thumbs/street-basketball.jpg",
    file: "/models/play basket.glb",
    scale: 0.85,
    position: [0, -0.5, 0],
    cameraPosition: [0, 1.5, 4.8],
    fov: 44,
    description: "A basketball scene featuring a rigged character and hoop within an enclosed setting, with two embedded animation clips.",
    tags: ["Sports Scene", "Character Rigging", "Basketball"],
    polyCount: "46,380 Tris",
    textureFormat: "glTF PBR Materials & Image Textures",
    specs: [
      {
        label: "Scene Triangles",
        value: "46,380"
      },
      {
        label: "Embedded Images",
        value: "4"
      },
      {
        label: "Format",
        value: "GLB / glTF 2.0"
      }
    ]
  },
  {
    id: "martial-combat",
    name: "Dual Character Combat Study",
    subtitle: "Two-Character Rigging & Pose Study",
    category: "Character & Rigging",
    image: "/models/thumbs/martial-combat.jpg",
    file: "/models/two foght.glb",
    scale: 0.9,
    position: [0, -0.45, 0],
    cameraPosition: [0, 1.2, 4.2],
    fov: 42,
    description: "A two-character scene with rigged figures and two embedded animation clips for a combat pose study.",
    tags: ["Character Posing", "Rigging", "Two-Character Scene"],
    polyCount: "54,012 Tris",
    textureFormat: "glTF PBR Materials & Image Textures",
    specs: [
      {
        label: "Scene Triangles",
        value: "54,012"
      },
      {
        label: "Embedded Images",
        value: "4"
      },
      {
        label: "Format",
        value: "GLB / glTF 2.0"
      }
    ]
  }
];
