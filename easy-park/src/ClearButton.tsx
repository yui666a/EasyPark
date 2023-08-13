import Button from "@mui/material/Button";
import { SxProps } from "@mui/material/styles";

type StartButtonProps = {
  handleClick: () => void;
  sx?: SxProps;
};

export const ClearButton: React.FC<StartButtonProps> = ({
  handleClick,
  sx,
}) => {
  return (
    <Button variant="contained" onClick={handleClick} sx={sx}>
      Clear
    </Button>
  );
};
