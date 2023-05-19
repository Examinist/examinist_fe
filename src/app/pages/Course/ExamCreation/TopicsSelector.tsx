import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Checkbox, ListItemText } from '@mui/material';
import { IQuestionType, ITopic } from '../../../types/CourseSettings';
import { AutomaticExamContext } from './AutomaticExam';
import { useContext } from 'react';

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



export default function TopicsSelector({list,type}:{list: ITopic[],type:IQuestionType}) {
  const theme = useTheme();
  const [typeTopics, setTypeTopics  ] = React.useState<string[]>([]);
  const { automaticExamState, setAutomaticExamState } =
  useContext(AutomaticExamContext);

  const handleChange = (event: SelectChangeEvent<typeof typeTopics>) => {
    const {
      target: { value },
    } = event;
    setTypeTopics(
      typeof value === 'string' ? value.split(',') : value,
    );

  };

  // const handleAddTopic=()=>{
  //   const getList = () => {
  //     var stateTopics =automaticExamState.topics;
      
  //     if (stateTopics?.has(type.name)) {
  //       const topics = stateTopics.get(
  //         type.name
  //       );
  //       if (topics) {
  //         topics.push(...typeTopics);
  //         return topics;
  //       }
  //     }else
      
  //   };
  // }
  
  return (
    <div>
      <FormControl sx={{ m: 1, width: '60%' }}>
        <InputLabel id="demo-multiple-chip-label">Select</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={typeTopics}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Select" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
           {list.map((topic) => (
            <MenuItem key={topic.id} value={topic.name}>
              <Checkbox checked={typeTopics.indexOf(topic.name) > -1} />
              <ListItemText primary={topic.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
