import AppointmentForm from "../components/AppointmentForm";
import Hero from "../components/Hero";

function Appointment() {
  return (
    <>
      <Hero
        title={"Schedule Your Appointment"}
        imageUrl={"/signin.png"}
      />
      <AppointmentForm />
    </>
  );
}

export default Appointment;
