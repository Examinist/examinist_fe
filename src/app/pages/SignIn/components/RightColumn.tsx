import { Box } from '@mui/material';
import React from 'react'
import OnlineExamsImage from '../../../../assets/images/OnlineExamsImage';
import theme from '../../../../assets/theme';

export default function RightColumn() {
  return (
    <Box
      sx={{
        backgroundColor: "#1B84BF",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          rowGap: "1rem",
        }}
      >
        <OnlineExamsImage />
        <Box
          sx={{
            color: theme.palette.white.main,
            fontSize: "4rem",
            fontWeight: "bold",
          }}
        >
          Examinist
        </Box>
        <Box
          sx={{
            color: theme.palette.white.main,
            fontSize: "2.5rem",
          }}
        >
          Examination made easy
        </Box>
      </Box>
    </Box>
  );
}


