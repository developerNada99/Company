import Image from "next/image";
import Navbar from "@/components/layouts/Navbar";
import Head from "./links/head/page";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Head/>
    </div>
  );
}
