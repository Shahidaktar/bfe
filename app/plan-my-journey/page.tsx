import type { Metadata } from "next";
import { PlanPage } from "../../components/PlanPage";

export const metadata: Metadata = {
  title: "Plan My Journey - Beyond Forever Earth",
  description:
    "Tell us what you are dreaming of. A dedicated travel specialist will design a private itinerary around your pace and preferences.",
};

export default function PlanJourneyPage() {
  return <PlanPage />;
}
