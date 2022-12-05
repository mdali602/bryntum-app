import React, { useRef } from "react";
import { BryntumScheduler } from "@bryntum/schedulerpro-react";
import { useDailyAgenda } from "./useAgenda";

const App = () => {
  // const scheduler = useRef<BryntumScheduler>(null)
  const { scheduler, schedulerConfig, associateTree, events } =
    useDailyAgenda();
  /* return (
    <BryntumScheduler
      readOnly={true}
      ref={scheduler as any}
      events={events}
      resources={associateTree}
      {...schedulerConfig}
      // other props, event handlers, etc
    />
  ); */
  return (
    <BryntumScheduler
      readOnly={false}
      ref={scheduler as any}
      // filters={filters}
      emptyText={schedulerConfig.emptyText}
      // updateEvents={updateAgendaEvents}
      // updateResources={updateAgendaResources}
      barMargin={schedulerConfig.barMargin}
      // cellMenuFeature={cellMenu}
      columnAutoWidth={schedulerConfig.columnAutoWidth}
      columnLines={schedulerConfig.columnLines}
      columns={schedulerConfig.horizontalColumns}
      createEventOnDblClick={schedulerConfig.createEventOnDblClick}
      enableEventAnimations={false}
      useInitialAnimation={false}
      defaultResourceImageName={schedulerConfig.defaultResourceImageName}
      enableDeleteKey={schedulerConfig.enableDeleteKey}
      eventBodyTemplate={schedulerConfig.eventBodyTemplate}
      eventColor={schedulerConfig.eventColor}
      eventDragFeature={schedulerConfig.features.eventDrag}
      eventDragCreateFeature={schedulerConfig.features.eventDragCreate}
      eventEditFeature={schedulerConfig.features.eventEdit}
      eventLayout={schedulerConfig.eventLayout}
      eventRenderer={schedulerConfig.eventRenderer}
      // eventMenuFeature={eventMenu}
      events={events}
      eventStyle={schedulerConfig.eventStyle}
      eventTooltipFeature={schedulerConfig.eventTooltip}
      // filterBarFeature={isPortrait}
      headerMenuFeature={schedulerConfig.features.headerMenu}
      // listeners={listeners}
      minHeight={'614px '}
      mode={"horizontal"}
      multiEventSelect={schedulerConfig.multiEventSelect}
      regionResizeFeature={schedulerConfig.features.regionResize}
      resourceImageExtension={schedulerConfig.resourceImageExtension}
      resources={associateTree}
      // resourceTimeRanges={timeOff}
      resourceTimeRangesFeature={schedulerConfig.features.timeRanges}
      // rowHeight={isMobile && isLandscape ? 24 : 48}
      // scheduleMenuFeature={scheduleMenu}
      scheduleTooltipFeature={schedulerConfig.features.scheduleTooltip}
      scrollLeft={schedulerConfig.scrollLeft}
      snapToIncrement={schedulerConfig.snapToIncrement}
      startDate={schedulerConfig.startDate}
      stripeFeature={schedulerConfig.stripeFeature}
      timeAxisHeaderMenuFeature={
        schedulerConfig.horizontalFeatures.timeAxisHeaderMenu
      }
      timeRangesFeature={schedulerConfig.features.timeRanges}
      treeFeature={schedulerConfig.features.tree}
      viewPreset={schedulerConfig.viewPreset}
      zoomOnMouseWheel={schedulerConfig.zoomOnMouseWheel}
      zoomOnTimeAxisDoubleClick={schedulerConfig.zoomOnTimeAxisDoubleClick}
    />
  );
};

export default App;
