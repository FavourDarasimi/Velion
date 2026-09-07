export interface CarShot {
  src: string;
  alt: string;
  label: string;
  n: string;
}

export const DIALOG_HASH = "#car";

export const SHOTS: CarShot[] = [
  {
    src: "/gallery/side.jpg",
    alt: "Midnight-blue sports coupe, pure side profile in a dark studio",
    label: "Side profile",
    n: "01",
  },
  {
    src: "/gallery/front-34.jpg",
    alt: "Midnight-blue sports coupe, front three-quarter view",
    label: "Front three-quarter",
    n: "02",
  },
  {
    src: "/gallery/rear-34.jpg",
    alt: "Midnight-blue sports coupe, rear three-quarter view",
    label: "Rear three-quarter",
    n: "03",
  },
  {
    src: "/gallery/front.jpg",
    alt: "Midnight-blue sports coupe, direct front view with headlights on",
    label: "Front",
    n: "04",
  },
  {
    src: "/gallery/rear.jpg",
    alt: "Midnight-blue sports coupe, direct rear view with lit taillights",
    label: "Rear",
    n: "05",
  },
  {
    src: "/gallery/wheel.jpg",
    alt: "Close-up of the silver multi-spoke forged wheel and brake caliper",
    label: "Forged wheel",
    n: "06",
  },
  {
    src: "/gallery/cockpit.jpg",
    alt: "Driver cockpit with dark leather seats and digital dash",
    label: "Cockpit",
    n: "07",
  },
];
