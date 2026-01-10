import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import CustomButton from "./CustomButton";
import { FormProps } from "../../interfaces/home";

const Form = ({
  type,
  register,
  formLoading,
  handleSubmit,
  handleImageChange,
  onFinishHandler,
  propertyImages,
}: FormProps) => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        {type} a Property
      </Typography>
      <Box mt={2.5} borderRadius={"15px"} padding={"20px"} bgcolor={"#fcfcfc"}>
        <form
          style={{
            marginTop: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Enter properties name
            </FormHelperText>
            <TextField
              fullWidth
              required
              color="info"
              variant="outlined"
              {...register("title", { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Enter properties description
            </FormHelperText>
            <TextareaAutosize
              minRows={5}
              required
              color="info"
              style={{
                width: "100%",
                background: "transparent",
                borderColor: "rgba(0,0,0,0.23)",
                borderRadius: "6",
                padding: 10,
                color: "#919191",
              }}
              {...register("description", { required: true })}
            ></TextareaAutosize>
          </FormControl>
          <Stack direction={"row"} gap={4}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "#11142d",
                }}
              >
                Select Property Type
              </FormHelperText>
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                defaultValue="apartment"
                sx={{ textTransform: "capitalize" }}
                {...register("propertyType", { required: true })}
              >
                <MenuItem value="farmhouse">Farmhouse</MenuItem>
                <MenuItem value="condo">Condo</MenuItem>
                <MenuItem value="studio">Studio</MenuItem>
                <MenuItem value="apartment">Apartment</MenuItem>
                <MenuItem value="villa">Villa</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "#11142d",
                }}
              >
                Enter Property Price
              </FormHelperText>
              <TextField
                fullWidth
                required
                color="info"
                variant="outlined"
                placeholder="Enter Price"
                {...register("price", { required: true })}
              />
            </FormControl>
          </Stack>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Enter Property Location
            </FormHelperText>
            <TextField
              fullWidth
              required
              color="info"
              variant="outlined"
              placeholder="Enter Location"
              {...register("location", { required: true })}
            />
          </FormControl>
          <Stack direction={"column"} gap={1} justifyContent={"center"} mt={2}>
            <Stack direction={"row"} gap={2}>
              <Typography
                color="#11142d"
                fontSize={"16px"}
                fontWeight={500}
                my={"10px"}
              >
                Property Photo
              </Typography>
              <Button
                component="label"
                sx={{
                  width: "fit-content",
                  color: "#2ed480",
                  textTransform: "capitalize",
                  fontSize: "16",
                }}
              >
                Upload *
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleImageChange(e.target.files![0]);
                  }}
                />
              </Button>
            </Stack>
            <Typography
              fontSize={14}
              color={"#808191"}
              sx={{
                wordBreak: "break-all",
              }}
            >
              {propertyImages?.name || "No image selected"}
            </Typography>
          </Stack>
          <CustomButton
            type="submit"
            title={formLoading ? "Submitting.." : "Submit"}
            backgroundColor="#475be8"
            color="#fcfcfc"
          />
        </form>
      </Box>
    </Box>
  );
};

export default Form;
