"use client";

import { Box, Button, Stack, TextField } from "@mui/material";
import SpecialtiesModal from "./components/SpecialtiesModal";
import { useState } from "react";
import { useGetAllSpecialtyQuery } from "@/redux/api/specialtiesApi";

const SpecialtiesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data, isLoading } = useGetAllSpecialtyQuery({});
  console.log(data);
  return (
    <Box>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Button onClick={() => setIsModalOpen(true)}>Create Specialty</Button>
        <SpecialtiesModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
        <TextField placeholder="Search Specialist" size="small"></TextField>
      </Stack>

      <Box>Display Specialties</Box>
    </Box>
  );
};

export default SpecialtiesPage;
