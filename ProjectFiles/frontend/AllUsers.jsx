import { message } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const AllUsers = () => {

   const [allUser, setAllUser] = useState([]);
   const [search, setSearch] = useState("");

   useEffect(() => {
      getAllUser();
   }, []);

   const getAllUser = async () => {
      try {

         const response = await axios.get(
            'http://localhost:8001/api/admin/getallusers',
            {
               headers: {
                  'Authorization': `Bearer ${localStorage.getItem("token")}`
               }
            }
         );

         if (response.data.success) {
            setAllUser(response.data.data);
         } else {
            message.error(response.data.message);
         }

      } catch (error) {
         console.log(error);
      }
   };

   const handleStatus = async (userid, status) => {
      try {

         const res = await axios.post(
            'http://localhost:8001/api/admin/handlestatus',
            { userid, status },
            {
               headers: {
                  'Authorization': `Bearer ${localStorage.getItem("token")}`
               }
            }
         );

         if (res.data.success) {
            getAllUser();
         }

      } catch (error) {
         console.log(error);
      }
   };

   const filteredUsers = allUser.filter((user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
   );

   return (
      <div>

         <h2 style={{marginBottom:"15px"}}>All Users</h2>

         {/* Search */}
         <input
            placeholder="Search user by name or email"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            style={{padding:"8px", marginBottom:"20px", width:"250px"}}
         />

         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>

               <TableHead>
                  <TableRow>
                     <TableCell>User ID</TableCell>
                     <TableCell align="center">Name</TableCell>
                     <TableCell align="center">Email</TableCell>
                     <TableCell align="center">Role</TableCell>
                     <TableCell align="center">Status</TableCell>
                     <TableCell align="center">Actions</TableCell>
                  </TableRow>
               </TableHead>

               <TableBody>

                  {filteredUsers.map((user) => (

                     <TableRow key={user._id}>

                        <TableCell>{user._id}</TableCell>

                        <TableCell align="center">{user.name}</TableCell>

                        <TableCell align="center">{user.email}</TableCell>

                        <TableCell align="center">
                           {user.type}
                        </TableCell>

                        <TableCell align="center">
                           {user.granted === "granted" ? "Active" : "Pending"}
                        </TableCell>

                        <TableCell align="center">

                           {user.type === 'Owner' && user.granted === 'ungranted' ? (
                              <Button
                                 onClick={() => handleStatus(user._id, 'granted')}
                                 size='small'
                                 variant="contained"
                                 color="success"
                              >
                                 Approve
                              </Button>
                           ) : user.type === 'Owner' && user.granted === 'granted' ? (
                              <Button
                                 onClick={() => handleStatus(user._id, 'ungranted')}
                                 size='small'
                                 variant="outlined"
                                 color="error"
                              >
                                 Remove
                              </Button>
                           ) : null}

                        </TableCell>

                     </TableRow>

                  ))}

               </TableBody>

            </Table>
         </TableContainer>

      </div>
   );
};

export default AllUsers;