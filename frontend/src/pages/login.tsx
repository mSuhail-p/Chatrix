import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { loginValErr } from "../interfaces/home";

export default function ChatLogin() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<loginValErr>({});
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  // validation
  const validate = () => {
    const newErrors: loginValErr = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone number must contain exactly 10 digits";
    }

    setErrors(newErrors);

    return newErrors;
  };

  // handle submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length === 0) setSuccess(true);
  };

  // side effect moved out of render body
  useEffect(() => {
    if (success) {
      localStorage.setItem("user", JSON.stringify({ name, phone }));
      navigate("/");
    }
  }, [success, name, phone, navigate]);

  return (
    <div className="min-h-screen bg-[#14201C] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-[#1E2E27] rounded-2xl p-8 border border-[#26352f]">
        {/* Header */}
        <div className="mb-8">
          <div className="text-2xl mb-1">💬</div>
          <h1 className="text-[#EDEDE4] text-2xl font-semibold">
            Join the chat
          </h1>
          <p className="text-[#6B7A72] text-sm mt-1">
            Enter your details to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-[#A6ADA8] text-sm block mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className={`w-full bg-[#182620] text-[#EDEDE4] rounded-lg px-4 py-3 text-sm outline-none border transition
                ${
                  errors.name
                    ? "border-red-500"
                    : "border-[#26352f] focus:border-[#D8A34D]"
                }`}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1.5">⚠ {errors.name}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-[#A6ADA8] text-sm block mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your phone number"
              className={`w-full bg-[#182620] text-[#EDEDE4] rounded-lg px-4 py-3 text-sm outline-none border transition
                ${
                  errors.phone
                    ? "border-red-500"
                    : "border-[#26352f] focus:border-[#D8A34D]"
                }`}
            />
            {errors.phone && (
              <p className="text-red-400 text-xs mt-1.5">⚠ {errors.phone}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#D8A34D] hover:opacity-90 text-[#14201C] font-semibold py-3 rounded-lg text-sm transition mt-2"
          >
            Enter Chat →
          </button>
        </form>
      </div>
    </div>
  );
}
