"use client";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import SpecialtiesModal from "./components/SpecialtiesModal";
import { useState } from "react";
import {
  useDeleteSpecialtyMutation,
  useGetAllSpecialtyQuery,
} from "@/redux/api/specialtiesApi";
import Image from "next/image";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";
import { toast } from "sonner";

const DataGridContainer = styled(Box)({
  padding: "16px",
  marginTop: "16px",
  backgroundColor: "#f5f5f5",
  borderRadius: "8px",
  width: "100%",
});

const CustomDataGrid = styled(DataGrid)({
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#e0e0e0",
    fontWeight: "bold",
    textAlign: "center",
  },
  "& .MuiDataGrid-cell": {
    padding: "8px",
    textAlign: "center",
    display: "flex",

    alignItems: "center",
  },
  "& .MuiDataGrid-footerContainer": {
    backgroundColor: "#e0e0e0",
  },
});

const SpecialtiesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data, isLoading } = useGetAllSpecialtyQuery({});
  const [deleteSpecialty] = useDeleteSpecialtyMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteSpecialty(id).unwrap();
      if (res?.id) {
        toast.success("Specialty deleted successfully!!!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "index",
      headerName: "No",
      flex: 1,
      renderCell: (params: any) => {
        return params.api.getRowIndexRelativeToVisibleRows(params.id) + 1;
      },
    },
    { field: "title", headerName: "Title", flex: 1 },
    {
      field: "icon",
      headerName: "Icon",
      flex: 1,
      renderCell: ({ row }) => (
        <Box>
          <Image src={row.icon} width={30} height={30} alt="icon" />
        </Box>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => (
        <IconButton onClick={() => handleDelete(row.id)} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      ),
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsModalOpen(true)}
        >
          Create Specialty
        </Button>
        <TextField
          placeholder="Search Specialist"
          size="small"
          variant="outlined"
        />
      </Stack>

      <SpecialtiesModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
      />

      {isLoading ? (
        <Stack alignItems="center" justifyContent="center" height={200}>
          <Typography>Loading...</Typography>
        </Stack>
      ) : (
        <DataGridContainer>
          <CustomDataGrid rows={data} columns={columns} hideFooter={true} />
        </DataGridContainer>
      )}
    </Box>
  );
};

export default SpecialtiesPage;
