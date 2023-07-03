import { Box, Stack } from "@mui/system";
import React from "react";
import theme from "../../../../../../assets/theme";
import Countdown from "react-countdown";
import HoursMinutesClock from "./HoursMinutesClock";

interface CustomCountDownProps {
  toDate: Date;
  onComplete: () => void;
}

export default function HoursMinutesCountDown({
  toDate,
  onComplete,
}: CustomCountDownProps) {
  const renderer = ({
    hours,
    minutes,
    completed,
  }: {
    hours: number;
    minutes: number;
    completed: any;
  }) => {
    if (completed) {
      onComplete();
    }
    return <HoursMinutesClock hours={hours} minutes={minutes} />;
  };
  return <Countdown date={toDate} renderer={renderer} />;
}
