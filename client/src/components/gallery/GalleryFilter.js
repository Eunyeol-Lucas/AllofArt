import styled from "styled-components";
import { useImgDispatch } from "../../../store/reducer";
import { InputLabel } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { useState } from "react";

export default function GalleryFilter() {
  const dispatch = useImgDispatch();
  const [sort, setSort] = useState("date");
  const [duration, setDuration] = useState("day");

  return (
    <Wrapper>
      <FormControl
        sx={{ height: { xs: 233, md: 167 }, width: { xs: 350, md: 250 } }}
      >
        <InputLabel id="demo-simple-select-helper-label">정렬 기준</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={sort}
          label="정렬 기준"
          onChange={(e) => {
            setSort(e.target.value);
            dispatch({ type: "SORT_BY", payload: e.target.value });
          }}
        >
          <MenuItem value={"download"}>다운로드 순</MenuItem>
          <MenuItem value={"date"}>시간순</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 2000 }} disabled={sort == "date"}>
        <InputLabel id="demo-simple-select-label">기간</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={duration}
          label="기간"
          onChange={(e) => {
            setDuration(e.target.value);
            dispatch({ type: "DURATION", payload: e.target.value });
          }}
        >
          <MenuItem value={"all"}>모든 기간</MenuItem>
          <MenuItem value={"month"}>월간</MenuItem>
          <MenuItem value={"week"}>주간</MenuItem>
          <MenuItem value={"day"}>일간</MenuItem>
        </Select>
      </FormControl>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 10vh;
  padding: 0 10vw;
  text-align: left;
`;
