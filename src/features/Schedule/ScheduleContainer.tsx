import { Button, ButtonGroup, Flex, Heading, Stack } from "@chakra-ui/react";

import { Dispatch, memo, SetStateAction } from "react";
import { useAutoCallback } from "../../hooks/useAutoCallback.tsx";
import { useScheduleActions } from "../../ScheduleContext.tsx";
import ScheduleTable from "../../ScheduleTable.tsx";
import { Schedule } from "../../types.ts";
import ScheduleDndProvider from "../../ScheduleDndProvider.tsx";

interface ScheduleItemProps {
  index: number;
  tableId: string;
  schedules: Schedule[];
  disabledRemoveButton: boolean;
  setSearchInfo: Dispatch<
    SetStateAction<{
      tableId: string;
      day?: string;
      time?: number;
    } | null>
  >;
}

const ScheduleContainer = memo(
  ({
    index,
    tableId,
    schedules,
    disabledRemoveButton,
    setSearchInfo,
  }: ScheduleItemProps) => {
    const { setSchedulesMap } = useScheduleActions();

    const duplicate = useAutoCallback(() => {
      setSchedulesMap((prev) => ({
        ...prev,
        [`schedule-${Date.now()}`]: [...prev[tableId]],
      }));
    });

    const remove = useAutoCallback(() => {
      setSchedulesMap((prev) => {
        delete prev[tableId];
        return { ...prev };
      });
    });

    const handleSearchClick = useAutoCallback(() => {
      setSearchInfo({ tableId });
    });

    const handleScheduleTimeClick = useAutoCallback((timeInfo) => {
      setSearchInfo({ tableId, ...timeInfo });
    });

    return (
      <ScheduleDndProvider draggedTableId={tableId}>
        <Stack key={tableId} width="600px">
          <Flex justifyContent="space-between" alignItems="center">
            <Heading as="h3" fontSize="lg">
              시간표 {index + 1}
            </Heading>
            <ButtonGroup size="sm" isAttached>
              <Button colorScheme="green" onClick={handleSearchClick}>
                시간표 추가
              </Button>
              <Button colorScheme="green" mx="1px" onClick={duplicate}>
                복제
              </Button>
              <Button
                colorScheme="green"
                isDisabled={disabledRemoveButton}
                onClick={remove}
              >
                삭제
              </Button>
            </ButtonGroup>
          </Flex>

          <ScheduleTable
            key={`schedule-table-${index}`}
            schedules={schedules}
            tableId={tableId}
            onScheduleTimeClick={handleScheduleTimeClick}
          />
        </Stack>
      </ScheduleDndProvider>
    );
  }
);

ScheduleContainer.displayName = "ScheduleContainer";

export default ScheduleContainer;
