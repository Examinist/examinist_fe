import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

enum Role {
  Student = "Student",
  UniversityStaff = "University Staff",
}

interface SignInInputs {
  username: string;
  password: string;
  role: Role;
}

const initialState: SignInInputs = {
  username: "",
  password: "",
  role: Role.UniversityStaff,
};

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  role: yup.string().required("Role is required"),
});

const url = "/admin_portal/sessions";

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInInputs>({
    resolver: yupResolver(schema),
    defaultValues: initialState,
  });

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const navigate = useNavigate();

  const navigateToLayout = (role: string) => {
    if(role === 'instructor'){
      navigate('/instructor');
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<SignInInputs> = (data: SignInInputs) => {
    axios
      .post(url, data)
      .then(({data: {status, data, message}}) => {
        console.log(data);
        if (status === "success") {
          // console.log(data);
          navigateToLayout(data.role);
        }
        else {
          setErrorMessage(message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(data);
  };

  return (
    <form
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          rowGap: "2rem",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
          <Box
            sx={{
              color: "#1B84BF",
              fontSize: "2.5rem",
              fontWeight: "bold",
            }}
          >
            Sign In
          </Box>
          <Box sx={{ color: "#6b7280" }}>
            Use your academic email and password to sign in to Examinist
          </Box>
        </Box>
       { errorMessage && <Alert severity="error" >{errorMessage}</Alert>}

        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
          <TextField
            sx={{ my: 1 }}
            id="outlined-basic"
            label="Username"
            variant="outlined"
            placeholder="username"
            {...register("username")}
            error={errors.username?.message ? true : false}
            helperText={errors.username?.message}
          />

          <FormControl
            sx={{ width: "100%", my: 1 }}
            variant="outlined"
            error={errors.password?.message ? true : false}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              {...register("password")}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    color={errors.password?.message ? "error" : "default"}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              placeholder="password"
            />
            {errors.password?.message && (
              <FormHelperText id="outlined-adornment-password-helper-text">
                {errors.password?.message}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl>
            <Controller
              name="role"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  row
                  sx={{ display: "flex", justifyContent: "center", gap: 4 }}
                >
                  <FormControlLabel
                    value={Role.UniversityStaff}
                    control={<Radio />}
                    label={Role.UniversityStaff}
                  />
                  <FormControlLabel
                    value={Role.Student}
                    control={<Radio />}
                    label={Role.Student}
                  />
                </RadioGroup>
              )}
            ></Controller>
          </FormControl>
        </Box>

        <Button
          sx={{
            color: "white",
            fontSize: "1rem",
            backgroundColor: "#1B84BF",
          }}
          variant="contained"
          type="submit"
        >
          Sign In
        </Button>
      </Box>
    </form>
  );
}
