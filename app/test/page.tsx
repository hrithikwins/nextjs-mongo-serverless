"use client";
import React, { useEffect, useState } from "react";
import { getCollectionData } from "@/utils/get-url";
import ShowFieldData from "../components/show-fields";
import Link from "next/link";

const Page = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const collectionData: any = await getCollectionData("test");
      setData(collectionData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Link href="test/create" className="bg-blue-200 px-4 py-2">
        Create
      </Link>

      <ShowFieldData data={data} page="test" />
    </div>
  );
};

export default Page;
