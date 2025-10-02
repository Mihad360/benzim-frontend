import { Button, Form, Upload } from "antd";
import BZForm from "../../forms/BZForm";
import BZInput from "../../forms/BZInput";
import { Controller, type FieldValues } from "react-hook-form";
import logo from "../../assets/Logo.jpg";
import { SwitchCamera } from "lucide-react";

export default function EditProfile() {
  const userData = {
    name: "Chelofer",
    email: "alkhahlaksalkgkgalk@hmail.com",
    phoneNumber: "3000597212",
    profileImage: "https://www.w3schools.com/w3images/avatar2.png",
    countryCode: "+1242",
  };

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div>
      <div className="bg-[#d49256] text-white px-6 py-3 rounded-md">
        <h2 className="text-lg font-semibold"> Personal Information</h2>
      </div>
      <div className="mx-auto max-w-5xl pt-12">
        <div className="rounded-2xl border-2 border-[#e8a870] bg-white overflow-hidden">
          <div className="bg-white px-8 py-6 border-b-2 border-[#e8a870]">
            <h1 className="text-2xl font-normal text-gray-700">
              Personal Information
            </h1>
          </div>

          <div className="bg-[#f5f5f5] p-8">
            <BZForm onSubmit={onSubmit}>
              <div className="flex gap-8">
                {/* Profile Section */}
                <div className="flex-shrink-0">
                  <div className="inline-block rounded-lg border-2 border-[#e8a870] bg-white p-6">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-4">
                        <Controller
                          name="profileImg"
                          render={({
                            field: { onChange, value, ...field },
                          }) => (
                            <Form.Item>
                              <Upload
                                listType="picture-card"
                                className="avatar-uploader rounded-full"
                                showUploadList={false}
                                beforeUpload={(file) => {
                                  onChange(file);
                                  return false;
                                }}
                                {...field}
                              >
                                {value ? (
                                  <img
                                    src={
                                      value instanceof File
                                        ? URL.createObjectURL(value)
                                        : value
                                    }
                                    alt="avatar"
                                    className="w-full h-full object-cover rounded-full"
                                  />
                                ) : (
                                  <div className="flex flex-col items-center justify-center h-full rounded-full">
                                    <img
                                      src={logo}
                                      alt="default avatar"
                                      className="w-full h-full object-cover rounded-full"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex flex-col items-center justify-center opacity-50 hover:opacity-100 transition-opacity">
                                      <div>
                                        <SwitchCamera className="text-white font-bold" />
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Upload>
                            </Form.Item>
                          )}
                        ></Controller>
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
                    <label className="mb-2 block text-sm text-gray-600">
                      Name
                    </label>
                    <BZInput
                      type="text"
                      name="name"
                      defaultValue={userData.name}
                      style={{
                        width: "100%", // Full width
                        borderRadius: "8px", // Rounded corners
                        border: "2px solid #e8a870", // Border with color
                        backgroundColor: "white", // White background
                        padding: "12px 16px", // Padding for input
                        color: "#4A4A4A", // Text color
                        fontSize: "16px", // Font size for input text
                        outline: "none", // Remove outline on focus
                        transition: "border 0.2s ease, box-shadow 0.2s ease", // Transition for border and shadow
                      }}
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="mb-2 block text-sm text-gray-600">
                      E-mail
                    </label>
                    <BZInput
                      type="text"
                      name="email"
                      defaultValue={userData.email}
                      style={{
                        width: "100%", // Full width
                        borderRadius: "8px", // Rounded corners
                        border: "2px solid #e8a870", // Border with color
                        backgroundColor: "white", // White background
                        padding: "12px 16px", // Padding for input
                        color: "#4A4A4A", // Text color
                        fontSize: "16px", // Font size for input text
                        outline: "none", // Remove outline on focus
                        transition: "border 0.2s ease, box-shadow 0.2s ease", // Transition for border and shadow
                      }}
                    />
                  </div>

                  {/* Phone Number Field */}
                  <div>
                    <label className="mb-2 block text-sm text-gray-600">
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-2 rounded-lg border-2 border-[#e8a870] bg-white px-4 py-2">
                        <span className="text-2xl">🇺🇸</span>
                        <span className="text-gray-800">
                          {userData.countryCode}
                        </span>
                      </div>
                      <BZInput
                        type="text"
                        name="phoneNumber"
                        defaultValue={userData.phoneNumber}
                        style={{
                          width: "100%", // Full width
                          borderRadius: "8px", // Rounded corners
                          border: "2px solid #e8a870", // Border with color
                          backgroundColor: "white", // White background
                          padding: "12px 16px", // Padding for input
                          color: "#4A4A4A", // Text color
                          fontSize: "16px", // Font size for input text
                          outline: "none", // Remove outline on focus
                          transition: "border 0.2s ease, box-shadow 0.2s ease", // Transition for border and shadow
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <Button
                  htmlType="submit"
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
                  className="rounded-full bg-[#e8a870] px-8 py-3 hover:bg-[#d99860]"
                >
                  Save Changes
                </Button>
              </div>
            </BZForm>
          </div>
        </div>
      </div>
    </div>
  );
}
