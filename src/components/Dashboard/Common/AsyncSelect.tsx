import React, { useCallback, useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { Controller, Control } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { IAsyncSelectOption } from "@/types/AsyncSelectOption";
import { useTranslations } from "next-intl";
import { getBaseUrl } from "@/lib/utils";

interface IAsyncSelectComponentProps {
  control: Control<any>;
  name: string;
  label: string;
  url: string;
  placeholder?: string;
  isRequired?: boolean;
  id?: string;
  defaultValue?: IAsyncSelectOption | null; // Default value for edit
}

export const AsyncSelectComponent: React.FC<IAsyncSelectComponentProps> = ({
  control,
  name,
  label,
  url,
  placeholder = "Select...",
  isRequired = false,
  id,
  defaultValue = null,
}) => {
  const [initialValue, setInitialValue] = useState<IAsyncSelectOption | null>(
    defaultValue
  );
  const t = useTranslations("Dashboard.AsyncSelect");
  const loadOptions = useCallback(
    async (inputValue: string): Promise<IAsyncSelectOption[]> => {
      const response = await fetch(`${getBaseUrl()}${url}?name=${inputValue}`);
      const result = await response.json();
      return result.data.map(
        (item: { first_name: string; last_name: string; id: string }) => ({
          label: `${item.first_name} ${item.last_name}`,
          value: item.id,
        })
      );
    },
    [url]
  );

  useEffect(() => {
    if (defaultValue && !initialValue) {
      // If there is a default value, set it as the initial value for the select
      setInitialValue(defaultValue);
    }
  }, [defaultValue, initialValue]);

  return (
    <div className="space-y-2 my-3">
      <Label htmlFor={id || name} className="text-right">
        {label}
      </Label>
      <Controller
        control={control}
        name={name}
        rules={
          isRequired ? { required: `${label} ${t("AsyncRequire")}` } : undefined
        }
        defaultValue={defaultValue?.value || ""} // Use the value of defaultValue or empty string
        render={({ field, fieldState: { error } }) => (
          <>
            <AsyncSelect<IAsyncSelectOption>
              id={id || name}
              cacheOptions
              loadOptions={loadOptions}
              defaultOptions
              value={initialValue} // Set initial value
              onChange={(selectedOption) => {
                field.onChange(selectedOption?.value);
                setInitialValue(selectedOption);
              }}
              placeholder={placeholder}
            />
            {error && (
              <div className="text-red-500 w-full">{error.message}</div>
            )}
          </>
        )}
      />
    </div>
  );
};
