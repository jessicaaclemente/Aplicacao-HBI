import Button from "@mui/material/Button";

interface CustomButtonProps {
  label: string;
  onClick: () => void;
  variant?: "text" | "contained" | "outlined";
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
}

export default function CustomButton({ label, onClick, variant = "contained", color = "primary" }: CustomButtonProps) {
  return (
    <Button variant={variant} style={{ backgroundColor: '#000A65' }} onClick={onClick}>
      {label}
    </Button>
  );
}
