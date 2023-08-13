import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";

export const ClearButton: React.FC<ButtonProps> = ({ sx, ...props }) => {
  return (
    <Button variant="contained" sx={sx} {...props}>
      Clear
    </Button>
  );
};
