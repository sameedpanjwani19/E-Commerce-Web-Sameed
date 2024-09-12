import { Box, CardMedia, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    console.log("Product ID:", id); // Debugging step to check if id is correct
    axios(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch product data.");
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return  <CircularProgress />;
  }

  return (
    <Box
      sx={{
        gap: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        
      }}
    >
      <Box>
        <CardMedia
          sx={{
            height: 400,
            width: 400,
            obejectFit: "contain",
          }}
          image={data.images && data.images[0]}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <h1>{data.title}</h1>
        <Typography sx={{ maxWidth: 500,  textAlign: "justify" }}>{data.description}</Typography>
        <Typography sx={{ fontSize: 30, color: "primary"}} variant="contained">Price: ${data.price}</Typography>
      </Box>
    </Box>
  );
};

export default SingleProduct;
