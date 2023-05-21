import { InterestsProps } from "@/types";

export default function Interests({
  interests,
  setInterests,
  previousStep,
}: InterestsProps) {
  console.log(interests);
  console.log(setInterests);
  console.log(previousStep);
  return <div>Interests</div>;
}
