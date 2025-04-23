import SideBar from "../../components/SideBar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="z-10" />

      <div className="flex flex-1">
        <SideBar />
      </div>
      <Footer />
    </div>
  );
}

export default About;
