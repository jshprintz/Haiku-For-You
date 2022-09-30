
import _ from "lodash";
import React from "react";
import { Accordion } from "semantic-ui-react";

const panels = _.times(3, (i) => ({
  key: `panel-${i}`,
  title: "here is a title",
  content: "Here is a paragraph"
}));

const MoreMenu = () => (
  <Accordion
    defaultActiveIndex={[0, 2]}
    panels={panels}
    exclusive={false}
    fluid
  />
);

export default MoreMenu;
