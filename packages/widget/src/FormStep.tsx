import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    title: string;
}>

export default function FormStep({ title, children } : Props) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>{ title }</Typography>
      </AccordionSummary>
      <AccordionDetails>
        { children }
      </AccordionDetails>
    </Accordion>
  );
}
