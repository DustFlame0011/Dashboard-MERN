import {
  ChatBubble,
  Delete,
  Edit,
  Phone,
  Place,
  Star,
} from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import {
  useDelete,
  useGetIdentity,
  useNavigation,
  useShow,
} from "@refinedev/core";
import React from "react";
import CustomButton from "../components/common/CustomButton";
import { useParams } from "react-router";

const checkImage = (url: string) => {
  const image = new Image();
  image.src = url;
  return image.width !== 0 && image.height !== 0;
};

const PropertyDetail = () => {
  const { edit, navigate } = useNavigation();
  const { data: user } = useGetIdentity<any>();

  const {
    query: { data, isLoading, isError },
  } = useShow<any>();
  const { id } = useParams();
  const { mutate } = useDelete<any>();

  const propertyDetails = data?.data ?? {};

  const isCurrentUser = user?.email === propertyDetails.creator?.email;

  const handleDeleteProperty = () => {
    const response = confirm("Are you would like to delete this Property?");
    if (response) {
      mutate(
        {
          resource: "properties",
          id: id as string,
        },
        {
          onSuccess: () => {
            navigate("/properties");
          },
        }
      );
    }
  };

  if (isLoading) return <Typography>isLoading...</Typography>;
  if (isError) return <Typography>isError...</Typography>;

  return (
    <Box borderRadius={"15px"} padding="20px" bgcolor="#fcfcfc" width="100%">
      <Typography fontSize={25} fontWeight={500} color={"#11142d"}>
        Detail
      </Typography>
      <Box
        display={"flex"}
        flexDirection={{ xs: "column", lg: "row" }}
        justifyContent={"space-between"}
        gap={10}
        mt="10px"
      >
        <Box flex={1} width={"100%"}>
          <img
            src={propertyDetails.photo}
            width={"100%"}
            height={546}
            style={{ objectFit: "cover", borderRadius: "10px" }}
          />
          <Box mt={"15px"}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              flexWrap={"wrap"}
              alignItems={"center"}
            >
              <Typography
                fontSize={18}
                fontWeight={500}
                color={"#11142d"}
                textTransform={"capitalize"}
              >
                {propertyDetails.propertyType}
              </Typography>
              <Box>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} sx={{ color: "#F2C94C" }} />
                ))}
              </Box>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              flexWrap={"wrap"}
              alignItems={"center"}
            >
              <Box>
                <Typography
                  fontSize={22}
                  fontWeight={600}
                  color={"#11142d"}
                  mt={"10px"}
                >
                  {propertyDetails.title}
                </Typography>
                <Stack
                  mt={0.5}
                  direction={"row"}
                  alignItems={"center"}
                  gap={0.5}
                >
                  <Place sx={{ color: "#808191" }} />
                  <Typography fontSize={14} color={"#11142d"}>
                    {propertyDetails.location}
                  </Typography>
                </Stack>
              </Box>
              <Box>
                <Typography
                  fontSize={16}
                  fontWeight={600}
                  color={"#11142d"}
                  mt={"10px"}
                >
                  Price
                </Typography>
                <Stack direction={"row"} alignItems={"flex-end"} gap={1}>
                  <Typography fontSize={25} fontWeight={600} color={"#475be8"}>
                    ${propertyDetails.price}
                  </Typography>
                  <Typography fontSize={14} color={"#808191"} mb={0.5}>
                    for one day
                  </Typography>
                </Stack>
              </Box>
            </Stack>
            <Stack direction={"column"} alignItems={"flex-start"} gap={1}>
              <Typography
                fontSize={16}
                fontWeight={600}
                color={"#11142d"}
                mt={"10px"}
              >
                Description
              </Typography>
              <Typography fontSize={16} fontWeight={600} color={"#808191"}>
                {propertyDetails.description}
              </Typography>
            </Stack>
          </Box>
        </Box>
        <Box
          flex={1}
          maxWidth={{ xs: "100%", lg: "380px" }}
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          gap={"20px"}
        >
          <Stack
            p={2}
            width={"100%"}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            border={"1px solid #E4E4E4"}
          >
            <Stack
              mt={2}
              justifyContent={"center"}
              alignItems={"center"}
              textAlign={"center"}
            >
              <img
                src={
                  checkImage(propertyDetails.creator?.avatar || "")
                    ? propertyDetails.creator.avatar
                    : "https://img.freepik.com/premium-photo/smiling-young-man-outdoors_171337-49506.jpg"
                }
                width={90}
                height={90}
                style={{
                  borderRadius: "100%",
                  objectFit: "cover",
                }}
              />
              <Box mt={"15px"}>
                <Typography fontSize={16} fontWeight={600} color={"#11142d"}>
                  {propertyDetails.creator?.name}
                </Typography>
                <Typography
                  mt={"2px"}
                  fontSize={14}
                  fontWeight={600}
                  color={"#808191"}
                >
                  Agent
                </Typography>
              </Box>
              <Stack mt={"15px"}>
                <Typography
                  mt={"2px"}
                  fontSize={14}
                  fontWeight={400}
                  color={"#808191"}
                >
                  <Place sx={{ color: "#808191" }} /> Tokyo, JP
                </Typography>
              </Stack>
              <Typography
                mt={"1px"}
                fontSize={16}
                fontWeight={600}
                color={"#11142d"}
              >
                {propertyDetails.creator?.AllProperties?.length} Properties
              </Typography>
            </Stack>
            <Stack
              width={"100%"}
              mt={"25px"}
              direction={"row"}
              flexWrap={"wrap"}
              gap={2}
            >
              <CustomButton
                title={!isCurrentUser ? "Message" : "Edit"}
                backgroundColor="#475be8"
                color="#fcfcfc"
                fullWidth
                icon={!isCurrentUser ? <ChatBubble /> : <Edit />}
                handleClick={() => {
                  edit("properties", propertyDetails._id);
                }}
              />
              <CustomButton
                title={!isCurrentUser ? "Call" : "Delete"}
                backgroundColor={!isCurrentUser ? "#2ED480" : "#d42e2e"}
                color="#fcfcfc"
                fullWidth
                icon={!isCurrentUser ? <Phone /> : <Delete />}
                handleClick={() => {
                  if (isCurrentUser) handleDeleteProperty();
                }}
              />
            </Stack>
          </Stack>
          <Stack>
            <img src="https://japanalytic.com/wp-content/uploads/2021/01/Screen-Shot-2021-01-28-at-6.33.23-PM-816x764.png" />
          </Stack>
          <CustomButton
            title="Book Now"
            backgroundColor="#475be8"
            color="#fcfcfc"
            fullWidth
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyDetail;
