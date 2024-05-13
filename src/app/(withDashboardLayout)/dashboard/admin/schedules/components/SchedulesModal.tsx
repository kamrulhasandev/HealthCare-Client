import FileUploader from "@/components/Forms/FileUploader";
import PHDatePicker from "@/components/Forms/PHDatePicker";
import PHTimePicker from "@/components/Forms/PHTimePicker";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import PHModal from "@/components/Shared/PHModal/PHModal";
import { useCreateSpecialtyMutation } from "@/redux/api/specialtiesApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { Button, CircularProgress, Grid } from "@mui/material";

import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { dateFormatter } from "@/utils/dateFormatter";

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
  const handleFormSubmit = async (values: FieldValues) => {
    values.startDate = dateFormatter(values.startDate);
    values.endDate = dateFormatter(values.endDate);

    console.log(values);
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
