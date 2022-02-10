import React from "react";
import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";

function Tooltip() {
  return (
    <Tooltips placement="right" ref={buttonRef}>
      <TooltipContents>Tooltip right</TooltipContents>
    </Tooltips>
  );
}

export default Tooltip;
