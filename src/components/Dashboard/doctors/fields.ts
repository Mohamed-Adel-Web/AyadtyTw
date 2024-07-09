import { Doctor } from "@/types/doctorsTypes/doctors";

export const fields: {
    name: keyof Doctor;
    type: string;
    label: string;
    required?: string;
    validate?: boolean;
    showInAdd?: boolean;
    showInEdit?: boolean;
  }[] = [
    {
      name: "full_name",
      type: "text",
      label: "Full Name",
      required: "Full name is required",
      validate: true,
      showInAdd: true,
      showInEdit: true,
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      required: "Email is required",
      validate: true,
      showInAdd: true,
      showInEdit: true,
    },
    {
      name: "phone",
      type: "text",
      label: "Phone",
      required: "Phone number is required",
      validate: true,
      showInAdd: true,
      showInEdit: true,
    },
    {
      name: "image",
      type: "file",
      label: "Image",
      validate: false,
      showInAdd: true,
      showInEdit: false,
    },
    {
      name: "consultant_price",
      type: "number",
      label: "Consultant Price",
      required: "Consultant price is required",
      validate: true,
      showInAdd: true,
      showInEdit: true,
    },
    {
      name: "disclosure_price",
      type: "number",
      label: "Disclosure Price",
      required: "Disclosure price is required",
      validate: true,
      showInAdd: true,
      showInEdit: true,
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      required: "Password is required",
      validate: true,
      showInAdd: true,
      showInEdit: false,
    },
  ];
  