import { useMemo, useRef } from "react";

import { BryntumScheduler } from "@bryntum/schedulerpro-react";
import { getSchedulerConfig } from "./schedulerConfig";
import { associates, associateTree, events } from "./schedulerData";
// import BryntumScheduler from '../../bryntumScheduler/BryntumScheduler'

export const useDailyAgenda = () => {
  const scheduler = useRef<BryntumScheduler>(null);
  const schedulerConfig = useMemo(() => {
    return getSchedulerConfig();
  }, []);

  return {
    scheduler,
    schedulerConfig,
    associates,
    associateTree,
    events,
  };
};
