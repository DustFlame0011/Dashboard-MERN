import React, { useMemo } from "react";
import { useNavigate } from "react-router";
import CustomButton from "../components/common/CustomButton";
import PropertyCard from "../components/common/PropertyCard";
import { useTable } from "@refinedev/core";
import {
  Box,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";

const AllProperties = () => {
  const navigate = useNavigate();

  const {
    tableQuery: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorters,
    setSorters,
    filters,
    setFilters,
  } = useTable({
    resource: "properties",
  });

  const allProperties = data?.data ?? [];

  const currentPrice =
    sorters.find((item) => item.field === "price")?.order ?? "asc";

  const toggleSort = (field: string) => {
    setSorters([{ field, order: currentPrice === "asc" ? "desc" : "asc" }]);
  };

  const currentFilters = useMemo(() => {
    const logical = filters.flatMap((item) => ("field" in item ? item : []));
    return {
      title: logical.find((item) => item.field === "title")?.value || "",
      propertyType:
        logical.find((item) => item.field === "propertyType")?.value || "",
    };
  }, [filters]);

  if (isLoading) return <Typography>isLoading...</Typography>;
  if (isError) return <Typography>isError...</Typography>;

  return (
    <Box>
      <Box mt={"20px"} sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <Stack direction={"column"} width={"100%"}>
          <Typography mt={1} fontSize={25} fontWeight={600} color={"#11142d"}>
            {allProperties.length > 0
              ? "All properties"
              : "No Properties found"}
          </Typography>
          <Box
            mt={2}
            mb={1}
            display={"flex"}
            width={"84%"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
          >
            <Box
              display={"flex"}
              gap={2}
              flexWrap={"wrap"}
              mb={{ xs: "20px", sm: "0px" }}
            >
              <CustomButton
                title={`Sort Price ${currentPrice === "asc" ? "↑" : "↓"}`}
                handleClick={() => toggleSort("price")}
                backgroundColor="#475be8"
                color="#fcfcfc"
              />
              <TextField
                variant="outlined"
                color="info"
                placeholder="Search Property"
                value={currentFilters.title}
                onChange={(e) => {
                  setFilters(
                    [
                      {
                        field: "title",
                        operator: "contains",
                        value: e.currentTarget.value
                          ? e.currentTarget.value
                          : undefined,
                      },
                    ],
                    "merge"
                  );
                }}
              />
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                defaultValue=""
                value={currentFilters.propertyType}
                onChange={(e: any) => {
                  setFilters(
                    [
                      {
                        field: "propertyType",
                        operator: "eq",
                        value: e.target.value || undefined,
                      },
                    ],
                    "merge"
                  );
                }}
              >
                <MenuItem value="">All</MenuItem>
                {["farmhouse", "condo", "studio", "apartment", "villa"].map(
                  (type) => (
                    <MenuItem key={type} value={type.toLowerCase()}>
                      {type}
                    </MenuItem>
                  )
                )}
              </Select>
            </Box>
          </Box>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <CustomButton
              title="Add property"
              handleClick={() => navigate("/properties/create")}
              backgroundColor="#475be8"
              color="#fcfcfc"
              icon={<Add />}
            />
          </Stack>
        </Stack>
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
      <Box>
        {allProperties.length > 0 && (
          <Box display={"flex"} gap={2} mt={3} flexWrap={"wrap"}>
            <CustomButton
              title="Previous"
              handleClick={() => setCurrent((prev) => prev - 1)}
              backgroundColor="#475be8"
              color="#fcfcfc"
              disabled={!(current > 1)}
            />
            <Box
              display={{ xs: "hidden", sm: "flex" }}
              alignItems={"center"}
              gap={"5px"}
            >
              Page{" "}
              <strong>
                {current} of {pageCount}
              </strong>
            </Box>
            <CustomButton
              title="Next"
              handleClick={() => setCurrent((prev) => prev + 1)}
              backgroundColor="#475be8"
              color="#fcfcfc"
              disabled={!(current === pageCount)}
            />
            <Select
              variant="outlined"
              color="info"
              displayEmpty
              required
              inputProps={{ "aria-label": "Without label" }}
              defaultValue={10}
              onChange={(e: any) => {
                setPageSize(e.target.value ? Number(e.target.value) : 10);
              }}
            >
              <MenuItem value="">All</MenuItem>
              {[5, 10, 20, 30].map((size) => (
                <MenuItem key={size} value={size}>
                  show{size}
                </MenuItem>
              ))}
            </Select>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AllProperties;
