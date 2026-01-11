import { Card, CardMedia } from "@mui/material";
import React from "react";
import { Link } from "react-router";

interface PropertyCardProps {
  id: number;
  title: string;
  location: string;
  price: string;
  photo: string;
}

const PropertyCard = ({
  id,
  title,
  location,
  price,
  photo,
}: PropertyCardProps) => {
  return (
    <Card
      component={Link}
      to={`/property/show/${id}`}
      sx={{
        maxWidth: "330px",
        padding: "10px",
        "&:hover": {
          boxShadow: "0 22px 45px 2px rgba(176,176,176,0.1)",
        },
      }}
      elevation={0}
    >
      <CardMedia
        component={"img"}
        width={"100%"}
        height={210}
        image={photo}
        alt={title}
        sx={{ borderRadius: "10px" }}
      />
    </Card>
  );
};

export default PropertyCard;
