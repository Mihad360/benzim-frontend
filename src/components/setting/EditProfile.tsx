import { Button, Form, Upload } from "antd";
import BZForm from "../../forms/BZForm";
import BZInput from "../../forms/BZInput";
import { Controller, type FieldValues } from "react-hook-form";
import logo from "../../assets/Logo.jpg";
import { SwitchCamera } from "lucide-react";
import {
  useEditProfileMutation,
  useGetMeQuery,
} from "../../services/redux/api/usersApi";
import Loading from "../loading/Loading";
import Swal from "sweetalert2";
import { toast } from "sonner";

export default function EditProfile() {
  const { data: userData, isLoading } = useGetMeQuery(undefined);
  const [editProfile] = useEditProfileMutation();
  const me = userData?.data || {};

  const onSubmit = async (datas: FieldValues) => {
    console.log(datas);
    // Show confirmation dialog first
    const result = await Swal.fire({
      title: "Edit profile?",
      text: "This action will approve the update.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Save",
    });

    if (!result.isConfirmed) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { email, profileImage, ...otherData } = datas;

    console.log("Form data:", datas);
    console.log("Other data:", otherData);
    console.log("Profile image:", profileImage);

    // ✅ Build FormData
    const formData = new FormData();

    // Append other data fields as JSON string in 'data' field
    formData.append("data", JSON.stringify(otherData));

    // Append image ONLY if it's a File
    if (profileImage instanceof File) {
      formData.append("image", profileImage);
    }
    // Log FormData contents
    console.log("📦 FormData contents:");
    // eslint-disable-next-line prefer-const
    for (let [key, value] of formData.entries()) {
      console.log(`  ${key}:`, value);
    }
    try {
      const res = await editProfile(formData);

      console.log("Response:", res.data);

      if (res.data?.success) {
        toast.success("Profile edited successfully", { duration: 3000 });
      } else {
        toast.error(res.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Edit profile error:", error);
      toast.error("Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

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
            <BZForm
              onSubmit={onSubmit}
              defaultValues={{
                name: me?.name,
                email: me?.email,
                phoneNumber: me?.phoneNumber,
                // profileImg: me?.profileImage,
              }}
            >
              <div className="flex gap-8">
                {/* Profile Section */}
                <div className="flex-shrink-0">
                  <div className="inline-block rounded-lg border-2 border-[#e8a870] bg-white p-6">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-4">
                        <Controller
                          name="profileImage"
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
                                      src={me.profileImage}
                                      alt={logo}
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
                      // defaultValue={me.name}
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
                      name="email"
                      type="text"
                      // value={me.email}
                      readOnly
                      disabled
                      // defaultValue={me.email}
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
                        <span className="text-2xl">CH</span>
                        <span className="text-gray-800">+41</span>
                      </div>
                      <BZInput
                        type="text"
                        name="phoneNumber"
                        // defaultValue={me.phoneNumber}
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
