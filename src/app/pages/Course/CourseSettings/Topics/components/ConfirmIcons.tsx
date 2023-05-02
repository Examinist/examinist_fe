import { IconButton } from "@mui/material";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearIcon from '@mui/icons-material/Clear';

interface IConfirmIcons {
    isSubmit?: boolean;
    cancelHandler: () => void;
    confirmChange: () => void;
}

export default function ConfirmIcons({cancelHandler, confirmChange, isSubmit=false}:IConfirmIcons){
    return(
        <>
            <IconButton
                onClick={cancelHandler}
            >
                <ClearIcon 
                sx={{
                    color: "#f44336",
                }}
                />
            </IconButton>
            <IconButton
                onClick={confirmChange}
                type={isSubmit ? "submit" : "button"}
            >
                <CheckOutlinedIcon 
                color="primary"/>
            </IconButton>
        </>
    );
}