import {
  Box,
  Divider,
  ListItem,
  TextField,
} from "@mui/material";
import { useState } from "react";
import ConfirmIcons from "./ConfirmIcons";
import UpdateIcons from "./UpdateIcons";
import { ITopic } from "../../../../../types/CourseSettings";

interface ITopicElementProps {
  name: string;
  id: number;
  renamedId: number;
  lastElement: boolean;
  topics: ITopic[];
  setRenameId: (index: number) => void;
  handleTopicChange: (index: number, name: string) => void;
  handleDeleteTopic: (id: number) => void;
}

export default function TopicElement({
  name,
  id,
  renamedId,
  lastElement,
  topics,
  setRenameId,
  handleTopicChange,
  handleDeleteTopic,
}: ITopicElementProps) {
  const [topicName, setTopicName] = useState(name);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const cancelHandler = () => {
    setTopicName(name);
    setErrorMsg(null);
    setRenameId(-1);
  };

  const validateChange = () => {
    let error = false;
    if (topicName === "") {
      setErrorMsg("Empty Input!");
      error = true;
    } else {
      topics.forEach((topic) => {
        if (topic.name == topicName) {
          if (topic.id != id) {
            setErrorMsg("Topic Name Already Exists!");
            error = true;
          } else {
            setRenameId(-1);
          }
        }
      });
    }
    if (!error) {
      handleTopicChange(id, topicName);
      setErrorMsg(null);
    }
  };

  return (
    <Box sx={{px: 2}}>
      <ListItem
        sx={{ px: 2, py: 2 }}
        
        secondaryAction={
          id == renamedId ? (
            <ConfirmIcons
              cancelHandler={cancelHandler}
              confirmChange={validateChange}
            ></ConfirmIcons>
          ) : (
            <UpdateIcons
              id={id}
              renamedId={renamedId}
              handleRename={setRenameId}
              handleDelete={handleDeleteTopic}
            ></UpdateIcons>
          )
        }
      >
        {renamedId == id ? (
          <TextField
            required
            onChange={(event) => setTopicName(event.target.value)}
            placeholder="Enter new topic name"
            value={topicName}
            InputProps={{ sx: { height: "32px" } }}
            sx={{
              bgcolor: "#F5F5F5",
              borderColor: "#D9D9D9",
              width: "35%",
              "& .MuiFormLabel-root": {
                fontSize: "14px",
                fontWeight: "medium",
              },
            }}
            error={errorMsg ? true : false}
            helperText={errorMsg}
          />
        ) : (
          <Box
            sx={{
              color: "Black",
              fontSize: 18,
              fontWeight: "medium",
            }}
          >
            {name}
          </Box>
        )}
      </ListItem>
      {!lastElement && <Divider sx={{ color: "#D9D9D9" }}></Divider>}
    </Box>
  );
}
