"use client";

import {
  FieldRenderer,
  FormCanvas,
  FormControls,
  FormManifest,
  FormViewport,
  useFormRuntime,
} from "@/components/form-engine";
import { FormProvider, useForm } from "react-hook-form";
import {
  ONBOARDING_CONFIG,
  onboardingFormSchema,
  OnboardingFormValues,
} from "./config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Link from "next/link";
import { IconBrandGoogle } from "@tabler/icons-react";
import { Separator } from "../ui/separator";
import { OnboardignSidebar } from "./sidebar";
import { redirect, useRouter } from "next/navigation";

export function OnboardingForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      verificationCode: "",
      fullName: "",
      role: "",
      teamSize: "solo",
      workspaceName: "",
      teammateEmails: [],
      useCase: "exploring",
    },
  });

  function getFirstErrorMessage(fields: (keyof OnboardingFormValues)[]) {
    const errors = form.formState.errors;
    const firstField = fields.find((f) => errors[f]);
    return firstField ? (errors[firstField]?.message as string) : undefined;
  }

  const onSubmit = async (data: OnboardingFormValues): Promise<boolean> => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Setup completed successfully!");
      router.push("/dashboard");

      return true;
    } catch (error) {
      toast.error("Unable to complete setup. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const multistep = useFormRuntime<keyof OnboardingFormValues>({
    config: ONBOARDING_CONFIG,
    initialStep: 1,
    steps: ONBOARDING_CONFIG.length,
    guards: {
      1: async (fields) => {
        const valid = await form.trigger(fields);
        if (!valid) {
          toast.error(
            getFirstErrorMessage(fields) ??
              "Please enter a valid email and password.",
          );
          return false;
        }
        return true;
      },
      2: async (fields) => {
        const valid = await form.trigger(fields);
        if (!valid) {
          toast.error(
            getFirstErrorMessage(fields) ??
              "Please enter the 6-digit verification code.",
          );
          return false;
        }
        return true;
      },
      3: async (fields) => {
        const valid = await form.trigger(fields);
        if (!valid) {
          toast.error(
            getFirstErrorMessage(fields) ?? "Please tell us about yourself.",
          );
          return false;
        }
        return true;
      },
      4: async (fields) => {
        const valid = await form.trigger(fields);
        if (!valid) {
          toast.error(
            getFirstErrorMessage(fields) ?? "Please name your workspace.",
          );
          return false;
        }
        return true;
      },
      5: async (fields) => {
        // Optional step - always return true even if empty
        return true;
      },
      6: async (fields) => {
        const valid = await form.trigger(fields);
        if (!valid) {
          toast.error(
            getFirstErrorMessage(fields) ??
              "Please select what you want to achieve.",
          );
          return false;
        }
        await onSubmit(form.getValues());
        return true;
      },
    },
  });

  const { step, isFirst, isLast, prev, next } = multistep;

  return (
    <section className="md:grid grid-cols-5 items-center h-screen">
      <section className="md:col-span-2 bg-primary/5 h-full not-md:hidden">
        <OnboardignSidebar steps={ONBOARDING_CONFIG} currentStep={step} />
      </section>
      <section className="md:col-span-3 bg-background overflow-hidden md:px-4 ">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit((data) => console.log(data))}
            className=" max-w-xl mx-auto"
          >
            <FormCanvas
              header={
                <FormControls
                  isFirst={isFirst}
                  isLast={isLast}
                  loading={loading}
                  onBack={prev}
                  onNext={next}
                  nextLabel="Continue"
                  submitLabel="Submit"
                  layout="panel"
                  hideBackOnFirst={false}
                />
              }
            >
              {ONBOARDING_CONFIG.map(
                ({ fields, order, heading, subHeading }) => (
                  <FormViewport
                    key={order}
                    step={step}
                    when={order}
                    className=" space-y-8"
                  >
                    <FormManifest
                      title={heading}
                      description={subHeading}
                      className=" items-start text-left"
                    />
                    {fields.map((field) => (
                      <FieldRenderer key={field.path} field={field} />
                    ))}
                    <FormViewport
                      key={order}
                      step={step}
                      when={1}
                      className=" flex-col items-center flex text-center text-sm"
                    >
                      <span>
                        Already have an account ?{" "}
                        <Link href={"/"} className=" text-primary">
                          {" "}
                          Login
                        </Link>
                      </span>
                      <p className=" text-xs">
                        By creating an account, i agree to MayK Ai's
                        <Link href={"/"} className=" text-primary">
                          {" "}
                          Terms of use
                        </Link>{" "}
                        and{" "}
                        <Link href={"/"} className=" text-primary">
                          {" "}
                          Privacy policy
                        </Link>
                      </p>
                      <Separator />
                      <Button variant={"outline"} className="w-full">
                        <IconBrandGoogle /> Continue with Google
                      </Button>
                    </FormViewport>
                  </FormViewport>
                ),
              )}
            </FormCanvas>
          </form>
        </FormProvider>
      </section>
    </section>
  );
}
