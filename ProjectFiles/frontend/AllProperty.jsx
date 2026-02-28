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

const AllProperty = () => {
   const [allProperties, setAllProperties] = useState([]);

   const getAllProperty = async () => {
      try {
         const response = await axios.get(
            'http://localhost:8001/api/admin/getallproperties',
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`
               }
            }
         );

         if (response.data.success) {
            setAllProperties(response.data.data);
         } else {
            message.error(response.data.message);
         }

      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getAllProperty();
   }, []);

   return (
      <div>

         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>

               <TableHead>
                  <TableRow>
                     <TableCell>Property ID</TableCell>
                     <TableCell align="center">Owner ID</TableCell>
                     <TableCell align="center">Property Type</TableCell>
                     <TableCell align="center">Property Ad Type</TableCell>
                     <TableCell align="center">Property Address</TableCell>
                     <TableCell align="center">Owner Contact</TableCell>
                     <TableCell align="center">Property Amt</TableCell>
                  </TableRow>
               </TableHead>

               <TableBody>
                  {allProperties.map((property) => (
                     <TableRow key={property._id}>
                        <TableCell>{property._id}</TableCell>
                        <TableCell align="center">{property.ownerId}</TableCell>
                        <TableCell align="center">{property.propertyType}</TableCell>
                        <TableCell align="center">{property.propertyAdType}</TableCell>
                        <TableCell align="center">{property.propertyAddress}</TableCell>
                        <TableCell align="center">{property.ownerContact}</TableCell>
                        <TableCell align="center">{property.propertyAmt}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>

            </Table>
         </TableContainer>

         {/* HOUSE IMAGES */}

         <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    marginTop: "30px",
    flexWrap: "wrap"
  }}
>

  {/* CARD 1 */}
  <div style={{width:"300px", background:"#1e293b", borderRadius:"10px", overflow:"hidden"}}>
    <img
      src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
      style={{width:"100%", height:"180px", objectFit:"cover"}}
    />
    <div style={{padding:"15px", color:"white"}}>
      <h5>17, Indiranagar, Bengaluru</h5>
      <p>Residential - Rent</p>
      <p>Owner: +91 98765 43210</p>
      <p>Availability: Available</p>
      <p>Price: ₹35000</p>
      <button style={{width:"100%", padding:"10px", background:"#6366f1", border:"none", color:"white", borderRadius:"6px"}}>
        Get Info / Book
      </button>
    </div>
  </div>

  {/* CARD 2 */}
  <div style={{width:"300px", background:"#1e293b", borderRadius:"10px", overflow:"hidden"}}>
    <img
      src="https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg"
      style={{width:"100%", height:"180px", objectFit:"cover"}}
    />
    <div style={{padding:"15px", color:"white"}}>
      <h5>102, Hosur Road, Bengaluru</h5>
      <p>Commercial - Sale</p>
      <p>Owner: +91 90123 45678</p>
      <p>Availability: Unavailable</p>
      <p>Price: ₹18000000</p>
      <button style={{width:"100%", padding:"10px", background:"#6366f1", border:"none", color:"white", borderRadius:"6px"}}>
        Get Info / Book
      </button>
    </div>
  </div>

  {/* CARD 3 */}
  <div style={{width:"300px", background:"#1e293b", borderRadius:"10px", overflow:"hidden"}}>
    <img
      src="https://images.pexels.com/photos/6626114/pexels-photo-6626114.jpeg"
      style={{width:"100%", height:"180px", objectFit:"cover"}}
    />
    <div style={{padding:"15px", color:"white"}}>
      <h5>235, JP Nagar, Bengaluru</h5>
      <p>Residential - Rent</p>
      <p>Owner: +91 99876 54321</p>
      <p>Availability: Available</p>
      <p>Price: ₹8500000</p>
      <button style={{width:"100%", padding:"10px", background:"#6366f1", border:"none", color:"white", borderRadius:"6px"}}>
        Get Info / Book
      </button>
    </div>
  </div>

</div>

      </div>
   );
};

export default AllProperty;