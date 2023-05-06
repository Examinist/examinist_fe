import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Divider } from "@mui/material";
import { QuestionBankContext } from "./QuestionBank";
import { useParams } from "react-router-dom";
import { deleteQuestionApi } from "../../../services/APIs/Questions";
import { IErrorResponse } from "../../../services/Response";
import useAlert from "../../../hooks/useAlert";

export default function QuestionModifications({questionId}: {questionId: number}) {
  const {courseId} = useParams<{courseId: string}>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const {reloadQuestions} = React.useContext(QuestionBankContext);
  const {setAlertState} = useAlert();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };
  const handleClose = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(null);
    event.stopPropagation();
  };

  const handleDelete = (event: any) => {
    deleteQuestionApi(courseId, questionId)
      .then(() => {
        reloadQuestions();
        setAlertState({
          open: true,
          message: "Question deleted successfully",
          severity: "success",
        });
      })
      .catch(({ response: { statusText, data } }: IErrorResponse) => {
        setAlertState({
          open: true,
          message: data.message || statusText,
          severity: "error",
        });
      })
      .finally(() => {
       setAnchorEl(null);
       event.stopPropagation();
      });
  };

  

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          sx={{ minWidth: "150px" }}
          onClick={(event: any) => handleClose(event)}
        >
          Edit
        </MenuItem>
        <Divider />
        <MenuItem
          sx={{ minWidth: "150px" }}
          onClick={handleDelete}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
