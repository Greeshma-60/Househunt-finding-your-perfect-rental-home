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

const AllBookings = () => {

   const [allBookings, setAllBookings] = useState([]);

   const getAllBooking = async () => {
      try {
         const response = await axios.get(
            'http://localhost:8001/api/admin/getallbookings',
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`
               }
            }
         );

         if (response.data.success) {
            setAllBookings(response.data.data);
         } else {
            message.error(response.data.message);
         }

      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getAllBooking();
   }, []);

   return (
      <div>

         <h2 style={{marginBottom:"10px"}}>All Bookings</h2>

         <p style={{marginBottom:"15px"}}>
            Total Bookings: {allBookings.length}
         </p>

         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>

               <TableHead>
                  <TableRow>
                     <TableCell>No.</TableCell>
                     <TableCell>Booking ID</TableCell>
                     <TableCell align="center">Owner ID</TableCell>
                     <TableCell align="center">Property ID</TableCell>
                     <TableCell align="center">Tenant ID</TableCell>
                     <TableCell align="center">Tenant Name</TableCell>
                     <TableCell align="center">Tenant Contact</TableCell>
                     <TableCell align="center">Status</TableCell>
                  </TableRow>
               </TableHead>

               <TableBody>

                  {allBookings.map((booking, index) => (

                     <TableRow key={booking._id}>

                        <TableCell>
                           {index + 1}
                        </TableCell>

                        <TableCell>
                           BK-{index + 1}
                        </TableCell>

                        <TableCell align="center">
                           {booking.ownerID}
                        </TableCell>

                        <TableCell align="center">
                           {booking.propertyId}
                        </TableCell>

                        <TableCell align="center">
                           {booking.userID}
                        </TableCell>

                        <TableCell align="center">
                           {booking.userName}
                        </TableCell>

                        <TableCell align="center">
                           {booking.phone}
                        </TableCell>

                        <TableCell align="center">

                           {booking.bookingStatus === "approved" && (
                              <span style={{color:"green", fontWeight:"bold"}}>
                                 Approved
                              </span>
                           )}

                           {booking.bookingStatus === "pending" && (
                              <span style={{color:"orange", fontWeight:"bold"}}>
                                 Pending
                              </span>
                           )}

                           {booking.bookingStatus === "rejected" && (
                              <span style={{color:"red", fontWeight:"bold"}}>
                                 Rejected
                              </span>
                           )}

                        </TableCell>

                     </TableRow>

                  ))}

               </TableBody>

            </Table>
         </TableContainer>

      </div>
   );
};

export default AllBookings;