import { Flex } from "@chakra-ui/react";
import { memo, useMemo, useState } from "react";
import ScheduleContainer from "./components/Schedule/ScheduleContainer.tsx";
import SearchDialog from "./components/Search/SearchDialog.tsx";
import { useScheduleState } from "./ScheduleContext.tsx";

export const ScheduleTables = memo(() => {
  const schedulesMap = useScheduleState(); // 상태만 구독
  const [searchInfo, setSearchInfo] = useState<{
    tableId: string;
    day?: string;
    time?: number;
  } | null>(null);

  const disabledRemoveButton = useMemo(
    () => Object.keys(schedulesMap).length === 1,
    [schedulesMap]
  );

  return (
    <>
      <Flex w="full" gap={6} p={6} flexWrap="wrap">
        {Object.entries(schedulesMap).map(([tableId, schedules], index) => (
          <ScheduleContainer
            key={tableId}
            index={index}
            tableId={tableId}
            schedules={schedules}
            disabledRemoveButton={disabledRemoveButton}
            setSearchInfo={setSearchInfo}
          />
        ))}
      </Flex>
      {searchInfo && (
        <SearchDialog
          searchInfo={searchInfo}
          onClose={() => setSearchInfo(null)}
        />
      )}
    </>
  );
});
