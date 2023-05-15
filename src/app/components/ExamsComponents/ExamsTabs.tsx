import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

interface IExamTabProp{
    tabs: string[],
}

export default function ExamsTabs({tabs}:IExamTabProp){
    const [currTab, selectTab] = useState(0);

    return(
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={currTab}>
            {tabs.map((value, index) => (
              <Tab
                label={value} />
            ))}
          </Tabs>
        </Box>
    );
}