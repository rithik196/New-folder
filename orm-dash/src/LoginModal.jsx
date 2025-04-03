import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, User } from "lucide-react";

const images = [
    "/banking1.png",
    "/banking2.png",
    "/banking4.jpg"
  ];
  

export default function BankingLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    if (username && password) {
      localStorage.setItem("username", username);
      localStorage.setItem("isAuthenticated", "true");
      window.location.href = "/dashboard";
    //   alert("Login Successful");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black relative">
      {/* Background Image with Left Fade Effect */}
      <div className="absolute inset-0">
        <img
          src={images[currentImage]}
          alt="Banking Visual"
          className="w-full h-full object-cover opacity-50"
        />
        {/* Fading Effect from Left */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
      </div>

      {/* Login Form (Centered & Blended with Background) */}
      <div className="relative z-10 bg-black/30 backdrop-blur-md rounded-xl p-10 text-white w-[400px]">
        <h2 className="text-3xl font-semibold text-center">Welcome Back!</h2>
        <p className="text-sm text-gray-400 text-center">Login to your account</p>

        <div className="mt-6">
          <div className="relative mb-4">
            <User className="absolute left-3 top-2 text-gray-500" />
            <Input
              className="pl-10 bg-gray-800 text-gray-300 border-gray-600 w-full"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="relative mb-4">
            <Lock className="absolute left-3 top-2 text-gray-500" />
            <Input
              className="pl-10 bg-gray-800 text-gray-300 border-gray-600 w-full"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <p className="text-right text-sm text-blue-500 cursor-pointer hover:underline">Forgot Password?</p>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 mt-4"  onClick={handleLogin}>
            Log In
          </Button>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentImage ? "bg-blue-500" : "bg-gray-500"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
