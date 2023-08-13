import Button from "@mui/material/Button";
import { SxProps } from "@mui/material/styles";

type StartButtonProps = {
  handleClick: () => void;
  sx?: SxProps;
};

export const StartButton: React.FC<StartButtonProps> = ({
  handleClick,
  sx,
}) => {
  return (
    <Button
      variant="contained"
      sx={{
        borderRadius: 99,
        width: "10rem",
        height: "10rem",
        background: "lime",
        color: "black",
        fontSize: "1.5rem",
        ...sx,
      }}
      onClick={handleClick}
    >
      開始する
    </Button>
  );
};
