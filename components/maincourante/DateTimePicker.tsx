/**
 * @type {import("next").NextPage}
 * @returns {JSX.Element}
 * @param {string} label
 * @param {string} name
 * @param {any} control
 * @param {boolean} showTimeSelect
 * @param {string} dateFormat
 * @param {string} name
 * @param {any} control
 * @param {boolean} showTimeSelect
 * @param {string} dateFormat
 *
 */
import React from "react";
import { Controller } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Label } from "@/components/ui/label";
import { fr } from "date-fns/locale";

registerLocale("fr", fr);

interface DateTimePickerProps {
  label: string;
  name: string;
  control: any;
  showTimeSelect: boolean;
  dateFormat: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  label,
  name,
  control,
  showTimeSelect,
  dateFormat,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            selected={field.value}
            onChange={field.onChange}
            showTimeSelect={showTimeSelect}
            showTimeSelectOnly={showTimeSelect}
            timeIntervals={15}
            timeCaption="Heure"
            dateFormat={dateFormat}
            className="w-full"
            locale="fr"
          />
        )}
      />
    </div>
  );
};

export default DateTimePicker;
