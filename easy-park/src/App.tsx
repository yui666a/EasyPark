import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { intervalToDuration, format } from "date-fns";
import { ja } from "date-fns/locale";
import { useState } from "react";

const UPDATE_SPAN = 2;
const DAIRY_PRICE = 150;
const MAX_DAIRY_PRICE = 1000;
const MIDNIGHT_PRICE = 150;
const MAX_MIDNIGHT_PRICE = 700;

const initLocalStorageTime = localStorage.getItem("beginningTime")
  ? new Date(localStorage.getItem("beginningTime")!)
  : new Date();
const formattedDate = format(initLocalStorageTime, "yyyy-MM-dd HH:mm:ss", {
  locale: ja,
});

const calcElapsedTime = () => {
  const beginningTime = new Date(localStorage.getItem("beginningTime")!);
  const duration = intervalToDuration({
    start: beginningTime,
    end: new Date(),
  });
  return duration;
};

const calcPrice = (elapsedTime: number[]) => {
  const tmpH = elapsedTime[2] * 24 + elapsedTime[3];
  const tmpM = tmpH * 60 + elapsedTime[4];
  let price = (~~(tmpM / UPDATE_SPAN) + 1) * DAIRY_PRICE;

  if (price >= MAX_DAIRY_PRICE) {
    price = MAX_DAIRY_PRICE;
  }
  return price;
};

const calcTimeUntilIncrease = (elapsedTime: number[]) => {
  const minutes = elapsedTime[4],
    seconds = elapsedTime[5];
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

const App = () => {
  const [beginningTime, setBeginningTime] = useState<string>(
    formattedDate || "00:00:00"
  ); // 駐車開始時刻
  const [elapsedTime, setElapsedTime] = useState<number[]>([]); // 経過時間
  const [price, setPrice] = useState<number>(0);
  const [pastTime, setPastTime] = useState<string>("");

  setInterval(
    () => {
      if (localStorage.getItem("beginningTime")) {
        // 経過時間の計算
        const duration = calcElapsedTime();
        const { years, months, days, hours, minutes, seconds } = duration;
        const elapsedTime = [
          years!,
          months!,
          days!,
          hours!,
          minutes!,
          seconds!,
        ];
        setElapsedTime(elapsedTime);

        // 金額の計算
        const price = calcPrice(elapsedTime);
        setPrice(price);

        // 金額上昇までの時間の計算
        const { m, s } = calcTimeUntilIncrease(elapsedTime);
        setPastTime(`${m}分 ${s}秒`);
      }
    },
    1000 //1秒ごとに実行
  );

  const handleClickBeginButton = () => {
    const formattedDate = format(new Date(), "yyyy-MM-dd HH:mm:ss", {
      locale: ja,
    });
    localStorage.setItem("beginningTime", formattedDate);
    setBeginningTime(formattedDate);
  };

  const handleClickClearButton = () => {
    localStorage.removeItem("beginningTime");
    setBeginningTime("00:00:00");
    setElapsedTime([]);
    setPrice(0);
    setPastTime("");
  };

  return (
    <Stack
      justifyContent="space-evenly"
      alignItems="center"
      sx={{ height: 100 + "vh" }}
    >
      <Button
        variant="contained"
        sx={{
          borderRadius: 99,
          width: "10rem",
          height: "10rem",
          background: "lime",
          color: "black",
          fontSize: "1.5rem",
        }}
        onClick={handleClickBeginButton}
      >
        開始する
      </Button>

      <Paper sx={{ m: 2, p: 1 }}>
        <Typography variant="h6">現在</Typography>
        <Typography>¥{price.toLocaleString()}</Typography>

        <Typography variant="h6">次の料金アップまであと</Typography>
        <Typography>{pastTime}</Typography>

        <Typography>駐車開始時刻 {beginningTime}</Typography>
        <Typography>
          経過時間
          {elapsedTime &&
            `${elapsedTime[2]}日 ${elapsedTime[3]}時間 ${elapsedTime[4]}分 ${elapsedTime[5]}秒`}
        </Typography>
      </Paper>

      <Button variant="contained" onClick={handleClickClearButton}>
        Clear
      </Button>
    </Stack>
  );
};

export default App;
