import { LoginForm } from "@/components/LoginForm";
import { login } from "@/services/userService"; // Import the login function
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";


const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Please sign in to your account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;