import AuthPageComponent from "@/components/custom/authcomponent/auth-page";

export const metadata = {
  title: "Authentication | MessMaster",
};

export default function Auth() {
  return (
    <section className="w-full">
      <AuthPageComponent />
    </section>
  );
}
