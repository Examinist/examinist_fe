import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface IUpdateIcons {
    id: number;
    renamedId: number;
    handleRename: (index: number) => void;
    handleDelete: (id: number) => void;
}

export default function updateIcons({ id, renamedId, handleRename, handleDelete }: IUpdateIcons) {
    return (
        <>
            <IconButton
                onClick={() => handleDelete(id)}
                disabled={renamedId != -1 && renamedId != id}
            >
                <DeleteOutlineIcon />
            </IconButton>
            <IconButton
                onClick={() => handleRename(id)}
                disabled={renamedId != -1 && renamedId != id}
            >
                <EditIcon />
            </IconButton>
        </>
    );
}