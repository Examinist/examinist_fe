import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
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

import IUser, { UserPortalEnum, UserRoleEnum } from "../../../types/User";
import {
  ISignInRequest,
  ISignInResponse,
  SignInAPI,
} from "../../../services/APIs/AuthAPIs";
import useAuth from "../../../hooks/useAuth";
import { IErrorResponse } from "../../../services/Response";

export interface ISignInInputs {
  username: string;
  password: string;
  portal: UserPortalEnum;
}

const initialState: ISignInInputs = {
  username: "",
  password: "",
  portal: UserPortalEnum.STAFF,
};

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  portal: yup.string().required("Role is required"),
});

export default function SignInForm() {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ISignInInputs>({
    resolver: yupResolver(schema),
    defaultValues: initialState,
  });

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<ISignInInputs> = (inputs: ISignInInputs) => {
    console.log(inputs);
    const requestData: ISignInRequest = {
      username: inputs.username,
      password: inputs.password,
    };

    SignInAPI(requestData, inputs.portal)
      .then(({ data }: ISignInResponse) => {
        const user: IUser = data.staff! || data.student!;
        localStorage.setItem("auth_token", user.auth_token!);
        localStorage.setItem("portal", inputs.portal);
        login(user);
      })
      .catch(({ response: { status, data, statusText } }: IErrorResponse) => {
        console.log(status, data, statusText);
        setErrorMessage(data.message! || statusText!);
      });
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
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

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
              name="portal"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  row
                  sx={{ display: "flex", justifyContent: "center", gap: 4 }}
                >
                  <FormControlLabel
                    value={UserPortalEnum.STAFF}
                    control={<Radio />}
                    label={"University Staff"}
                  />
                  <FormControlLabel
                    value={UserPortalEnum.STUDENT}
                    control={<Radio />}
                    label={"Student"}
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
