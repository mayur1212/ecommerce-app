import { useProfile } from "../../context/ProfileContext";
import { X, Camera } from "lucide-react";
import { useEffect, useState } from "react";

export default function EditProfileModal() {
  const { user, isEditOpen, setIsEditOpen, updateProfile } = useProfile();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    avatar: null,
    socials: {},
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && isEditOpen) {
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        mobile: user.mobile,
        city: user.city,
        state: user.state,
        country: user.country,
        pincode: user.pincode,
        avatar: null,
        socials: user.socials,
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
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl relative">
        <button onClick={() => setIsEditOpen(false)} className="absolute top-4 right-4">
          <X />
        </button>

        <h2 className="text-xl font-bold text-center mb-5">Edit Profile</h2>

        {/* IMAGE */}
        <label className="flex justify-center mb-5 cursor-pointer">
          <img src={preview} className="w-28 h-28 rounded-full object-cover" />
          <input
            type="file"
            hidden
            onChange={(e) => {
              const f = e.target.files[0];
              setForm({ ...form, avatar: f });
              setPreview(URL.createObjectURL(f));
            }}
          />
        </label>

        <Input label="First Name" value={form.firstName} onChange={(v) => setForm({ ...form, firstName: v })} />
        <Input label="Last Name" value={form.lastName} onChange={(v) => setForm({ ...form, lastName: v })} />
        <Input label="Mobile" value={form.mobile} onChange={(v) => setForm({ ...form, mobile: v })} />
        <Input label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
        <Input label="State" value={form.state} onChange={(v) => setForm({ ...form, state: v })} />
        <Input label="Country" value={form.country} onChange={(v) => setForm({ ...form, country: v })} />
        <Input label="Pincode" value={form.pincode} onChange={(v) => setForm({ ...form, pincode: v })} />

        <button
          onClick={handleSave}
          className="mt-6 w-full bg-red-600 text-white py-3 rounded-xl"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div className="mt-3">
      <label className="text-sm">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border px-3 py-2 rounded-lg"
      />
    </div>
  );
}
