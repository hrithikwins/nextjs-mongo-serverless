"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function FormCreator({ fields, register, control, buttonText, onSubmit, handleSubmit }) {
  const [files, setFiles] = useState([]);
  function onSelectFile(e) {
    const inputFiles = e.target.files;
    for (let i = 0; i < inputFiles.length; i++) {
      setFiles((files) => [
        ...files,
        {
          file: inputFiles[i],
          previewURL: URL.createObjectURL(inputFiles[i]),
        },
      ]);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((data, index) => {
          return (
            <div key={index} className={index > 5 ? "pt-4 pl-5" : "pt-4 pl-5"}>
              <AnimatePresence>
                <motion.div
                  initial={{ x: 200 }}
                  exit={{
                    x: -200,
                    opacity: 0,
                  }}
                  animate={{ x: 0 }}
                  transition={{
                    delay: index * 0.09,
                  }}
                >
                  {data["field"] === "textField" && <input {...register(data["name"])} placeholder={data["label"]} type={data["inputType"] ?? "text"} required={data["required"]} className="w-full p-2 border border-gray-300 rounded" />}
                  {data["field"] === "select" && (
                    <select {...register(data["name"])} className="w-full p-2 border border-gray-300 rounded">
                      {data["options"].map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                  {data["field"] === "image" && (
                    <div>
                      <input type="file" onChange={onSelectFile} className="w-full p-2 border border-gray-300 rounded" onClick={(e) => (e.target.value = null)} />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          );
        })}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {buttonText}
        </button>
      </form>
    </>
  );
}
export default FormCreator;
