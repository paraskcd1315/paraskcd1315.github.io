import PhoneTrio from "../PhoneTrio";
import type { ProjectMockProps } from "./ProjectMock.types";

const PHONE_MOCKS = {
  kcd: {
    shots: ["/assets/kcd-1.jpeg", "/assets/kcd-2.jpeg", "/assets/kcd-4.jpeg"],
    background: "linear-gradient(160deg, #0d1f14, #1a1410)",
    alt: "KCD Search",
  },
  influential: {
    shots: ["/assets/influential-1.png", "/assets/influential-2.png"],
    background: "linear-gradient(160deg, #0a0d18, #06080f)",
    alt: "Influential Launcher",
    phoneWidth: 200,
    phoneMaxHeight: 440,
    borderRadius: 26,
    gap: "28px",
  },
  spotlight: {
    shots: [
      "/assets/spotlight-1.png",
      "/assets/spotlight-2.png",
      "/assets/spotlight-3.png",
    ],
    background: "linear-gradient(160deg, #0d1018, #14171f)",
    alt: "Spotlight Search",
  },
  unitedwalls: {
    shots: [
      "/assets/unitedwalls-1.jpeg",
      "/assets/unitedwalls-2.jpeg",
      "/assets/unitedwalls-3.jpeg",
    ],
    background: "linear-gradient(160deg, #1a0f1f, #0d0716)",
    alt: "United Walls",
  },
};

export default function ProjectMock({ kind }: Readonly<ProjectMockProps>) {
  const config = PHONE_MOCKS[kind];
  if (!config) return null;
  return <PhoneTrio {...config} />;
}
