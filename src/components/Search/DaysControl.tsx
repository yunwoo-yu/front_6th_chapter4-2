import { memo } from "react";
import { DAY_LABELS } from "../../constants";
import { SearchOption } from "./SearchDialog";
import {
  FormControl,
  FormLabel,
  CheckboxGroup,
  HStack,
  Checkbox,
} from "@chakra-ui/react";

interface DaysControlProps {
  days: SearchOption["days"];
  changeSearchOption: (
    field: keyof SearchOption,
    value: SearchOption[typeof field]
  ) => void;
}

const DaysControl = ({ days, changeSearchOption }: DaysControlProps) => {
  return (
    <FormControl>
      <FormLabel>요일</FormLabel>
      <CheckboxGroup
        value={days}
        onChange={(value) => changeSearchOption("days", value as string[])}
      >
        <HStack spacing={4}>
          {DAY_LABELS.map((day) => (
            <Checkbox key={day} value={day}>
              {day}
            </Checkbox>
          ))}
        </HStack>
      </CheckboxGroup>
    </FormControl>
  );
};

DaysControl.displayName = "DaysControl";

export default memo(DaysControl);
