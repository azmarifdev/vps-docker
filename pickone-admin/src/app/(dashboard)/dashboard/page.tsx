"use client";
import {
    FaPencilAlt,
    FaLock,
    FaCalendarAlt,
    FaEnvelope,
    FaShieldAlt,
} from "react-icons/fa";
import {useAppSelector} from "@/redux/hooks";
import Image from "next/image";
import {TbLogout} from "react-icons/tb";
import {logout} from "@/redux/features/authSlice";
import {useLogoutMutation} from "@/redux/api/authApi";
import {useRouter} from "next/navigation";
import UpdateProfileModal from "./UpdateProfileModal";
import ChangePasswordModal from "./ChangePasswordModal";
import {useState} from "react";

const UserProfile = () => {
    const user = useAppSelector((state) => state.auth.user);
    const [isUpdateProfileModalOpen, setIsUpdateProfileModalOpen] =
        useState(false);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
        useState(false);

    // Get initials for avatar fallback
    const getInitials = (name: string): string => {
        return name
            ?.split(" ")
            ?.map((n: string) => n?.[0])
            ?.join("")
            ?.toUpperCase();
    };

    const [logoutMutation] = useLogoutMutation();

    const router = useRouter();

    const handleLogout = async () => {
        await logoutMutation({});
        logout();
        router.push("/login");
    };

    // Format date to be more readable
    const formatDate = (dateString: string): string => {
        return new Date(dateString)?.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
            {/* Profile Header with Background */}
            <div className="h-28 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
                {/* Avatar - Positioned to overlap the header and content */}
                <div className="absolute -bottom-16 left-8 md:left-12">
                    <div className="p-1 bg-white rounded-full shadow-lg">
                        {user?.profile_image ? (
                            <Image
                                src={user?.profile_image || "/placeholder.svg"}
                                alt={user?.name}
                                width={100}
                                height={100}
                                className="w-32 h-32 rounded-full object-cover border-4 border-white"
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-3xl font-bold text-gray-700 border-4 border-white">
                                {getInitials(user?.name)}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Section with spacing for the avatar */}
            <div className="pt-20 px-6 pb-10  md:px-12">
                {/* User Info Section */}
                <div className="md:pl-40 md:-mt-16">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {user?.name}
                            </h2>
                            <div className="flex items-center mt-1 text-gray-500">
                                <FaShieldAlt className="w-4 h-4 mr-1" />
                                <span className="capitalize">{user?.role}</span>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300">
                            Logout
                            <TbLogout
                                size={20}
                                className="ml-2 font-semibold"
                            />
                        </button>
                    </div>

                    {/* User Info Grid */}
                    <div className="mt-6 space-y-4">
                        {/* Email */}
                        <div className="flex items-start">
                            <div className="bg-blue-100 p-2 rounded-lg mr-4">
                                <FaEnvelope className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Email Address
                                </p>
                                <p className="text-base font-medium text-gray-900">
                                    {user?.email}
                                </p>
                            </div>
                        </div>

                        {/* Member Since */}
                        <div className="flex items-start">
                            <div className="bg-green-100 p-2 rounded-lg mr-4">
                                <FaCalendarAlt className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Member Since
                                </p>
                                <p className="text-base font-medium text-gray-900">
                                    {formatDate(user?.createdAt)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <button
                            onClick={() => setIsUpdateProfileModalOpen(true)}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300">
                            <FaPencilAlt className="h-4 w-4" />
                            Update Profile
                        </button>
                        <button
                            onClick={() => setIsChangePasswordModalOpen(true)}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300">
                            <FaLock className="h-4 w-4" />
                            Change Password
                        </button>
                    </div>
                </div>
            </div>

            {isUpdateProfileModalOpen && (
                <UpdateProfileModal
                    isOpen={isUpdateProfileModalOpen}
                    setIsOpen={setIsUpdateProfileModalOpen}
                    userData={user}
                />
            )}
            {isChangePasswordModalOpen && (
                <ChangePasswordModal
                    isOpen={isChangePasswordModalOpen}
                    setIsOpen={setIsChangePasswordModalOpen}
                />
            )}
        </div>
    );
};

export default UserProfile;
