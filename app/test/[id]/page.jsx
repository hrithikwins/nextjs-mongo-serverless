"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import FormCreator from "@/app/components/form-creator";
import { deleteDocument, readDocument, updateDocument } from "@/utils/get-url";
import { useRouter } from 'next/navigation';





const FormPage = ({ params }) => {

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();

const collectionName = "test";

const formFields = [
  {
    label: "Session Name",
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

  useEffect(() => {
    if (params.id) {
      readDocument(collectionName, params.id).then((documentDetails) => {
         Object.keys(documentDetails).forEach((key) => {
           setValue(key, documentDetails[key]);
         });
      });
    }
  }, [params.id]);

  const onUpdateDocument = async (data) => {
    try {
      const modifiedCount = await updateDocument(collectionName, params.id, data);
      if (modifiedCount) {
        toast.success(collectionName + " Updated successfully!");
      } else {
        throw new Error(collectionName + " not updated");
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
      toast.error("There was a problem updating the session." + error);
    }
  };

   const onDeleteDocument = async (data) => {
     try {
       const modifiedCount = await deleteDocument(collectionName, params.id);
       if (modifiedCount) {
         toast.success(collectionName + " deleted successfully!");
         router.push("/test")
       } else {
         throw new Error(collectionName + " not deleted");
       }
     } catch (error) {
       console.error("There was a problem with your fetch operation:", error);
       toast.error("There was a problem updating the session." + error);
     }
   };


  return (
    <>
    <FormCreator
      fields={formFields}
      register={register}
      control={control}
      onSubmit={onUpdateDocument}
      handleSubmit={handleSubmit}
      buttonText={"Update " + collectionName}
    />
    <button onClick={() => onDeleteDocument()} className="p-4 bg-blue-500 flex p-2 my-2 text-white">Delete</button>
    </>
  );
};




export default FormPage;
