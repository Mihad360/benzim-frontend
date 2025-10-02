import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";

export default function PersonalInformation() {
  const userData = {
    name: "Chelofer",
    email: "alkhahlaksalkgkgalk@hmail.com",
    phoneNumber: "3000597212",
    profileImage: "https://www.w3schools.com/w3images/avatar2.png",
    countryCode: "+1242",
  };

  return (
    <div>
      <div className="bg-[#d49256] text-white px-6 py-3 rounded-md">
        <h2 className="text-lg font-semibold"> Personal Information</h2>
      </div>
      <div className="mx-auto max-w-5xl pt-12">
        <div className="rounded-2xl border-2 border-[#e8a870] bg-white p-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-6">
            <h1 className="text-2xl font-normal text-gray-700">
              Personal Information
            </h1>
            <Link
              to="/dashboard/settings/edit-profile"
              style={{
                backgroundColor: "#e8a870", // Background color
                color: "black", // Text color
                padding: "12px 24px", // Padding for the button
                borderRadius: "9999px", // Full rounded corners (making it pill-shaped)
                display: "flex", // Flex layout for icon and text alignment
                alignItems: "center", // Centering items vertically
                gap: "8px", // Space between the icon and text
                border: "none", // Removing border
                cursor: "pointer", // Pointer cursor on hover
                transition: "background-color 0.3s ease", // Smooth transition on hover
                fontWeight: "bold",
              }}
            >
              <Pencil className="h-4 w-4" /> {/* Icon */}
              Edit Profile
            </Link>
          </div>

          {/* Content */}
          <div className="flex gap-8">
            {/* Profile Section */}
            <div className="flex-shrink-0">
              <div className="inline-block rounded-lg border border-gray-200 bg-white p-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-[#e8a870]">
                    <img
                      src={userData.profileImage || "/placeholder.svg"}
                      alt="Profile"
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm text-gray-500">Profile</span>
                  <span className="text-lg font-medium text-gray-800">
                    Admin
                  </span>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="flex-1 space-y-6">
              {/* Name Field */}
              <div>
                <label className="mb-2 block text-sm text-gray-600">Name</label>
                <input
                  type="text"
                  value={userData.name}
                  readOnly
                  className="w-full rounded-lg border-2 border-[#e8a870] bg-white px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#e8a870]/50"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="mb-2 block text-sm text-gray-600">
                  E-mail
                </label>
                <input
                  type="email"
                  value={userData.email}
                  readOnly
                  className="w-full rounded-lg border-2 border-[#e8a870] bg-white px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#e8a870]/50"
                />
              </div>

              {/* Phone Number Field */}
              <div>
                <label className="mb-2 block text-sm text-gray-600">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 rounded-lg border-2 border-[#e8a870] bg-white px-4 py-3">
                    <span className="text-2xl">🇺🇸</span>
                    <span className="text-gray-800">
                      {userData.countryCode}
                    </span>
                  </div>
                  <input
                    type="tel"
                    value={userData.phoneNumber}
                    readOnly
                    className="flex-1 rounded-lg border-2 border-[#e8a870] bg-white px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#e8a870]/50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
