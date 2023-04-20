import * as React from "react";
import Typography from "@mui/material/Typography";
import theme from "../../../../assets/theme";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import QuestionHeader from "./QuestionHeader";
import QuestionBody from "./QuestionBody";

export default function QuestionAccordion() {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        elevation={0}
        sx={{ mr: 3 }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1d-content"
          id="panel1d-header"
          sx={{
            backgroundColor: theme.palette.background.paper,
            position: "initial",
            flexDirection: "row-reverse",
            "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
              transform: "rotate(180deg)",
            },
            "& .MuiAccordionSummary-content": {
              marginLeft: theme.spacing(1),
            },
          }}
        >
          <QuestionHeader />
        </AccordionSummary>
        <AccordionDetails
          sx={{ mr: 3, backgroundColor: theme.palette.background.paper }}
        >
         <QuestionBody/>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
