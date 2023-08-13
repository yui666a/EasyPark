import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { intervalToDuration, format } from "date-fns";
import { ja } from "date-fns/locale";
import { useCallback, useEffect, useState } from "react";
import { Duration } from "date-fns";
import { StartButton } from "./StartButton";
import { ClearButton } from "./ClearButton";

const UPDATE_SPAN = 30;
const DAIRY_PRICE = 150;
const MAX_DAIRY_PRICE = 700;
// const MIDNIGHT_PRICE = 150;
const MAX_MIDNIGHT_PRICE = 500;
const MIDNIGHT_START = 16;
const MIDNIGHT_END = 8;

const initLocalStorageTime = localStorage.getItem("beginningTime")
  ? format(
      new Date(localStorage.getItem("beginningTime")!),
      "yyyy-MM-dd HH:mm:ss",
      {
        locale: ja,
      }
    )
  : "";

const App = () => {
  const [beginningTime, setBeginningTime] = useState<string>(
    initLocalStorageTime || ""
  ); // 駐車開始時刻
  const [duration, setDuration] = useState<Duration | null>(null); // 経過時間
  const [price, setPrice] = useState<number>(0);
  const [pastTime, setPastTime] = useState<string>("");
  const isParking = !!localStorage.getItem("beginningTime");

  useEffect(() => {
    const interval = setInterval(
      () => {
        if (isParking) {
          // 経過時間の計算
          const duration = calcElapsedTime();
          setDuration(duration);

          // 金額の計算
          const price = calcPrice(duration);
          setPrice(price);

          // 金額上昇までの時間の計算
          const { m, s } = calcTimeUntilIncrease(duration);
          setPastTime(`${m}分 ${s}秒`);
        }
      },
      1000 //1秒ごとに実行
    );
    return () => clearInterval(interval);
  });

  // const handleClickBeginButton = useCallback(() => {
  //   const formattedDate = format(new Date(), "yyyy-MM-dd HH:mm:ss", {
  //     locale: ja,
  //   });
  //   localStorage.setItem("beginningTime", formattedDate);
  //   setBeginningTime(formattedDate);
  // }, []);

  const handleClickBeginButton = () => {
    const formattedDate = format(new Date(), "yyyy-MM-dd HH:mm:ss", {
      locale: ja,
    });
    localStorage.setItem("beginningTime", formattedDate);
    setBeginningTime(formattedDate);
  };

  const handleClickClearButton = useCallback(() => {
    localStorage.removeItem("beginningTime");
    setBeginningTime("00:00:00");
    setDuration(null);
    setPrice(0);
    setPastTime("");
  }, []);

  return (
    <Stack
      justifyContent="space-evenly"
      alignItems="center"
      sx={{ height: 100 + "vh" }}
    >
      <StartButton onClick={handleClickBeginButton} disabled={isParking} />

      <Paper sx={{ m: 2, p: 1 }}>
        <Typography variant="h6">現在</Typography>
        <Typography>¥{price.toLocaleString()}</Typography>

        <Typography variant="h6">次の料金アップまであと</Typography>
        <Typography>{pastTime}</Typography>

        <Typography>駐車開始時刻 {beginningTime}</Typography>
        <Typography>
          経過時間
          {duration !== null &&
            `${duration.days}日 ${duration.hours}時間 ${duration.minutes}分 ${duration.seconds}秒`}
        </Typography>
      </Paper>

      <ClearButton onClick={handleClickClearButton} disabled={!isParking} />
    </Stack>
  );
};

export default App;

/**
 * 経過時間を計算
 * @returns Duration
 * @returns { years: number, months: number, days: number, hours: number, minutes: number, seconds: number }
 */
const calcElapsedTime = (): Duration => {
  const beginningTime = new Date(localStorage.getItem("beginningTime")!);
  const duration = intervalToDuration({
    start: beginningTime,
    end: new Date(),
  });
  return duration;
};

/**
 * 現在の料金を計算
 * @param duration: Duration
 * @returns number
 * TODO: 未完成。条件に合わせて計算してください
 */
const calcPrice = (duration: Duration): number => {
  const { days, hours, minutes } = duration;
  const totalMinutes = hours! * 60 + minutes!;
  // `~~()`はMath.floorと同じ。小数点以下を切り捨てする。
  let price = (~~(totalMinutes / UPDATE_SPAN) + 1) * DAIRY_PRICE;

  // 深夜料金の計算
  const beginningTime = new Date(localStorage.getItem("beginningTime")!);
  const maxPrice =
    beginningTime.getHours() >= MIDNIGHT_END &&
    beginningTime.getHours() < MIDNIGHT_START
      ? MAX_DAIRY_PRICE
      : MAX_MIDNIGHT_PRICE;

  // 最大料金を超えた場合、最大料金を設定
  if (price >= maxPrice) {
    price = maxPrice;
  }

  // 24時間以上経過した場合、最大料金を繰り返し加算
  price += days! * MAX_DAIRY_PRICE;
  return price;
};

/**
 * 金額上昇までの残り時間を計算
 * @param duration: Duration
 * @returns { m: number, s: number}
 */
const calcTimeUntilIncrease = (duration: Duration) => {
  const { minutes, seconds } = duration;
  let m, s;
  s = 60 - seconds!;
  if (s === 60) {
    s = 0;
    m = UPDATE_SPAN - minutes!;
  } else {
    m = UPDATE_SPAN - minutes! - 1;
  }
  while (m < 0) {
    m += UPDATE_SPAN;
  }
  return { m, s };
};
