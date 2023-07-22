import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import { loginUser } from "src/API/apis";
import { Toaster } from "react-hot-toast";
const Page = () => {
  const router = useRouter();

  const [userData, setUserData] = useState(null);
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      phone_number: "",
      password: "",
    },
    validationSchema: Yup.object({
      phone_number: Yup.string().max(255).required("Phone Number is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      console.log(values);
      const { phone_number, password } = values;
      const data = await loginUser({ phone_number, password });
      setUserData(data.data);
      window.sessionStorage.setItem("token", data.data.token);
      // window.sessionStorage.setItem("fullName", data.data.fullname);

      const token = window.sessionStorage.getItem("token");
      if (data.data.token) {
        auth.signIn();
        console.log(token);
        router.push("/");
        console.log("Xush kelibsiz");
        toast.success("Tizimga Muvofaqiyatli kirdingiz !");
        window.sessionStorage.setItem("authenticated", "true");
      }

      if (!data.data.token) {
        helpers.setErrors({ submit: "Ma'lumotlar xato kiritildi" });
        helpers.setStatus({ success: false });
        helpers.setSubmitting(false);
      }
    },
  });
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4" align="center">
                Login
              </Typography>
            </Stack>

            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.phone_number && formik.errors.phone_number)}
                  fullWidth
                  helperText={formik.touched.phone_number && formik.errors.phone_number}
                  label="Phone Number"
                  name="phone_number"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.phone_number}
                  autoComplete="off"
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                  autoComplete="off"
                />
              </Stack>

              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                Continue
              </Button>
            </form>
          </div>
        </Box>
      </Box>
      <Toaster
        toastOptions={{
          success: { style: { background: "green", color: "white" } },
          error: { style: { background: "red", color: "white" } },
        }}
      />
    </>
  );
};
Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
