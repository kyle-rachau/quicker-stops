import ClearIcon from '@mui/icons-material/Clear';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

export type LoginProps = {
  open: boolean;
  handleCancel: any;
  handleSubmit: any;
};

interface LoginData {
  username_error?: boolean; // Add other expected properties as needed
  password_error?: boolean;
}

export default function LoginDialog({ open, handleCancel, handleSubmit }: LoginProps) {
  const [loginData, setLoginData] = useState<LoginData>({});
  const [reqProps, setReqProps] = useState<string[]>([]);
  const [reqLables, setReqLabels] = useState<string[]>([]);
  const [reqFields, setReqFields] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleClose = (update: any) => {
    if (update) {
      const nld = {
        ...loginData,
      };
      handleSubmit(nld);
    } else {
      handleCancel();
    }
  };

  useEffect(() => {
    if (open) {
      setReqLabels(['User Name', 'Password']);
      setReqProps(['username', 'password']);
      setReqFields([]);
    }
  }, [open]);

  const handleStringChange = (event: any) => {
    event.persist();
    const shallow = { ...loginData };
    setLoginData(handleValidationChange(event, shallow, true));
  };

  function handleMissingFields(array: any, field: any, deleteField: any) {
    const propIndex = reqProps.indexOf(field);
    const label = reqLables[propIndex];

    // we need to add it because it's missing
    const arrayIndex = array.indexOf(label);
    if (arrayIndex !== -1) {
      if (deleteField) {
        array.splice(arrayIndex, 1);
      }
    } else {
      if (!deleteField) {
        array.push(label);
      }
    }
    return array;
  }

  function handleValidationChange(event: any, object: any, isString: any) {
    if (event.target.value.length === 0) {
      delete object[event.target.name];
      object[`${event.target.name}_error`] = true;
      const tempArray = [...reqFields];
      setReqFields(handleMissingFields(tempArray, event.target.name, false));
    } else {
      object[event.target.name] = isString
        ? String(event.target.value)
        : Number(event.target.value);
      delete object[`${event.target.name}_error`];
      if (String(event.target.value).length === 1) {
        const tempArray = [...reqFields];
        setReqFields(handleMissingFields(tempArray, event.target.name, true));
      }
    }
    return object;
  }

  const handleValidation = () => {
    let isValid = true;
    let temp = { ...loginData };
    let tempReq = [...reqFields];
    for (let p of reqProps) {
      if (!Object.hasOwn(loginData, p)) {
        isValid = false;
        temp = {
          ...temp,
          [`${p}_error`]: true,
        };
        tempReq = handleMissingFields(tempReq, p, false);
      }
    }
    if (isValid) {
      setReqFields([]);
      handleClose(true);
    } else {
      setReqFields(tempReq);
    }
    setLoginData(temp);
  };

  return (
    <Box sx={{ padding: '15px' }}>
      <Dialog open={open}>
        <DialogTitle>
          <Typography variant="h6" align="center">
            Log In
          </Typography>
          {reqFields.length > 0 && (
            <Paper sx={{ paddingBottom: '.5rem' }}>
              <Typography align="center" sx={{ color: '#d32f2f', marginBottom: '1rem' }}>
                Missing Required Fields:
              </Typography>

              <Grid container spacing={2}>
                {reqFields.map((field) => {
                  return (
                    <Grid
                      item
                      xs={6}
                      sx={{ paddingLeft: '0px !important', paddingTop: '0px !important' }}
                    >
                      <Stack direction={'row'} sx={{ marginLeft: '3rem' }}>
                        <IconButton
                          aria-label="weather"
                          size="large"
                          sx={{
                            color: '#d32f2f',
                            float: 'right',
                            marginRight: '5px',
                            padding: 0,
                          }}
                        >
                          <ClearIcon />
                        </IconButton>
                        <Typography align="center" sx={{ padding: 0, color: '#6d7073' }}>
                          {field}
                        </Typography>
                      </Stack>
                    </Grid>
                  );
                })}
              </Grid>
            </Paper>
          )}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ marginTop: '10px' }}>
            <Grid item xs={12}>
              <TextField
                name="username"
                error={loginData.username_error}
                required
                margin="dense"
                fullWidth
                label="User Name"
                type="string"
                variant="outlined"
                onChange={handleStringChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  onChange={handleStringChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleValidation()} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
