import Biography from "../components/Biography";
import Hero from "../components/Hero";

function AboutUs() {
  return (
    <>
      <Hero title={"Learn More About Us"} imageUrl={"/about.png"} />
      <Biography imageUrl={"/whoweare.png"} />
    </>
  );
}

export default AboutUs;
