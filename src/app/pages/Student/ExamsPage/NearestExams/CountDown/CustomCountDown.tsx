import { Box, Stack } from "@mui/system";
import React from "react";
import theme from "../../../../../../assets/theme";
import Countdown from "react-countdown";
import Clock from "./Clock";

interface CustomCountDownProps {
  toDate: Date;
  onComplete: () => void;
}

export default function CustomCountDown({
  toDate,
  onComplete,
}: CustomCountDownProps) {
  const renderer = ({
    minutes,
    seconds,
    completed,
  }: {
    minutes: number;
    seconds: number;
    completed: any;
  }) => {
    if (completed) {
      onComplete();
    }
    return <Clock minutes={minutes} seconds={seconds} />;
  };
  return <Countdown date={toDate} renderer={renderer} />;
}
