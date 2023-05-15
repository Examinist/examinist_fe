import React from "react";
import { useParams } from "react-router-dom";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { IFormInputs } from "../../Fields";

export interface IItem {
  label: string;
  value: number | string;
}
interface ICustomDropDownProps {
  items: IItem[];
  title?: string;
  name: "topic" | "difficulty" | "question_type";
  firstOption?: string;
}
export default function CustomDropDown({
  items,
  name,
  title,
  firstOption,
}: ICustomDropDownProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<IFormInputs>();
  return (
    <>
      {title && (
        <Typography
          sx={{ fontSize: "20px", fontWeight: "500", py: 2 }}
          color="#6B6767"
        >
          {title}
        </Typography>
      )}
      <FormControl sx={{ width: "80%", ml: 2 }}>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              onChange={onChange}
              displayEmpty
              error={errors[name] ? true : false}
            >
              <MenuItem value="" disabled color="white">
                <em>{firstOption}</em>
              </MenuItem>
              {items.map((item) => (
                <MenuItem value={item.value} key={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          )}
        ></Controller>
      </FormControl>
    </>
  );
}
