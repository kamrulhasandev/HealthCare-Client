import PHDatePicker from "@/components/Forms/PHDatePicker";
import PHTimePicker from "@/components/Forms/PHTimePicker";
import PHForm from "@/components/Forms/PHForm";
import PHModal from "@/components/Shared/PHModal/PHModal";
import { Button, CircularProgress, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { dateFormatter } from "@/utils/dateFormatter";
import { timeFormatter } from "@/utils/timeFormatter";
import { useCreateScheduleMutation } from "@/redux/api/scheduleApi";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
};

const SchedulesModal = ({
  open,
  setOpen,
  isSubmitting,
  setIsSubmitting,
}: TProps) => {
  const [createSchedule] = useCreateScheduleMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    setIsSubmitting(true);
    values.startDate = dateFormatter(values.startDate);
    values.endDate = dateFormatter(values.endDate);
    values.startTime = timeFormatter(values.startTime);
    values.endTime = timeFormatter(values.endTime);
    try {
      const res: any = await createSchedule(values);
      if (res?.data?.length) {
        toast.success("Schedules created Successfully");
        setOpen(false)
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <PHModal open={open} setOpen={setOpen} title={"Create A New Schedule"}>
      <PHForm onSubmit={handleFormSubmit}>
        <Grid
          container
          spacing={2}
          sx={{
            width: "400px",
          }}
        >
          <Grid item md={12}>
            <PHDatePicker name="startDate" label="Start Date" />
          </Grid>
          <Grid item md={12}>
            <PHDatePicker name="endDate" label="End Date" />
          </Grid>
          <Grid item md={6}>
            <PHTimePicker name="startTime" label="Start Time" />
          </Grid>
          <Grid item md={6}>
            <PHTimePicker name="endTime" label="End Time" />
          </Grid>
        </Grid>
        <Button disabled={isSubmitting} type="submit" sx={{ mt: 1 }}>
          {isSubmitting ? <CircularProgress size={24} /> : "Create"}
        </Button>
      </PHForm>
    </PHModal>
  );
};

export default SchedulesModal;
