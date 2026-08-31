import { useEffect, useState } from "react";

interface ProfileData {
    adminId: string;
    username: string;
    IsActive: boolean;
    IsDisplay: boolean;
    CreatedAt: string;
}

function Profile() {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error", message: string } | null>(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            // Adjust the URL based on your API prefix (e.g., /api/admin/profile)
            const res = await fetch("http://localhost:5000/api/admin/profile");
            const data = await res.json();
            if (data.success) {
                setProfile(data.data);
                setFormData(prev => ({ ...prev, username: data.data.username }));
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaveStatus(null);
        try {
            const payload: any = { username: formData.username };
            if (formData.password) {
                payload.password = formData.password;
            }

            const res = await fetch("http://localhost:5000/api/admin/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();

            if (data.success) {
                setProfile(data.data);
                setIsEditing(false);
                setFormData(prev => ({ ...prev, password: "" })); // clear password field
                setSaveStatus({ type: "success", message: "Profile updated successfully!" });
                setTimeout(() => setSaveStatus(null), 3000);
            } else {
                setSaveStatus({ type: "error", message: data.message || "Failed to update profile" });
            }
        } catch (error: any) {
            setSaveStatus({ type: "error", message: error.message || "An error occurred" });
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 flex justify-center items-center">
                <div className="text-slate-500">Loading profile...</div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        My Profile
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Manage your admin account details and credentials.
                    </p>
                </div>

                {saveStatus && (
                    <div className={`mb-6 p-4 rounded-xl border ${saveStatus.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                        {saveStatus.message}
                    </div>
                )}

                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                    <div className="p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl text-blue-600">
                                👤
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">{profile?.username || 'Admin'}</h2>
                                <p className="text-sm text-slate-500">Administrator</p>
                            </div>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-6 max-w-md">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    disabled={!isEditing}
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500"
                                />
                            </div>

                            {isEditing && (
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Leave blank to keep current password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            )}

                            <div className="pt-4 flex gap-3">
                                {isEditing ? (
                                    <>
                                        <button
                                            type="submit"
                                            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsEditing(false);
                                                setFormData({ username: profile?.username || "", password: "" });
                                            }}
                                            className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(true)}
                                        className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="bg-slate-50 border-t border-slate-100 p-6 sm:p-8">
                        <h3 className="text-sm font-semibold text-slate-900 mb-4">Account Information</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="block text-slate-500">Admin ID</span>
                                <span className="block font-medium text-slate-900 mt-1">{profile?.adminId || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="block text-slate-500">Member Since</span>
                                <span className="block font-medium text-slate-900 mt-1">
                                    {profile?.CreatedAt ? new Date(profile.CreatedAt).toLocaleDateString() : 'N/A'}
                                </span>
                            </div>
                            <div>
                                <span className="block text-slate-500">Status</span>
                                <span className="inline-flex items-center gap-1.5 font-medium text-slate-900 mt-1">
                                    <span className={`h-2 w-2 rounded-full ${profile?.IsActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    {profile?.IsActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Profile;