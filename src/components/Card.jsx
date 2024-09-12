import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Image from '../assets/Frame 560.png'

const Cards = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/products/${id}`);
  };

  useEffect(() => {
    axios("https://api.escuelajs.co/api/v1/products")
      .then((response) => {
        console.log("Data fetched successfully:", response.data.slice(0, 26));
        setData(response.data.slice(0, 26));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (!data) {
    return  <CircularProgress/>;
  }

  return (
    <>
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}><img style={{width: "100%"}} src={Image} alt="image" /></Box>
    
      <Box
        sx={{
          gap: 2,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 4,
        }}
      >
        {data &&
          data.map((item) => (
            <Card
              key={item.id}
              sx={{
                marginTop: 2,
                width: 220,
                height: 310,
                marginBottom: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardMedia
                sx={{
                  height: 220,
                  width: 220,
                  obejectFit: "contain",
                }}
                image={item.images && item.images[0]} 
              />
              <CardContent sx={{ paddingTop: 1, padding: 0,}}>
                <Typography sx={{paddingTop: 1, paddingLeft:2 ,fontSize: 18,  }}  variant="h6">
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ paddingTop:1, paddingLeft:2, fontSize: 18,  color: "text.secondary" }}>
                  ${item.price}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "" }}>
                <Button  onClick={() => handleCardClick(item.id)} size="small" variant="contained">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          ))}
      </Box>
    </>
  );
};

export default Cards;
