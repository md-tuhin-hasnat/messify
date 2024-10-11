import axios from "axios";
const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    if (typeof window !== "undefined") {
      return <WrappedComponent {...props} />;
    }
    return null;
  };

  AuthenticatedComponent.getServerSideProps = async (context) => {
    const { req, res } = context;

    try {
      if (!req.headers.cookie) {
        throw new Error("No cookies found"); // Trigger redirect
      }
      await axios.get("http://localhost:3001/api/auth/protected", {
        headers: {
          Cookie: req.headers.cookie,
        },
      });

      return {
        props: {},
      };
    } catch (error) {
      res.writeHead(302, { Location: "/auth" });
      res.end();
      return { props: {} };
    }
  };

  return AuthenticatedComponent;
};

export default withAuth;
