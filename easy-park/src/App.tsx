import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ButtonGroup from "@mui/material/ButtonGroup";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { intervalToDuration, format } from "date-fns";
import { ja } from "date-fns/locale";
import { useState } from "react";

const App = () => {
  const [beginningTime, setBeginningTime] = useState("00:00:00"); // 駐車開始時刻
  const [time, setTime] = useState("00:00:00"); // 経過時間

  setInterval(
    () => {
      if (localStorage.getItem("beginningTime")) {
        const beginningTime = new Date(localStorage.getItem("beginningTime")!);
        const duration = intervalToDuration({
          start: beginningTime,
          end: new Date(),
        });
        console.log(duration);
        const { days, hours, minutes, seconds } = duration;
        setTime(`${days}日 ${hours}時間${minutes}分${seconds}秒`);
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
        <Typography>¥300</Typography>

        <Typography variant="h6">次の料金アップまであと</Typography>
        <Typography>00分00秒</Typography>

        <Typography>駐車開始時刻 {beginningTime}</Typography>
        <Typography>経過時間 {time}</Typography>
      </Paper>

      <ButtonGroup variant="contained" aria-label="">
        <Button>Stop</Button>
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
