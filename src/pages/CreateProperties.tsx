import { useGetIdentity } from "@refinedev/core";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import Form from "../components/common/Form";
import { useForm } from "@refinedev/react-hook-form";

const CreateProperties = () => {
  const { data: user } = useGetIdentity();
  const [propertyImages, setPropertyImage] = useState<{
    name: string;
    url: string;
  }>({ name: "", url: "" });
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm({
    refineCoreProps: {
      resource: "properties",
    },
  });
  const handleImageChange = (file: File) => {
    const reader = (readFile: File) => {
      return new Promise<string>((resolve) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });
    };
    reader(file).then((result: string) => {
      setPropertyImage({ name: file?.name, url: result });
    });
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!propertyImages.name) return alert("Please upload an image");
    await onFinish({
      ...data,
      photo: propertyImages.url,
      email: user?.email,
    });
  };

  return (
    <Form
      type="Create"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      propertyImages={propertyImages}
    />
  );
};

export default CreateProperties;
