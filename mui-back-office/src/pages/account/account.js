import {
    Avatar, Container, Stack, Box,
    Button, Card, CardActions, CardContent,
    Divider, Typography, CardHeader, TextField,
    Snackbar, Unstable_Grid2 as Grid
  } from '@mui/material';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios, {HttpStatusCode} from 'axios';
import Header from '../../components/Header';

// Url trong database da duoc ma hoa, luu vào state encodeUrl, khi render giao dien thì giai ma Url,
// khi save thi gan truong image bang state encodeUrl, ma hoa lai Url da giai ma co the gay sai lam
export default function Account(){
  let {memberId} = useParams();
  const [member, setMember] = useState({});
  const [message, setMessage] = useState("");
  const [encodeUrl, setEncodeUrl] = useState("")

  useEffect(() => {
        axios
          .get(`http://localhost:8080/member/${memberId}`)
          .then(res => {
            // console.log(res.status)
            console.log("response data: ", res.data)
            const encodedString = res.data.image; // chuỗi mã hóa
            setEncodeUrl(res.data.image);
            const lastChar = encodedString.charAt(encodedString.length - 1); // lấy ký tự cuối cùng
            const numPadChars = (lastChar === "=" ? 1 : 0) + (lastChar === "==" ? 1 : 0); // tính số ký tự đệm bị bỏ qua
            const encodedWithoutPadding = encodedString.slice(0, -numPadChars); // xóa các ký tự đệm
            const decodedString = decodeURIComponent(encodedWithoutPadding);
            if(res.status === HttpStatusCode.Ok){
                // setMember({...member, id: res.data.id, fullName: res.data.fullName, 
                //     image: decodedString, password: res.data.password, email: res.data.email, 
                //     mobile: res.data.mobile, landline: res.data.landline, address: res.data.address})
                // có thể không sử dụng toán tử spread vì sẽ tạo ra một object mới, gây tốn tài nguyên và khiến phần tử image bị mất đi
                setMember({
                  id: res.data.id, fullName: res.data.fullName, 
                  image: decodedString, password: res.data.password, email: res.data.email, 
                  mobile: res.data.mobile, landline: res.data.landline, address: res.data.address
                });
            }
          })
          .catch(err => {
            console.log(err)
            throw err;
          });
        },[memberId])


        const handleChange = (e) => {
            setMember({...member, [e.target.name]: e.target.value});
          }

        const handleSubmit = (e) => {
            e.preventDefault();
            // khong the dung setMember vì sẽ gửi state được cập nhật mới nhất lên server
            const updatedMember = { ...member, image: encodeUrl };
            axios
            .post(`http://localhost:8080/member/update/${memberId}`, updatedMember)
            .then(res => {
              if (res.status === HttpStatusCode.Ok) {
              setMessage("successfully updated");
              console.log("response data ", res.data);
              }
            })
            .catch(err => {
              console.log("member" , member)
              console.error(err);
              setMessage("An error occurred while updating the information");
            });
      };
  return(
  <Box m="20px">
    <Header
        title="ACCOUNT"
        subtitle="Profile of Excellent Admin"
      />
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <Card>
                    <CardContent>
                    <Box
                        sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                        }}
                    >
                        <Avatar
                        src={member.image}
                        sx={{
                            height: 200,
                            mb: 2,
                            width: 200
                        }}
                        />
                        <Typography
                        gutterBottom
                        variant="h4"
                        >
                        {member.fullName}
                        </Typography>
                        {/* <Typography
                        color="text.secondary"
                        variant="body2"
                        >
                        {member.address}
                        </Typography> */}
                    </Box>
                    </CardContent>
                    <Divider />
                    <CardActions>
                    <Button
                        fullWidth
                        variant="text"
                    >
                        Upload picture
                    </Button>
                    </CardActions>
                </Card>
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <form>
                    <Card>
                        <CardHeader
                        subheader="The information can be edited"
                        title="Profile"
                        />
                        <CardContent sx={{ pt: 0 }}>
                        <Box sx={{ m: -1.5 }}>
                            <Grid
                            container
                            spacing={3}
                            >
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <Typography color="text.secondary" variant="body2">
                                Fullname*
                                </Typography>
                                <TextField
                                variant="standard"
                                fullWidth
                                helperText="Please specify the full name"
                                // label="Fullname"
                                name="fullName"
                                onChange={handleChange}
                                required
                                value={member.fullName}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <Typography color="text.secondary" variant="body2">
                                Password*
                                </Typography>
                                <TextField
                                variant="standard"
                                type='password'
                                fullWidth
                                name="password"
                                onChange={handleChange}
                                value={member.password}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <Typography color="text.secondary" variant="body2">
                                Mobile
                                </Typography>
                                <TextField
                                variant="standard"
                                fullWidth
                                name="mobile"
                                onChange={handleChange}
                                value={member.mobile}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <Typography color="text.secondary" variant="body2">
                                Landline
                                </Typography>
                                <TextField
                                variant="standard"
                                fullWidth
                                name="landline"
                                onChange={handleChange}
                                value={member.landline}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <Typography color="text.secondary" variant="body2">
                                Email
                                </Typography>
                                <TextField
                                variant="standard"
                                fullWidth
                                name="email"
                                onChange={handleChange}
                                value={member.email}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <Typography color="text.secondary" variant="body2">
                                Address
                                </Typography>
                                <TextField
                                variant="standard"
                                fullWidth
                                name="address"
                                onChange={handleChange}
                                value={member.address}
                                />
                            </Grid>
                          </Grid>
                        </Box>
                        </CardContent>
                        <Divider />
                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button variant="contained" onClick={handleSubmit}>
                            Save details
                        </Button>
                        </CardActions>
                    </Card>
                    </form>
                    <Snackbar
                    open={!!message}
                    autoHideDuration={5000}
                    onClose={() => setMessage("")}
                    message={message}
                    />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </Box>
);
    }

