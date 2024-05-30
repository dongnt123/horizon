import { Control, FieldPath } from "react-hook-form";
import { HTMLInputTypeAttribute } from "react";
import { z } from "zod";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authFormSchema } from "@/lib/utils";

const formSchema = authFormSchema("sign-up");
interface FormElementProps {
  control: Control<z.infer<typeof formSchema>>,
  name: FieldPath<z.infer<typeof formSchema>>,
  label: string,
  placeHolder: string,
  type?: HTMLInputTypeAttribute
}

const FormElement = ({ control, name, label, placeHolder, type = "text" }: FormElementProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormItem>
            <FormLabel className="form-label">{label}</FormLabel>
            <div className="flex w-full flex-col">
              <FormControl>
                <Input placeholder={placeHolder} {...field} type={type} className="input-class" />
              </FormControl>
            </div>
            <FormMessage className="form-message mt-2" />
          </FormItem>
        </div>
      )}
    />
  )
}

export default FormElement;