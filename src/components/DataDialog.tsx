import { DataChart } from './DataChart';
import moment from 'moment';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import './DataDialog.css';

interface DataDialogProps {
  open: boolean;
  onClose: () => void;
}

export const DataDialog = ({ open, onClose }: DataDialogProps) => {
  const selectedDate = useSelector(
    (state: RootState) => state.calendar.selectedDate
  );
  const calendarData = useSelector((state: RootState) => state.calendar.data);

  const data = selectedDate ? calendarData[selectedDate] : null;
  const formattedDate = selectedDate
    ? moment(selectedDate).format('MMMM DD, YYYY')
    : '';

  if (!open) return null;
  console.log('data-', data);

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <h2 className='modal-title'>Data Visualization</h2>
          <button className='close-button' onClick={onClose}>
            ×
          </button>
        </div>
        <p className='modal-description'>{formattedDate}</p>
        <div>
          {data ? (
            <DataChart data={data} />
          ) : (
            <div className='no-data-available'>No data available</div>
          )}
        </div>
      </div>
    </div>
  );
};
