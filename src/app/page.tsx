import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import { Wrapper } from "@/components/shared/wrapper";

export default function OnboardingPage() {
  return (
    <main className="">
      <Wrapper wrapper="md:p-0!" className="md:p-0!">
        <OnboardingForm />
      </Wrapper>
    </main>
  );
}
