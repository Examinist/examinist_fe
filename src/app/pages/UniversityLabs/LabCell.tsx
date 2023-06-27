import { Divider, IconButton, Menu, MenuItem, TextField } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import { StyledTableCell } from "./UniversityLabs";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ILab } from "../../types/Lab";

interface ILabCellProps {
    edit: boolean,
    lab: ILab,
}

export default function LabCell({ edit, lab }: ILabCellProps) {
    if (!edit) {
        return (
            <>
                <StyledTableCell align="center">
                    {lab.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                    {lab.capacity}
                </StyledTableCell></>
        );
    } else {
        return (
            <>
                <StyledTableCell align="center"><TextField size="small" value={lab.name}></TextField></StyledTableCell>
                <StyledTableCell align="center"><TextField size="small" value={lab.capacity}></TextField></StyledTableCell>
            </>
        );
    }
}