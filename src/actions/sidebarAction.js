import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from "./types";

export const openSidebarAction = () => {
  return {
    type: OPEN_SIDEBAR
  };
};

export const closeSidebarAction = () => {
  return {
    type: CLOSE_SIDEBAR
  };
};
