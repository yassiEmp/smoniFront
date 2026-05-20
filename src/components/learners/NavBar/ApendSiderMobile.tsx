import { useRef, useState } from 'react';
import { Box, Paper } from '@mui/material';
import SideBarMobile from '../Siderbar/SideBarMobile';

interface ApendSiderMobileProps {
  instructorsData: any[];
  otherInstructorsData?: any[];
  selectedLocation: number | '';
  setSelectedLocation: (id: number | '') => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  fetchDisponibility: () => void;
  loading: boolean;
  mode: 'manual' | 'automatic';
  setMode: (mode: 'manual' | 'automatic') => void;
} 

const ApendSiderMobile = ({
  instructorsData,
  otherInstructorsData = [],
  selectedLocation,
  setSelectedLocation,
  selectedDate,
  setSelectedDate,
  loading,
  fetchDisponibility,
  mode,
  setMode
}: ApendSiderMobileProps) => {
  const MIN_HEIGHT = 0.6 * window.innerHeight;
  const MAX_HEIGHT = 0.95 * window.innerHeight;

  const [height, setHeight] = useState<number>(MIN_HEIGHT);
  const startY = useRef<number | null>(null);
  const startHeight = useRef<number | null>(null);
  const sheetRef = useRef<HTMLDivElement | null>(null);

  // ? Touch start
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startY.current = e.touches[0].clientY;
    startHeight.current = height;
  };

  // ? Touch move
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startY.current !== null && startHeight.current !== null) {
      const delta = startY.current - e.touches[0].clientY;
      let newHeight = startHeight.current + delta;

      newHeight = Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, newHeight));
      setHeight(newHeight);
    }
  };

  // ? Mouse down (desktop testing)
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    startY.current = e.clientY;
    startHeight.current = height;

    const handleMouseMove = (e: MouseEvent) => {
      if (startY.current !== null && startHeight.current !== null) {
        const delta = startY.current - e.clientY;
        let newHeight = startHeight.current + delta;

        newHeight = Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, newHeight));
        setHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <Box
      ref={sheetRef}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: height,
        maxHeight: '75vh',
        minHeight: '35vh',
        transition: 'height 0.3s ease',
      }}
    >
      <Paper
        elevation={6}
        square
        sx={{
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Drag handle */}
        <Box
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onMouseDown={handleMouseDown}
          sx={{
            width: 60,
            height: 6,
            backgroundColor: '#ccc',
            borderRadius: 3,
            mx: 'auto',
            my: 1,
            cursor: 'row-resize',
          }}
        />

        {/* Main content */}
        <Box sx={{ overflowY: 'hidden', flex: 1 }}>
          <SideBarMobile
            instructorsData={instructorsData}
            otherInstructorsData={otherInstructorsData}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            loading={loading}
            fetchDisponibility={fetchDisponibility}
            mode={mode}
            setMode={setMode}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default ApendSiderMobile;
