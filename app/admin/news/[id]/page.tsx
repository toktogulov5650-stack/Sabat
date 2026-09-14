"use client";

import { useParams } from "next/navigation";
import { NewsEditor } from "../NewsEditor";

export default function EditAdminNewsPage() {
  const params = useParams<{ id: string }>();
  return <NewsEditor id={params.id} />;
}

