import type { Meta, StoryObj } from "@storybook/react";
import { ShadcnForm, validator } from "@/forms/theme";
import { profileSchema } from "../schemas/profileSchema";
import { profileUiSchema } from "../schemas/profileUiSchema";

const meta: Meta<typeof ShadcnForm> = {
  title: "features/user-profile/ProfileForm",
  component: ShadcnForm,
};
export default meta;

type Story = StoryObj<typeof ShadcnForm>;

export const Default: Story = {
  args: {
    schema: profileSchema,
    uiSchema: profileUiSchema,
    validator,
    formData: {
      name: "山田太郎",
      age: 30,
      favoriteSake: "純米大吟醸",
      newsletter: true,
    },
  },
};

export const Empty: Story = {
  args: {
    schema: profileSchema,
    uiSchema: profileUiSchema,
    validator,
    formData: {},
  },
};
