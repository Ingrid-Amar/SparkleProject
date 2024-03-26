import React, { useState, useRef, useEffect } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import "./Tab2.css";

interface Style {
  wrap: React.CSSProperties;
  left: React.CSSProperties;
  main: React.CSSProperties;
}

const styles: Style = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  }
};

const Calendar: React.FC = () => {
  const calendarRef = useRef<DayPilotCalendar>(null);
  const editEvent = async (e: DayPilot.Event) => {
    const dp = calendarRef.current!.control;
    const modal = await DayPilot.Modal.prompt("Update event text:", e.text());
    if (!modal.result) { return; }
    e.data.text = modal.result;
    dp.events.update(e);
  };
  const [calendarConfig, setCalendarConfig] = useState({
    viewType: "Week",
    durationBarVisible: false,
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: async (args: DayPilot.CalendarTimeRangeSelectedArgs) => {
      const dp = calendarRef.current!.control;
      const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
      dp.clearSelection();
      if (!modal.result) { return; }
      dp.events.add(new DayPilot.Event({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result
      }));
    },
    onEventClick: async (args: DayPilot.CalendarEventClickArgs) => {
      await editEvent(args.e);
    },
    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: "Delete",
          onClick: async (args: DayPilot.MenuItemClickArgs) => {
            const dp = calendarRef.current!.control;
            dp.events.remove(args.source);
          },
        },
        {
          text: "-"
        },
        {
          text: "Edit...",
          onClick: async (args: DayPilot.MenuItemClickArgs) => {
            await editEvent(args.source);
          }
        }
      ]
    }),
    onBeforeEventRender: (args: DayPilot.CalendarBeforeEventRenderArgs) => {
      args.data.areas = [
        {
          top: 3,
          right: 3,
          width: 20,
          height: 20,
          symbol: "icons/daypilot.svg#minichevron-down-2",
          fontColor: "#fff",
          toolTip: "Show context menu",
          action: "ContextMenu",
        },
        {
          top: 3,
          right: 25,
          width: 20,
          height: 20,
          symbol: "icons/daypilot.svg#x-circle",
          fontColor: "#fff",
          action: "None",
          toolTip: "Delete event",
          onClick: async (args: DayPilot.EventClickArgs) => {
            const dp = calendarRef.current!.control;
            dp.events.remove(args.source);
          }
        }
      ];
      const participants = args.data.participants;
      if (participants > 0) {
        for (let i = 0; i < participants; i++) {
          args.data.areas.push({
            bottom: 5,
            right: 5 + i * 30,
            width: 24,
            height: 24,
            action: "None",
            image: `https://picsum.photos/24/24?random=${i}`,
            style: "border-radius: 50%; border: 2px solid #fff; overflow: hidden;",
          });
        }
      }
    }
  });
  useEffect(() => {
    const events = [
      {
        id: 1,
        text: "Project Completion",
        start: "2024-03-25T21:00:00",
        end: "2024-03-25T23:59:00",
        participants: 1,
      },
    ];
    const startDate = "2024-03-25";
    calendarRef.current!.control.update({ startDate, events });
  }, []);
  return (
    <div style={styles.wrap}>
      <div style={styles.left}>
        <DayPilotNavigator
          selectMode={"Week"}
          showMonths={3}
          skipMonths={3}
          startDate={"2024-03-25"}
          selectionDay={"2024-03-25"}
          onTimeRangeSelected={(args: DayPilot.NavigatorTimeRangeSelectedArgs) => {
            calendarRef.current!.control.update({
              startDate: args.day
            });
          }}
        />
      </div>
      <div style={styles.main}>
        <DayPilotCalendar
          {...calendarConfig}
          ref={calendarRef}
        />
      </div>
    </div>
  );
}
export default Calendar;