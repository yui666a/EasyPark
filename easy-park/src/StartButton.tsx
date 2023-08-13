import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";

export const StartButton: React.FC<ButtonProps> = ({ sx, ...props }) => {
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
      {...props}
    >
      開始する
    </Button>
  );
};
