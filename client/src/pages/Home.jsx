import Biography from "../components/Biography";
import Department from "../components/Department";
import Hero from "../components/Hero";
import MessageForm from "../components/MessageForm";

function Home() {
  return (
    <>
      <Hero
        title={"Welcome XYZ Care Medical. Health care provider"}
        imageUrl={"/hero.png"}
      />
      <Biography imgUrl={"/about.png"} />
      <Department />
      <MessageForm />
    </>
  );
}

export default Home;
