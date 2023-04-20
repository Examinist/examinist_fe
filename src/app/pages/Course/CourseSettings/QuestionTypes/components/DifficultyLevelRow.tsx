import { TableCell, TableRow, TextField } from '@mui/material';
import React from 'react'
import { useFormContext } from 'react-hook-form';


interface IDifficultyLevelRow{
    level: "Easy" | "Medium" | "Hard",
    weight?: number,
    edited: boolean;
}

export default function DifficultyLevelRow({level, weight, edited}: IDifficultyLevelRow) {
  const methods = useFormContext();

  const renderRow = () => {
    if(edited){
       const {
         register,
         formState: { errors },
       } = methods;
       return (
         <TextField
           variant="outlined"
           sx={{ width: 100 }}
           size="small"
           type="number"
           {...register(level.toLowerCase())}
           error={errors[level.toLowerCase()]?.message ? true : false}
         />
       );
    }

    return weight;
  }
 
  return (
    <TableRow
      key={level}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {level}
      </TableCell>
      <TableCell align="left" sx={{ ml: 10 }}>
        {renderRow()}
      </TableCell>
    </TableRow>
  );
}
