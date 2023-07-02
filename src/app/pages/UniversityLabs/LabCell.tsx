import { Divider, IconButton, Menu, MenuItem, TextField } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import { StyledTableCell } from "./UniversityLabs";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ILab } from "../../types/Lab";
import { useFormContext } from "react-hook-form";
import { IFormInput } from "./LabTableRow";

interface ILabCellProps {
  edit: boolean;
  lab: ILab;
}

export default function LabCell({ edit, lab }: ILabCellProps) {
  if (!edit) {
    return (
      <>
        <StyledTableCell align="center">{lab.name}</StyledTableCell>
        <StyledTableCell align="center">{lab.capacity}</StyledTableCell>
      </>
    );
  } else {
    const {
      register,
      formState: { errors },
    } = useFormContext<IFormInput>();
    return (
      <>
        <StyledTableCell align="center">
          <TextField
            size="small"
            label="Lab Name"
            {...register("name")}
            error={errors.name?.message ? true : false}
            helperText={errors.name?.message}
          ></TextField>
        </StyledTableCell>
        <StyledTableCell align="center">
          <TextField
            label="Capacity"
            type="number"
            size="small"
            {...register("capacity")}
            error={errors.capacity?.message ? true : false}
            helperText={errors.capacity?.message}
          ></TextField>
        </StyledTableCell>
      </>
    );
  }
}
