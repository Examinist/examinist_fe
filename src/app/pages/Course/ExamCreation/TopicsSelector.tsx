import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Checkbox, ListItemText } from "@mui/material";
import { AutomaticExamContext } from "./AutomaticExam";
import { useContext } from "react";
import { IQuestionType, ITopic } from "../../../types/CourseSettings";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function TopicsSelector({
  list,
  type,
  setDisabled,
  typeList,
}: {
  list: ITopic[];
  type: IQuestionType;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  typeList: number;
}) {
  const { automaticExamState, setAutomaticExamState } =
    useContext(AutomaticExamContext);

  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;
    if(value.length===0){
      console.log("remove");
      automaticExamState.topics?.delete(type.id);
      setAutomaticExamState({
        ...automaticExamState,
        topics: automaticExamState.topics,
      })
    }
    else{
    automaticExamState.topics?.set(
      type.id,
      value as number[]
    );
    setAutomaticExamState({
      ...automaticExamState,
      topics: automaticExamState.topics,
    })
  }

  if (automaticExamState.topics!.size < typeList) {
    setDisabled(true);
  } else {
    setDisabled(automaticExamState.title?.trim()=="" || automaticExamState.duration==null);
  }
  
  };


   const getlabel=(val: number) =>{
    const topic = list.find((topic) => topic.id === val);
    if (topic) {
      return topic.name;
      }
    return "";
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: "60%" }}>
        <InputLabel id="demo-multiple-chip-label">Select</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={automaticExamState.topics?.get(type.id)??[]}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Select" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={getlabel(value)} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {list.map((topic) => (
            <MenuItem key={topic.id} value={topic.id}>
              
              <Checkbox
               key={topic.id}
                checked={automaticExamState.topics
                  ?.get(type.id)
                  ?.includes(topic.id)??false}
              />
              <ListItemText primary={topic.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
