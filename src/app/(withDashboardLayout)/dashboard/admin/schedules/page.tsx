'use client'
import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import SchedulesModal from "./components/SchedulesModal";

const SchedulesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      
    </Box>
  );
};

export default SchedulesPage;
