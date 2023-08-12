import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ButtonGroup from "@mui/material/ButtonGroup";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { intervalToDuration, format } from "date-fns";
import { ja } from "date-fns/locale";
import { useState } from "react";

const UPDATE_SPAN = 1;
const DAIRY_PRICE = 300;

const App = () => {
  const [beginningTime, setBeginningTime] = useState("00:00:00"); // 駐車開始時刻
  const [time, setTime] = useState<number[]>([]); // 経過時間
  const [price, setPrice] = useState<number>(0);
  const [pastTime, setPastTime] = useState<string>("");

  setInterval(
    () => {
      if (localStorage.getItem("beginningTime")) {
        // 経過時間の計算
        const beginningTime = new Date(localStorage.getItem("beginningTime")!);
        const duration = intervalToDuration({
          start: beginningTime,
          end: new Date(),
        });
        const { years, months, days, hours, minutes, seconds } = duration;
        setTime([years!, months!, days!, hours!, minutes!, seconds!]);

        // 金額の計算
        calcPrice();

        // 金額上昇までの時間の計算
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

        setPastTime(`${m}分 ${s}秒`);
      }
    },
    1000 //1秒ごとに実行
  );

  const calcPrice = () => {
    const tmpH = time[2] * 24 + time[3];
    const tmpM = tmpH * 60 + time[4];
    const price = (tmpM / UPDATE_SPAN + 1) * DAIRY_PRICE;
    setPrice(price);
  };

  const handleClickBeginButton = () => {
    const formattedDate = format(new Date(), "yyyy-MM-dd HH:mm:ss", {
      locale: ja,
    });
    localStorage.setItem("beginningTime", formattedDate);
    setBeginningTime(formattedDate);
  };

  return (
    <Stack justifyContent="space-evenly" sx={{ height: 100 + "vh" }}>
      <Button
        variant="contained"
        sx={{ borderRadius: 99, background: "lime", color: "black" }}
        onClick={handleClickBeginButton}
      >
        開始する
      </Button>

      <Paper sx={{ m: 2 }}>
        <Typography variant="h6">現在</Typography>
        <Typography>¥{price.toLocaleString()}</Typography>

        <Typography variant="h6">次の料金アップまであと</Typography>
        <Typography>{pastTime}</Typography>

        <Typography>駐車開始時刻 {beginningTime}</Typography>
        <Typography>
          経過時間
          {time && `${time[2]}日 ${time[3]}時間 ${time[4]}分 ${time[5]}秒`}
        </Typography>
      </Paper>

      <ButtonGroup variant="contained" aria-label="">
        <Button onClick={calcPrice}>Stop</Button>
        <Button
          onClick={() => {
            localStorage.removeItem("beginningTime");
          }}
        >
          Reset
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

export default App;
