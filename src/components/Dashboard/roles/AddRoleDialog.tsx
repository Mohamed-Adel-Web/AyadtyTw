import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAddData from "@/customHooks/crudHooks/useAddData";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Role } from "@/types/RolesTypes/role";
import { rolesUrl } from "@/backend/backend";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { sections } from "./sections";
import { generateDefaultPermissions } from "@/lib/utils";
import DialogLayout from "../generalDialog/DialogLayout";
import { useTranslations } from "next-intl";

export function AddDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations("Dashboard.role.dialog"); 

  const { register, formState, handleSubmit, reset } = useForm<Role>({
    defaultValues: {
      permissions: generateDefaultPermissions(sections),
    },
  });

  const { mutate, isSuccess, isPending } = useAddData<Role>(
    rolesUrl,
    "addRole",
    "allRole"
  );

  const { errors } = formState;

  const onSubmit = (data: Role) => {
    mutate(data);
  };

  useMemo(() => {
    if (isSuccess) {
      onOpenChange(false);
      reset();
    }
  }, [isSuccess, onOpenChange, reset]);

  return (
    <DialogLayout open={open} onOpenChange={onOpenChange}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="name" className="text-right">
            {t("nameLabel")}
          </Label>
          <Input
            id="name"
            className="col-span-3"
            {...register("name", {
              required: t("roleNameRequired"),
            })}
          />
          {errors.name && (
            <div className="text-red-500 w-full">{errors.name.message}</div>
          )}
        </div>

        {/* Accordion for Permissions */}
        <Accordion type="single" collapsible className="w-full mt-4">
          {sections.map((section) => (
            <AccordionItem key={section} value={section}>
              <AccordionTrigger>{t(`sections.${section}`)}</AccordionTrigger>
              <AccordionContent>
                <div className="flex justify-between items-start">
                  {/* Special handling for profileType section */}
                  {section === "profileType" ? (
                    <>
                      {["doctor", "patient", "assistant"].map((type) => (
                        <div
                          key={type}
                          className="flex items-center justify-center space-x-1 mb-2"
                        >
                          <div className="inline-flex items-center">
                            <label
                              className="relative flex items-center p-2 rounded-full cursor-pointer"
                              htmlFor={`${section}-${type}`}
                            >
                              <input
                                type="radio"
                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                                id={`${section}-${type}`}
                                value={type}
                                {...register(`permissions.${section}.type`, {
                                  required: t("profileTypeRequired"),
                                })}
                              />
                              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3.5 w-3.5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  strokeWidth="1"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                              </span>
                            </label>
                          </div>
                          <label
                            htmlFor={`${section}-${type}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                          >
                            {t(`sections.${type}`)}
                          </label>
                        </div>
                      ))}
                      {errors.permissions?.profileType?.type && (
                        <div className="text-red-500 w-full">
                          {errors.permissions.profileType.message}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {/* Default permissions section rendering */}
                      {["create", "read", "update", "delete"].map((action) => (
                        <div
                          key={action}
                          className="flex items-center justify-center space-x-1"
                        >
                          <div className="inline-flex items-center">
                            <label
                              className="relative flex items-center p-2 rounded-full cursor-pointer"
                              htmlFor={`${section}-${action}`}
                            >
                              <input
                                type="checkbox"
                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                                id={`${section}-${action}`}
                                {...register(
                                  `permissions.${section}.${action}`
                                )}
                              />
                              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3.5 w-3.5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  strokeWidth="1"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                              </span>
                            </label>
                          </div>
                          <label
                            htmlFor={`${section}-${action}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                          >
                            {t(`actions.${action}`)}
                          </label>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <DialogFooter className="mt-3">
          <Button type="submit" disabled={isPending}>
            {t("saveChanges")}
          </Button>
        </DialogFooter>
      </form>
    </DialogLayout>
  );
}
