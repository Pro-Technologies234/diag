import {
  IconMail,
  IconUser,
  IconBriefcase,
  IconTarget,
  IconUsers,
  IconLock,
  IconCheck,
  IconBuildingSkyscraper,
} from "@tabler/icons-react";
import { FormEngineConfig } from "../form-engine/types";

export const ONBOARDING_CONFIG: FormEngineConfig[] = [
  {
    order: 1,
    sectionKey: "create-account",
    heading: "Let's start with the basics",
    subHeading:
      "Enter your email and set a secure password. This helps us keep your account safe and ready for future logins.",
    visual: <IconMail size={40} />,
    fields: [
      {
        id: "email",
        path: "email",
        label: "Email address",
        placeholder: "Your email address",
        required: true,
        gridSpan: 2,
        className: "w-full",
        variant: "text",
      },
      {
        id: "password",
        path: "password",
        label: "Create password",
        placeholder: "Create your password",
        required: true,
        gridSpan: 2,
        className: "w-full",
        variant: "text",
      },
      {
        id: "confirm-password",
        path: "confirmPassword",
        label: "Confirm password",
        placeholder: "Confirm your password",
        required: true,
        gridSpan: 2,
        className: "w-full",
        variant: "text",
      },
    ],
  },

  {
    order: 2,
    sectionKey: "verify-email",
    heading: "Verify Email address",
    subHeading:
      "A six digit verification code has been sent to your email address, enter it here to verify your ",
    visual: <IconLock size={40} />,
    fields: [
      {
        id: "verification-code",
        path: "verificationCode",
        label: "Verification Code",
        placeholder: "Enter 6-digit code",
        hint: "Didn't get Code? Resend code in 10 sec",
        required: true,
        gridSpan: 2,
        // className: "w-full",
        variant: "otp",
      },
    ],
  },

  {
    order: 3,
    sectionKey: "about-you",
    heading: "Who's joining us?",
    subHeading:
      "We'd love to know your name and role so we can tailor the experience to how you work best, whether you're solo or with a team.",
    visual: <IconUser size={40} />,
    fields: [
      {
        id: "full-name",
        path: "fullName",
        label: "What should we call you?",
        placeholder: "eg., Orimadegun Promise",
        required: true,
        gridSpan: 2,
        className: "w-full",
        variant: "text",
      },
      {
        id: "role",
        path: "role",
        label: "What's your role?",
        placeholder: "eg., Product designer",
        required: true,
        gridSpan: 2,
        className: "w-full",
        variant: "text",
      },
      {
        id: "team-size",
        path: "teamSize",
        label: "Are you working solo or with a team?",
        required: true,
        gridSpan: 2,
        className: "w-full",
        variant: "radio",
        componentProps: {
          layout: "grid",
          columns: 1,
          size: "md",
          options: [
            {
              label: "Just me",
              value: "solo",
            },
            {
              label: "2–10 teammates",
              value: "2–10",
            },
            {
              label: "11–50 teammates",
              value: "11–50",
            },
            {
              label: "50+ teammates",
              value: "50+",
            },
          ],
        },
      },
    ],
  },

  {
    order: 4,
    sectionKey: "workspace-name",
    heading: "Create your workspace",
    subHeading:
      "Name your workspace and invite teammates (if you'd like). You can always add more later, we'll keep things flexible.",
    visual: <IconBuildingSkyscraper size={40} />,
    fields: [
      {
        id: "workspace-name",
        path: "workspaceName",
        label: "What's the name of your workspace?",
        placeholder: "eg., Nexa team",
        required: true,
        gridSpan: 2,
        className: "w-full",
        variant: "text",
      },
    ],
  },

  {
    order: 5,
    sectionKey: "invite-teammates",
    heading: "Invite teammates by email",
    subHeading:
      "Add their email addresses so they can join your workspace right away. You can skip this and invite them later.",
    visual: <IconUsers size={40} />,
    fields: [
      {
        id: "teammate-emails",
        path: "teammateEmails",
        label: "Enter Email Address?",
        placeholder: "eg., Adebanjo@gmail.com",
        hint: "Separate multiple emails with commas. Press Enter or comma to add each teammate. They won't receive an invite until you've completed your setup.",
        required: false,
        gridSpan: 2,
        className: "w-full",
        variant: "text",
      },
    ],
  },

  {
    order: 6,
    sectionKey: "choose-focus",
    heading: "What do you want to achieve?",
    subHeading:
      "Choose a use case so we can recommend the right tools and templates to get you started faster. You can always change this later.",
    visual: <IconTarget size={40} />,
    fields: [
      {
        id: "use-case",
        path: "useCase",
        label: "Select your primary goal",
        required: true,
        gridSpan: 2,
        className: "w-full",
        variant: "card-select",
        componentProps: {
          layout: "list",
          size: "md",
          multiple: false,
          options: [
            {
              label: "Manage projects or tasks",
              value: "manage-projects",
              description: "Plan, track, and complete work efficiently",
              icon: <IconBriefcase size={20} />,
            },
            {
              label: "Collaborate with my team",
              value: "collaborate",
              description:
                "Share updates, files, and feedback all in one place",
              icon: <IconUsers size={20} />,
            },
            {
              label: "Track performance or KPIs",
              value: "track-kpis",
              description: "Build dashboards to monitor growth and goals",
              icon: <IconTarget size={20} />,
            },
            {
              label: "Design workflows or systems",
              value: "design-workflows",
              description: "Create reusable templates and internal tools",
              icon: <IconBuildingSkyscraper size={20} />,
            },
            {
              label: "Just exploring for now",
              value: "exploring",
              description: "Show me around, I'll decide later",
              icon: <IconCheck size={20} />,
            },
          ],
        },
      },
    ],
  },
];

import { z } from "zod";

export const onboardingFormSchema = z
  .object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),

    verificationCode: z
      .string()
      .length(6, "Verification code must be 6 digits")
      .regex(/^\d+$/, "Verification code must contain only numbers"),

    fullName: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),
    role: z
      .string()
      .min(2, "Role must be at least 2 characters")
      .max(100, "Role must be less than 100 characters"),
    teamSize: z.string().min(2, "Select team size"),

    workspaceName: z
      .string()
      .min(2, "Workspace name must be at least 2 characters")
      .max(100, "Workspace name must be less than 100 characters"),

    teammateEmails: z.array(z.string()),

    useCase: z.enum([
      "manage-projects",
      "collaborate",
      "track-kpis",
      "design-workflows",
      "exploring",
    ]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type OnboardingFormValues = z.infer<typeof onboardingFormSchema>;
