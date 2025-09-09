import {
  Button,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  Text,
} from "@chakra-ui/react";

import { useScheduleActions } from "../../ScheduleContext";

interface Props {
  tableId: string;
  day: string;
  time: number;
}

const PopoverContentBody = ({ tableId, day, time }: Props) => {
  const { onDeleteScheduleButtonClick } = useScheduleActions();

  return (
    <PopoverContent onClick={(event) => event.stopPropagation()}>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverBody>
        <Text>강의를 삭제하시겠습니까?</Text>
        <Button
          colorScheme="red"
          size="xs"
          onClick={() => onDeleteScheduleButtonClick(tableId, day, time)}
        >
          삭제
        </Button>
      </PopoverBody>
    </PopoverContent>
  );
};

export default PopoverContentBody;
