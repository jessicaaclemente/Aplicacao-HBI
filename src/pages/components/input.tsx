import TextField from '@mui/material/TextField';
import InputMask from 'react-input-mask';

interface InputProps {
  label: string;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  focused?: boolean;
  type?: string;
  value?: string;
  mask?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomInput({
  label,
  color = 'primary',
  focused = false,
  type = 'text',
  value,
  onChange,
  mask,
}: InputProps) {
  if (mask) {
    return (
      <InputMask mask={mask} value={value} onChange={onChange}>
        {(inputProps: any) => (
          <TextField
            label={label}
            color={color}
            focused={focused}
            type={type}
            fullWidth
            {...inputProps}
          />
        )}
      </InputMask>
    );
  }

  return (
    <TextField
      label={label}
      color={color}
      focused={focused}
      type={type}
      value={value}
      onChange={onChange}
      fullWidth
    />
  );
}
