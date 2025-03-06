import Image from "next/image";
import TextAnimation from "./components/TextAnimation";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Additional sections for scrolling */}
      <section className=" bg-gray-50 ">
        <TextAnimation />
      </section>
    </main>
  );
}
