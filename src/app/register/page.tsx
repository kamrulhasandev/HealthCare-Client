"use client";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerPatient } from "@/services/actions/registerPatient";
import { useRouter } from "next/navigation";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.service";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";

const RegisterPage = () => {
  const router = useRouter();

  const handleRegister = async (values: FieldValues) => {
    const data = modifyPayload(values);
    try {
      const res = await registerPatient(data);
      if (res?.data?.id) {
        const result = await userLogin({
          password: values.password,
          email: values.patient.email,
        });
        if (result?.data?.accessToken) {
          storeUserInfo({ accessToken: result?.data?.accessToken });
          router.push("/");
        }
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Image src={assets.svgs.logo} alt="logo" width={50} height={50} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Patient Register
              </Typography>
            </Box>
          </Stack>
          <Box>
            <PHForm onSubmit={handleRegister}>
              <Grid container spacing={2} my={1}>
                <Grid item md={12}>
                  <PHInput
                    name="patient.name"
                    label="Name"
                    fullWidth={true}
                    required={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    name="patient.email"
                    label="Email"
                    type="email"
                    fullWidth={true}
                    required={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth={true}
                    required={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    name="patient.contactNumber"
                    label="Contact Number"
                    type="tel"
                    fullWidth={true}
                    required={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    name="patient.address"
                    label="Address"
                    type="text"
                    fullWidth={true}
                    required={true}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth={true}
                sx={{
                  margin: "10px 0",
                }}
                type="submit"
              >
                Register
              </Button>
              <Typography component="p" fontWeight={300}>
                Do you already have an account?{" "}
                <Link className="text-blue-500" href={"/login"}>
                  Login
                </Link>
              </Typography>
            </PHForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
