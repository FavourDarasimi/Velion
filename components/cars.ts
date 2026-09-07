export type CarStatus = "available" | "soon";

export type BodyType = "Coupé" | "Cabrio" | "SUV" | "Electric";

export interface Car {
  id: string;
  name: string;
  tagline: string;
  price?: string;
  monthly?: string;
  badge?: string;
  status: CarStatus;
  bodyType: BodyType;
  image?: string;
  imageAlt?: string;
}

export const FILTERS: Array<"All" | BodyType> = [
  "All",
  "Coupé",
  "Cabrio",
  "SUV",
  "Electric",
];

export const CARS: Car[] = [
  {
    id: "coupe-01",
    name: "911 Carrera S",
    tagline: "2022 · 18,400 km · PDK",
    price: "€129,900",
    monthly: "€1,899/mo est.",
    badge: "New in",
    status: "available",
    bodyType: "Coupé",
    image: "/gallery/side.jpg",
    imageAlt:
      "Midnight-blue sports coupe, pure side profile in a dark studio",
  },
  {
    id: "cabrio-02",
    name: "Velion Roadster",
    tagline: "Reveal Thursday",
    status: "soon",
    bodyType: "Cabrio",
  },
  {
    id: "suv-03",
    name: "Velion Tourer",
    tagline: "Reveal next week",
    status: "soon",
    bodyType: "SUV",
  },
];
