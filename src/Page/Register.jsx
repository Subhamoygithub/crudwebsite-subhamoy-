import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useForm } from 'react-hook-form'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { Paper } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'

import { toast } from 'react-toastify';
import { RegisterApi } from '../AxiosHelper/register';



const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
    const navigate = useNavigate()
    const [profile_pic, setprofile_pic] = useState()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const mutation = useMutation({
        mutationFn: RegisterApi,
        onSuccess: (data) => {
            if (data) {
                toast(data.message)
                navigate('/login')
            }

        },
        onError: (data) => {
            toast(data.message)
        }
    })
    const onsubmitregister = (data) => {
        let formdata = new FormData()
        formdata.append("first_name", data.first_name)
        formdata.append("last_name", data.last_name)
        formdata.append("email", data.email)
        formdata.append("password", data.password)
        formdata.append("profile_pic", profile_pic)

        mutation.mutate(formdata)
    }


    return (
        <>
        <div class="d-flex justify-content-center w-100 vh-200 body">

        <div class="">
            <Grid>
                <Paper className='paper' style={{ padding: "20px", height: '85vh',  marginTop: '20px', border: "2px solid blue" }}>
                    <Grid align='center'>
                        <Avatar style={{ backgroundColor: "#C8B002" }}><AppRegistrationIcon /></Avatar>
                        <h3 className='text-white pt-1 text'>Sign Up</h3>
                    </Grid>
                    <Box component='form' onSubmit={handleSubmit(onsubmitregister)} style={{ marginTop: '50px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField label='FirstName' placeholder='FirstName*'
                                    {...register('first_name', { required: true })}
                                />
                                {errors?.first_name?.type === "required" && <p style={{ color: 'red' }}>This field is Required</p>}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label='LastName' placeholder='LastName*'
                                    {...register('last_name', { required: true, maxLength: 10 })}
                                />
                                {errors?.last_name?.type === 'required' && <p style={{ color: 'red' }}>This field is Required</p>}

                            </Grid>
                            <Grid item xs={12}>
                                <TextField className='empas' label='Email' name="email"  placeholder='Email*'
                                    {...register('email', { required: true, pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ })}
                                />
                                {errors?.email?.type === 'required' && <p style={{ color: 'red' }}>This Field is Required</p>}
                                {errors?.email?.type === 'pattern' && <p style={{ color: 'red' }}>Email address must be a valid address</p>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField className='empas' label='Password' name="password" type='password' 
                                    {...register('password', { required: true })}
                                />
                                {errors?.password?.type === 'required' && <p style={{ color: 'red' }}>This field is Required</p>}
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    component="label"
                                    style={{backgroundColor: "blue"}}
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload Photo
                                    <VisuallyHiddenInput type="file" onChange={(e) => setprofile_pic(e.target.files[0])} accept='image/*' />
                                </Button>
                                {profile_pic !== "" && profile_pic !== undefined && profile_pic !== null ? (
                                    <img style={{ height: "120px", width: "150px" }}
                                        src={URL.createObjectURL(profile_pic)}
                                        alt='' />
                                ) : (
                                    <>{profile_pic === "" && <p>Photo is not Uploaded</p>}</>
                                )}
                            </Grid>
                        </Grid>
                        <Typography className='mt-2'> Already have an account? &nbsp;
                            <Link to='/login' underline="none">
                                Sign In
                            </Link>

                        </Typography>
                        <div className='mt-3'>
                            <Button type='submit' variant='contained' style={{backgroundColor: "blue"}} fullWidth>Register</Button>
                        </div>
                    </Box>
                </Paper>
            </Grid>
        </div>
    </div>
</>
      
    );
}
