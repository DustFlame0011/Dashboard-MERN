import React from "react";
import { PropertyCard } from "../components";
import { useTable, useNavigation } from "@refinedev/core";
import { Box, Typography } from "@mui/material";

const AllProperties = () => {
  const { navigate } = useNavigation();

  const {
    tableQuery: { data, isLoading, isError },
    current,
    setCurrent,
    pageCount,
    sorter,
    setSorter,
    filters,
    setFilters,
  } = useTable();

  // const currentPrice = sorter.find((item) => item.field === "price")?.order;

  const allProperties = data?.data ?? [];
  if (isLoading) return <Typography>isLoading...</Typography>;
  if (isError) return <Typography>isError...</Typography>;

  return (
    <Box>
      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {allProperties.map((property) => (
          <PropertyCard
            key={property._id}
            id={property._id}
            title={property.title}
            location={property.location}
            price={property.price}
            photo={property.photo}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AllProperties;
