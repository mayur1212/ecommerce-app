import { useProfile } from "../../context/ProfileContext";
import { X, Camera } from "lucide-react";
import { useEffect, useState } from "react";

export default function EditProfileModal() {
  const { user, isEditOpen, setIsEditOpen, updateProfile } = useProfile();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    location: "",
    avatar: null,
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  /* 🧠 Fill form */
  useEffect(() => {
    if (user && isEditOpen) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        mobile: user.mobile || "",
        location: user.location || "",
        avatar: null,
      });
      setPreview(user.avatar);
    }
  }, [user, isEditOpen]);

  if (!isEditOpen) return null;

  const handleSave = async () => {
    setLoading(true);
    await updateProfile(form);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl relative">

        {/* CLOSE */}
        <button
          onClick={() => setIsEditOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-center text-red-600 mb-5">
          Edit Profile
        </h2>

        {/* PROFILE IMAGE */}
        <div className="flex justify-center mb-5">
          <label className="relative cursor-pointer">
            <img
              src={preview || "/default-avatar.png"}
              alt="avatar"
              className="w-28 h-28 rounded-full object-cover border"
            />
            <div className="absolute bottom-1 right-1 bg-red-600 p-2 rounded-full text-white">
              <Camera size={16} />
            </div>

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setForm({ ...form, avatar: file });
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
          </label>
        </div>

        <div className="space-y-3">
          <Input label="First Name" value={form.firstName} onChange={(v) => setForm({ ...form, firstName: v })} />
          <Input label="Last Name" value={form.lastName} onChange={(v) => setForm({ ...form, lastName: v })} />
          <Input label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <Input label="Mobile" value={form.mobile} onChange={(v) => setForm({ ...form, mobile: v })} />
          <Input label="Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} />
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-6 w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

/* INPUT */
function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full px-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-red-500"
      />
    </div>
  );
}
