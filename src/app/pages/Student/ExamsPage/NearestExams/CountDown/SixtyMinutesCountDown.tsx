import { Box, Stack } from "@mui/system";
import React from "react";
import theme from "../../../../../../assets/theme";
import Countdown from "react-countdown";
import SixtyMinutesClock from "./SixtyMinutesClock";

interface CustomCountDownProps {
  toDate: Date;
  onComplete: () => void;
}

export default function SixtyMinutesCustomCountDown({
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
    return <SixtyMinutesClock minutes={minutes} seconds={seconds} />;
  };
  return <Countdown date={toDate} renderer={renderer} />;
}
