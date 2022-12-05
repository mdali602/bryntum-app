import { BryntumSchedulerBaseProps, BryntumSchedulerProps } from "@bryntum/schedulerpro-react";
import breakIcon from "./icons/breakIcon.svg";
import defaultUserImage from "./icons/defaultUserImage.svg";
import exclamationPoint from "./icons/exclamationPoint.svg";
import phoneIcon from "./icons/phone_24px.svg";

export const mobileTickWidth = document.documentElement.clientWidth / 6;
export const desktopColumnWidth = 170;
export const horizontalTickSize =
  (document.documentElement.clientWidth - desktopColumnWidth) / 32;
export const verticalTickSize = 50;

export const getSchedulerConfig = () : BryntumSchedulerProps => {
  const date = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const dayOfWeek = daysOfWeek[date.getDay()];

  const getUserImage = (record: any) => {
    const photo =
      record.data.imageUrl && record.data.imageUrl !== ""
        ? record.data.imageUrl
        : defaultUserImage;
    return photo;
  };

  return {
    // Override default view
    viewPreset: {
      id: "initPreset",
      name: "Initial Preset",
      base: "hourAndDay",
      tickWidth: horizontalTickSize,
      timeResolution: {
        unit: "minute",
        increment: 15,
      },
      headers: false
        ? [
            {
              unit: "day",
              dateFormat: "DD.MM.YYYY",
            },
            {
              unit: "hour",
              // dateFormat: i18next.t('hourFormat'),
              dateFormat: "h A",

              // headerCellCls: i18next.language === 'gb' && "b-extra-padding"
            },
          ]
        : [
            {
              unit: "day",
              dateFormat: "DD.MM.YYYY",
            },
            {
              unit: "hour",
              // dateFormat: i18next.t('hourFormat'),
              dateFormat: "h A",
              // headerCellCls: i18next.language === 'gb' && "b-extra-padding"
            },
            {
              unit: "minute",
              increment: 30,
              dateFormat: "",
            },
          ],
    },
    // Horizontal Configs
    horizontalColumns: [
      {
        type: "tree",
        field: "name",
        width: desktopColumnWidth,
        htmlEncode: false,
        headerRenderer() {
          return `<span class="day-of-week-label" id="dayOfWeek">${dayOfWeek}</span>`;
        },
        renderer: ({ record }: any) => {
          if (record.data.isGroup || record.data.isSubGroup) {
            return `<div className="groupName">${record.data.name}</div>`;
          }

          if (record.data.isOnTheFloor) {
            return `<div className="onTheFloor">${record.data.name}</div>`;
          }

          return `
              <div class="${
                record.data.id === "on-the-floor"
                  ? "OnTheFloorStyleWrapper"
                  : "resourceWrapper"
              } ${record.id} ${
            record.data.isFocused ? "focused-employee" : "not-focused"
          }">
  
                ${
                  !false
                    ? `<div class="${
                        record.data.id === "on-the-floor"
                          ? "emptyImage"
                          : "resourceImage"
                      }"><img src=${getUserImage(record)} /> </div>`
                    : ""
                }
                <div class="resourceData">
                  ${
                    record.data.isOnLeave
                      ? `<div class="onLeave">On Leave</div>`
                      : ""
                  }
                  <div class="${false ? "resourceNameMobile" : "resourceName"}">
                    ${record.name} ${
            false && record.hasOvernightShift ? "*" : ""
          }</div>
                        ${
                          !record.data.isOnLeave &&
                          record.data.id !== "unassigned"
                            ? `<div class="shiftHours">
                              <div class="shifts">${
                                record.data.shiftDataString
                              }</div>
                              <div class="onCallIndicator">${
                                record.data.isOnCall
                                  ? `<img src=${phoneIcon} />`
                                  : ""
                              } </div>
                            </div>`
                            : ""
                        }
  
                      </div>
                    </div>`.replace(/\s+/g, " "); //Removing extra white space to help with formatting with tests
        },
      },
    ],
    horizontalFeatures: {
      timeAxisHeaderMenu: {
        items: {
          zoomLevel: false,
          dateRange: false,
          eventsFilter: false,
          currentTimeLine: false,
        },
      },
    },

    // Vertical Configs
    //   verticalTickSize: verticalTickSize, // sets row height in vertical mode
    verticalTimeAxisColumn: {
      width: 25,
    },
    verticalViewPreset: {
      id: "initPreset",
      name: "Initial Preset",
      base: "hourAndDay",

      // Override headers
      headers: [
        {
          unit: "day",
          dateFormat: "DD.MM.YYYY",
        },
        {
          unit: "hour",
          dateFormat: "h A",
        },
      ],
    },
    verticalResourceColumns: {
      // For vertical
      columnWidth: document.documentElement.clientWidth / 4.8,
      headerRenderer({ resourceRecord }: any) {
        if (resourceRecord.grouping) {
          if (resourceRecord.grouping.subcatAbr !== null) {
            return `<img class="b-resource-image" src="${
              resourceRecord.imageUrl
            }">
                <span class="b-resource-name">${resourceRecord.name} ${
              resourceRecord.hasOvernightShift ? "*" : ""
            } </span>
                <div class="b-resource-abrs">
                <span class="b-resource-roleAbr">${
                  resourceRecord.roleAbr
                }</span>
                <span class="b-resource-subAbr">${
                  resourceRecord.grouping.subcatAbr
                }</span>
                </div>`.replace(/\s+/g, " "); //Removing extra white space to help with formatting with tests
          }
        }
        return `<img class="b-resource-image" src="${
          resourceRecord.imageUrl || "defaultUserImage"
        }">
              <span class="b-resource-name">${resourceRecord.name} ${
          resourceRecord.hasOvernightShift ? "*" : ""
        } </span>
              <div class="b-resource-abrs">
              <span class="b-resource-roleAbr">${resourceRecord.roleAbr}</span>
              </div>`.replace(/\s+/g, " "); //Removing extra white space to help with formatting with tests
      },
    },
    verticalFeatures: {
      timeAxisHeaderMenu: {
        items: {
          zoomLevel: false,
          dateRange: false,
          eventsFilter: false,
          currentTimeLine: false,
        },
      },
    },

    // Scheduler Configs
    appendTo: "container",
    barMargin: 1,
    columnAutoWidth: false,
    columnLines: true,
    createEventOnDblClick: false,
    dayOfWeek: dayOfWeek,
    // defaultResourceImageName: false,
    displayDateFormat: "HH:mm",
    enableDeleteKey: false,
    eventBodyTemplate,
    // eventColor: null,
    eventLayout: "pack",
    eventRenderer,
    eventTooltip: {
      disabled: false,
      autoUpdate: true,
      // template: eventTooltipTemplate,
    },
    eventStyle: "colored",
    features: {
      eventDragCreate: {
        validatorFn({ startDate, endDate }: any) {
          const startsAndEndsSameTime = startDate === endDate;
          const isValid = !startsAndEndsSameTime;

          return true;
        },
      },
      eventDrag: {
        validatorFn({ eventRecords, newResource }: any) {
          const extraEmployeeIds = eventRecords[0]?.data?.extraEmployeeDetails
            ?.map(({ empId }: any) => empId)
            .filter(
              (empId: any) => empId !== eventRecords[0]?.data?.resourceId
            );
          if (
            extraEmployeeIds &&
            (extraEmployeeIds?.indexOf(newResource?.data?.id) !== -1 ||
              newResource?.data?.id ===
                eventRecords[0]?.data?.parentAssociateId)
          ) {
            return {
              valid: false,
              message: "Existing Assigned Associate",
            };
          }
          if (
            newResource.data.isGroup ||
            newResource.data.isSubGroup ||
            newResource.data.id === "on-the-floor"
          ) {
            return false;
          }

          const isValid = newResource.data.isOnLeave !== true;

          return {
            valid: isValid,
          };
        },
      },
      eventEdit: true,
      headerMenu: false,
      regionResize: false,
      scheduleTooltip: false,
      timeRanges: {
        currentDateFormat: "h:mm a",
        //   showCurrentTimeLine: !rendererLocation,
        showCurrentTimeLine: true,
      },
      tree: true,
    },
    minHeight: `calc(${document.documentElement.clientHeight}px - 110px)`,
    multiEventSelect: true,
    resourceMargin: 5,
    // resourceImageExtension: false,
    resourceTimeRangesFeature: true,
    rowHeight: 48,
    scrollLeft: 0,
    scrollTop: 0,
    snapToIncrement: true,
    startDate: new Date(year, month, day, 0),
    stripeFeature: false,
    timeRangesFeature: true,
    zoomOnMouseWheel: false,
    zoomOnTimeAxisDoubleClick: false,
    emptyText: "No records to display",
  };
};

export function eventBodyTemplate(data: any) {
  const associateOnLeave = data.onLeave;
  const markAssociateEventsOnLeave = data.markIfOnLeave;
  const eventOutsideShift = data.outsideShift;
  const eventOnLeaveWithMark = associateOnLeave && markAssociateEventsOnLeave;

  const shouldBeMarked = eventOnLeaveWithMark || eventOutsideShift;
  const sfoffline = data?.activity?.data?.sfoffline || false;

  if (associateOnLeave || eventOutsideShift) {
    const onLeaveStyles =
      !eventOnLeaveWithMark && associateOnLeave ? "onLeaveEvent" : null;

    if (data.headerText === "MB") {
      return `${
        shouldBeMarked || sfoffline
          ? `<div class="b-sch-event-corner ${onLeaveStyles}"><img src=${exclamationPoint}></div>`
          : ``
      }<div class="b-sch-meal-container ${onLeaveStyles}"><img src=${breakIcon} class="event_icon"></div>`.replace(
        /\s+/g,
        " "
      ); //Removing extra white space to help with formatting with tests
    }

    /* if (isMobile) {
      return `${
        shouldBeMarked || sfoffline
          ? `<div class="b-sch-event-corner ${onLeaveStyles}"><img src=${exclamationPoint}></div>`
          : ``
      }
        <div class="b-sch-event-container ${onLeaveStyles} ${
        data.shortActivity ? `b-sch-short-event-container` : ""
      }">
        <span class="b-sch-event-header dp-event-header-text">${
          data.headerText
        }</span>
        </div>`.replace(/\s+/g, " "); //Removing extra white space to help with formatting with tests
    } */

    if (data.locationText.length > 1 || data.clientText.length > 1) {
      return `${
        shouldBeMarked || sfoffline
          ? `<div class="b-sch-event-corner ${onLeaveStyles}"><img src=${exclamationPoint}></div>`
          : ``
      }<div class="b-sch-event-with-data-container ${onLeaveStyles} ${
        data.shortActivity ? `b-sch-short-event-container` : ""
      }">
        <span class="b-sch-event-header">${data.headerText}</span>
        ${
          data.locationText &&
          `<span class="b-sch-event-footer dp-event-location-text">${data.locationText}</span>`
        }
        ${
          data.clientText &&
          `<span class="b-sch-event-footer dp-event-client-text">${data.clientText}</span>`
        }
      </div>`.replace(/\s+/g, " "); //Removing extra white space to help with formatting with tests
    }

    return `${
      shouldBeMarked || sfoffline
        ? `<div class="b-sch-event-corner ${onLeaveStyles}"><img src=${exclamationPoint}></div>`
        : ``
    }
        <div class="b-sch-event-container ${onLeaveStyles} ${
      data.shortActivity ? `b-sch-short-event-container` : ""
    }">
        <span class="b-sch-event-header dp-event-header-text">${
          data.headerText
        }</span>
        </div>`.replace(/\s+/g, " "); //Removing extra white space to help with formatting with tests
  }

  if (data.headerText === "MB") {
    return `${
      sfoffline
        ? `<div class="b-sch-event-corner"><img src=${exclamationPoint}></div>`
        : ``
    }<div class="b-sch-meal-container"><img src=${breakIcon} class="event_icon"></div>`;
  }

  /* if (isMobile) {
    return `${
      sfoffline
        ? `<div class="b-sch-event-corner"><img src=${exclamationPoint}></div>`
        : ``
    }
      <div class="b-sch-event-container ${
        data.shortActivity ? `b-sch-short-event-container` : ""
      }">
        <span class="b-sch-event-header">${data.headerText}</span>
      </div>`.replace(/\s+/g, " "); //Removing extra white space to help with formatting with tests
  } */

  if (data.locationText.length > 1 || data.clientText.length > 1) {
    return `${
      sfoffline
        ? `<div class="b-sch-event-corner"><img src=${exclamationPoint}></div>`
        : ``
    }<div class="b-sch-event-with-data-container ${
      data.shortActivity ? `b-sch-short-event-container` : ""
    }">
      <span class="b-sch-event-header">${data.headerText}</span>
      ${
        data.locationText &&
        `<span class="b-sch-event-footer dp-event-location-text">${data.locationText}</span>`
      }
      ${
        data.clientText &&
        `<span class="b-sch-event-footer dp-event-client-text">${data.clientText}</span>`
      }
    </div>`.replace(/\s+/g, " "); //Removing extra white space to help with formatting with tests
  }

  return `${
    sfoffline
      ? `<div class="b-sch-event-corner"><img src=${exclamationPoint}></div>`
      : ``
  }
    <div class="b-sch-event-container ${
      data.shortActivity ? `b-sch-short-event-container` : ""
    }">
        <span class="b-sch-event-header">${data.headerText}</span>
      </div>`.replace(/\s+/g, " "); //Removing extra white space to help with formatting with tests
}

export const msIn2Hours = 7200000;
export const msIn30Mins = 1800000;

export function eventRenderer({
  eventRecord,
  resourceRecord,
  renderData,
}: {
  eventRecord: any;
  resourceRecord: any;
  renderData: any;
}): Record<string, unknown> {
  const showFullName = eventRecord.durationMS >= msIn2Hours;

  const shortActivity = eventRecord.durationMS <= msIn30Mins;

  renderData.style = `background-color: ${
    eventRecord.color || resourceRecord.color
  }`;

  if (resourceRecord.isOnLeave) {
    renderData.style = `${renderData.style}; opacity: 0.3`;
  }

  const headerText = showFullName
    ? eventRecord.name
    : eventRecord.abbreviation || eventRecord.activity;

  return {
    activity: eventRecord,
    headerText: headerText,
    locationText: eventRecord.data.location || "",
    clientText: eventRecord.data.clientName || "",
    outsideShift: eventRecord.data.outsideShift,
    onLeave: eventRecord.data.onLeave,
    markIfOnLeave: eventRecord.data.markIfOnLeave,
    shortActivity: shortActivity,
  };
}
