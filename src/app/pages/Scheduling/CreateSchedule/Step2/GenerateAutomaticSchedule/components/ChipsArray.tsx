import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import theme from "../../../../../../../assets/theme";
import { Box } from "@mui/material";

interface ChipData {
  key: number;
  label: string;
}

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

interface IChipsArrayProps {
  chips: ChipData[];
  name: string;
  label: string;
}

export default function ChipsArray() {
  const [chipData, setChipData] = React.useState<readonly ChipData[]>([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
  ]);

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "left",
        flexWrap: "wrap",
        listStyle: "none",
        p: 1,
        mb: 3,
        border: 1,
        borderColor: theme.palette.gray.main,
        shadow: 0,
        borderRadius: 4,
      }}
      component="ul"
    >
      {chipData.map((data) => {

        return (
          <ListItem key={data.key}>
            <Chip
              label={data.label}
              onDelete={data.label === "React" ? undefined : handleDelete(data)}
            />
          </ListItem>
        );
      })}
    </Box>
  );
}
