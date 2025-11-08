import moment from 'moment';
import {
  Calendar,
  momentLocalizer,
  Views,
  type View,
} from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarView.css';
import { setSelectedDate } from '../store/calendarSlice';
import { useState } from 'react';
import { DataDialog } from '../components/DataDialog';

const localizer = momentLocalizer(moment);

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  resource: string;
}

const CalendarView = () => {
  const dispatch = useDispatch();
  const calendarData = useSelector((state: RootState) => state.calendar.data);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const events: CalendarEvent[] = Object.keys(calendarData).map((dateStr) => {
    const date = new Date(dateStr);
    return {
      title: 'Data Available',
      start: date,
      end: date,
      resource: dateStr,
    };
  });

  const handleSelectEvent = (event: CalendarEvent) => {
    dispatch(setSelectedDate(event.resource));
    setDialogOpen(true);
  };

  const handleSelectSlot = (slot: { start: Date; end: Date }) => {
    const dateStr = moment(slot.start).format('YYYY-MM-DD');

    if (calendarData[dateStr]) {
      dispatch(setSelectedDate(dateStr));
      setDialogOpen(true);
    } else {
      const alertDateStr = moment(slot.start).format('MMMM DD, YYYY');
      alert(`No data found for the selected date: ${alertDateStr}`);
    }
  };

  return (
    <>
      <header>
        <h1 className='title'>Data Analytics Calendar</h1>
      </header>
      <div className='calendar'>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor='start'
          endAccessor='end'
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          view={view}
          date={date}
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          defaultView={view}
          onView={(view) => setView(view)}
          onNavigate={(date) => {
            setDate(new Date(date));
          }}
          style={{ height: '100%' }}
        />
      </div>
      <DataDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};

export default CalendarView;
