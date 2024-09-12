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
    axios(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch product data.");
      });
  }, [id]); // Adding id as a dependency

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <CircularProgress />;
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
            objectFit: "contain", // Fixed typo from "obejectFit" to "objectFit"
          }}
          image={Array.isArray(data.images) && data.images.length > 0 ? data.images[0] : ""}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h4">{data.title}</Typography>
        <Typography sx={{ maxWidth: 500, textAlign: "justify" }}>
          {data.description}
        </Typography>
        <Typography sx={{ fontSize: 30, color: "primary.main" }}>
          Price: ${data.price}
        </Typography>
      </Box>
    </Box>
  );
};

export default SingleProduct;
