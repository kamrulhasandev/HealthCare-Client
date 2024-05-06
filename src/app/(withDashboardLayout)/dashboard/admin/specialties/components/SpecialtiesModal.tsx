import FileUploader from "@/components/Forms/FileUploader";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import PHModal from "@/components/Shared/PHModal/PHModal";
import { useCreateSpecialtyMutation } from "@/redux/api/specialtiesApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { Button, CircularProgress, Grid } from "@mui/material";

import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialtiesModal = ({
  open,
  setOpen,
  isSubmitting,
  setIsSubmitting,
}: TProps) => {
  const [createSpecialty] = useCreateSpecialtyMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    setIsSubmitting(true);
    const data = modifyPayload(values);
    try {
      const res = await createSpecialty(data).unwrap();
      if (res?.id) {
        toast.success("Specialties Created Successfully.");
        setOpen(false);
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <PHModal open={open} setOpen={setOpen} title={"Create A New Specialty"}>
      <PHForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <PHInput name="title" label="Title" />
          </Grid>
          <Grid item md={6}>
            <FileUploader name={"file"} label="Upload File" />
          </Grid>
        </Grid>
        <Button disabled={isSubmitting} type="submit" sx={{ mt: 1 }}>
          {isSubmitting ? <CircularProgress size={24} /> : "Create"}
        </Button>
      </PHForm>
    </PHModal>
  );
};

export default SpecialtiesModal;
