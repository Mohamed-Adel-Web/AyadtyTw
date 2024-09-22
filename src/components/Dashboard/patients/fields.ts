import { patient } from "@/types/patientTypes/patient";

export const fields: {
  name: keyof patient;
  type: string;
  label: string; // This label should be a translation key.
  required?: string; // This should also be a translation key if needed.
  validate?: boolean;
  showInAdd?: boolean;
  showInEdit?: boolean;
}[] = [
  {
    name: "first_name",
    type: "text",
    label: "firstName", // Translation key for 'First Name'
    required: "firstNameRequired", // Translation key for 'First name is required'
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "last_name",
    type: "text",
    label: "lastName", // Translation key for 'Last Name'
    required: "lastNameRequired", // Translation key for 'Last name is required'
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "email",
    type: "email",
    label: "email", // Translation key for 'Email'
    required: "emailRequired", // Translation key for 'Email is required'
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "phone",
    type: "phone",
    label: "phone", // Translation key for 'Phone'
    required: "phoneRequired", // Translation key for 'Phone number is required'
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "password",
    type: "password",
    label: "password", // Translation key for 'Password'
    required: "passwordRequired", // Translation key for 'Password is required'
    validate: true,
    showInAdd: true,
    showInEdit: false, // Password should not be shown in edit
  },
  {
    name: "image",
    type: "file",
    label: "image", // Translation key for 'Image'
    required: "imageRequired", // Translation key for 'Image is required'
    validate: false,
    showInAdd: true,
    showInEdit: true,
  },
];
