import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "2026",
    title: "Neighborhood Tree Planting",
    description:
      "Our upcoming neighborhood grant proposal aims to plant trees throughout Holdeman to enhance shade, beautify our streets, and improve our green infrastructure.",
    year: "2025-2026",
    image: {
      path: "/images/tree-planting",
      alt: "Tree planting project photo",
      formats: ["webp", "jpg"],
    },
    slug: "2026",
    current: true,
  },
  {
    id: "2025",
    title: "Hardy Drive Bike Lane Project",
    description:
      "A community-led project to create vibrant and safer bike lanes on Hardy Drive with murals designed by a local artist.",
    year: "2024-2025",
    image: {
      path: "/images/hardy-painting-1",
      alt: "Hardy Drive bike lane mural photo",
      formats: ["webp", "jpg"],
      credit: {
        name: "Winona Grey",
        url: "https://nonagrey.com/",
      },
    },
    slug: "2025",
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getAllProjects(): Project[] {
  return projects;
}
