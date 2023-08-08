import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ButtonGroup from "@mui/material/ButtonGroup";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const App = () => {
  return (
    <Stack justifyContent="space-evenly" sx={{ height: 100 + "vh" }}>
      <Button
        variant="contained"
        sx={{ borderRadius: 99, background: "lime", color: "black" }}
      >
        開始する
      </Button>

      <Paper sx={{ m: 2 }}>
        <Typography variant="h6">現在</Typography>
        <Typography>¥300</Typography>

        <Typography variant="h6">次の料金アップまであと</Typography>
        <Typography>00分00秒</Typography>

        <Typography>駐車開始時刻 00:00:00</Typography>
        <Typography>経過時間 00:00:00</Typography>
      </Paper>

      <ButtonGroup variant="contained" aria-label="">
        <Button>Stop</Button>
        <Button>Reset</Button>
      </ButtonGroup>
    </Stack>
  );
};

export default App;
