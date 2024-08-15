import { FC, ChangeEvent } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

interface Props {
  value?: boolean;
  defaultValue?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
}
export const RadioButton: FC<Props> = ({
  value,
  defaultValue,
  onChange,
  name,
}) => {
  //   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //     setValue((event.target as HTMLInputElement).value);
  //   };

  return (
    <FormControl>
      <FormLabel>Статус пользователя</FormLabel>
      <RadioGroup
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        name={name}
      >
        <FormControlLabel
          sx={{
            "& .MuiTypography-root": {
              fontSize: 12,
            },
          }}
          value={true}
          control={
            <Radio
              size="small"
              sx={{
                color: "#266bf1",
              }}
            />
          }
          label="Действующий"
        />
        <FormControlLabel
          sx={{
            "& .MuiTypography-root": {
              fontSize: 12,
            },
          }}
          value={false}
          control={
            <Radio
              size="small"
              sx={{
                color: "#266bf1",
              }}
            />
          }
          label="Закрытый"
        />
      </RadioGroup>
    </FormControl>
  );
};
