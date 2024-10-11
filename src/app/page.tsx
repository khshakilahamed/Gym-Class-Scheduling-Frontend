import Footer from "@/components/Footer/Footer";
import Banner from "@/components/home/Banner";
import Contact from "@/components/home/Contact";
import Feedback from "@/components/home/Feedback";
import Navbar from "@/components/home/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <Feedback />
      <Contact />
      <Footer />
    </div>
  );
}
