import React, { useCallback } from "react";
import AsyncSelect from "react-select/async";
import { Controller, Control } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { IAsyncSelectOption } from "@/types/AsyncSelectOption";

interface IAsyncSelectComponentProps {
  control: Control<any>;
  name: string;
  label: string;
  url: string;
  placeholder?: string;
  isRequired?: boolean;
  id?: string;
  defaultValue?: IAsyncSelectOption | null; // Add defaultValue prop
}

export const AsyncSelectComponent: React.FC<IAsyncSelectComponentProps> = ({
  control,
  name,
  label,
  url,
  placeholder = "Select...",
  isRequired = false,
  id,
  defaultValue = null, // Default value
}) => {
  const loadOptions = useCallback(
    async (inputValue: string): Promise<IAsyncSelectOption[]> => {
      const response = await fetch(`${url}?name=${inputValue}`);
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

  return (
    <div className="space-y-2 my-3">
      <Label htmlFor={id || name} className="text-right">
        {label}
      </Label>
      <Controller
        control={control}
        name={name}
        rules={isRequired ? { required: `${label} is required` } : undefined}
        defaultValue={defaultValue?.value} // Set default value
        render={({ field, fieldState: { error } }) => (
          <>
            <AsyncSelect<IAsyncSelectOption>
              id={id || name}
              cacheOptions
              loadOptions={loadOptions}
              defaultOptions
              onChange={(selectedOption) =>
                field.onChange(selectedOption?.value)
              }
              placeholder={placeholder}
              defaultValue={defaultValue}
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
