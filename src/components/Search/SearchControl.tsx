import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { memo } from "react";
import { SearchOption } from "./SearchDialog";

interface SearchControlProps {
  query: SearchOption["query"];
  changeSearchOption: (
    field: keyof SearchOption,
    value: SearchOption[typeof field]
  ) => void;
}

const SearchControl = ({ query, changeSearchOption }: SearchControlProps) => {
  return (
    <FormControl>
      <FormLabel>검색어</FormLabel>
      <Input
        placeholder="과목명 또는 과목코드"
        value={query}
        onChange={(e) => changeSearchOption("query", e.target.value)}
      />
    </FormControl>
  );
};

SearchControl.displayName = "SearchControl";

export default memo(SearchControl);
