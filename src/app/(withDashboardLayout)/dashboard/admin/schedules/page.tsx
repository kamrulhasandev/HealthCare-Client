"use client";
import { Box, Button, IconButton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import SchedulesModal from "./components/SchedulesModal";
import { useGetAllSchedulesQuery } from "@/redux/api/scheduleApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import  DeleteIcon  from '@mui/icons-material/Delete';
import { dateFormatter } from "@/utils/dateFormatter";
import dayjs from "dayjs";
import { ISchedule } from "@/types/schedule";

const SchedulesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allSchedule, setAllSchedule] = useState<any>([]);
  const { data, isLoading } = useGetAllSchedulesQuery({});
  const schedules = data?.schedules;
  const meta = data?.meta;

  useEffect(() => {
    const updateData = schedules?.map(
       (schedule: ISchedule, index: number) => {
          return {
             sl: index + 1,
             id: schedule?.id,
             startDate: dateFormatter(schedule.startDate),
             endDate: dateFormatter(schedule.endDate),
             startTime: dayjs(schedule?.startDate).format('hh:mm a'),
             endTime: dayjs(schedule?.endDate).format('hh:mm a'),
          };
       }
    );
    setAllSchedule(updateData);
 }, [schedules]);


 const columns: GridColDef[] = [
  { field: 'sl', headerName: 'SL' },
  { field: 'startDate', headerName: 'Start Date', flex: 1 },
  { field: 'endDate', headerName: 'End Date', flex: 1 },
  { field: 'startTime', headerName: 'Start Time', flex: 1 },
  { field: 'endTime', headerName: 'End Time', flex: 1 },
  {
     field: 'action',
     headerName: 'Action',
     flex: 1,
     headerAlign: 'center',
     align: 'center',
     renderCell: ({ row }) => {
        return (
           <IconButton aria-label='delete'>
              <DeleteIcon sx={{ color: 'red' }} />
           </IconButton>
        );
     },
  },
];


  return (
    <Box>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={2}
      >
        <SchedulesModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsModalOpen(true)}
        >
          Create Schedules
        </Button>
      </Stack>

      {!isLoading ? (
            <Box my={2}>
               <DataGrid rows={allSchedule ?? []} columns={columns} />
            </Box>
         ) : (
            <h1>Loading.....</h1>
         )}
    </Box>
  );
};

export default SchedulesPage;
