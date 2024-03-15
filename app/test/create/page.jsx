"use client";
import FormCreator from "@/app/components/form-creator"
import { createDocument } from '@/utils/get-url';
import { useForm } from "react-hook-form";
import {toast} from "react-toastify"

const FormPage = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
    control,
  } = useForm();

  async function onSubmit(data) {
    console.log(data);
    const collectionName = "test";
     try {
       await createDocument(collectionName, data);
       toast.success(collectionName + " created successfully!");
     } catch (error) {
       console.error("There was a problem with your fetch operation:", error);
       toast.error("There was a problem creating the session." + error);
     }
  }
    // const createWorldFields: FormField[] = [
    const createWorldFields = [
    {
      label: "name",
      name: "name",
      errors: errors.name,
      field: "textField",
      required: true,
    },
    {
      label: "Scene Id",
      name: "sceneId",
      fileName: "sceneId",
      errors: errors.sceneId,
      field: "textField",
      required: true,
    },
    {
      label: "Scene Image Url",
      name: "imageUrl",
      fileName: "imageUrl",
      errors: errors.brandLogo,
      field: "textField",
      required: true,
    },
  ];
 return (
   <>
     <FormCreator key="createWorld" fields={createWorldFields} register={register} control={control} onSubmit={onSubmit} handleSubmit={handleSubmit} buttonText="Create Scene" />
   </>
 );
}
export default FormPage