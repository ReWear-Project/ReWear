import { useState } from "react";
import axios from "axios";
import { DateRange } from "react-date-range";
import { useNavigate } from "react-router-dom";

import {
  Upload,
  X,
  ImagePlus,
  Shirt,
} from "lucide-react";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const API = "http://localhost:5000/api";

const Sell = () => {
  const navigate = useNavigate();

  const [mode, setMode] =
    useState("both");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [form, setForm] =
    useState({
      title: "",
      category: "party",
      size: "M",
      price: "",
      rent: "",
      condition: "New",
    });

  const [images, setImages] =
    useState([]);

  const [dateRange, setDateRange] =
    useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);

  // USER
  const getUser = () =>
    JSON.parse(
      localStorage.getItem("user")
    );

  // INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

    setError("");
  };

  // IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const files = Array.from(
      e.target.files
    );

    files.forEach((file) => {
      const reader =
        new FileReader();

      reader.onloadend = () => {
        setImages((prev) =>
          [
            ...prev,
            reader.result,
          ].slice(0, 6)
        );
      };

      reader.readAsDataURL(file);
    });
  };

  // REMOVE IMAGE
  const handleRemoveImage = (
    index
  ) => {
    setImages((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    );
  };

  // SUBMIT
  const handleSubmit = async () => {
    const user = getUser();

    if (!user) {
      alert("Please login first");

      navigate("/login");

      return;
    }

    if (
      !form.title ||
      images.length === 0
    ) {
      setError(
        "Title and at least 1 image required"
      );

      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${API}/products`,
        {
          title: form.title,
          images,
          price: Number(
            form.price
          ),
          rent: Number(form.rent),
          mode,
          category:
            form.category,
          size: form.size,
          condition:
            form.condition,
          availability:
            dateRange,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert("Product Listed 🚀");

      navigate("/explore");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data
          ?.message ||
        "Failed to list product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8] py-8 sm:py-10">

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-3xl sm:text-4xl font-semibold text-[#2b2545]">
            List Your Product
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Upload your fashion item
            for sale or rent.
          </p>

        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* GRID */}
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">

          {/* LEFT */}
          <div className="space-y-6">

            {/* MODE */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

              <p className="text-sm font-medium text-gray-700 mb-4">
                Listing Type
              </p>

              <div className="flex bg-gray-100 rounded-xl p-1">

                {[
                  "sell",
                  "rent",
                  "both",
                ].map((m) => (
                  <button
                    key={m}

                    onClick={() =>
                      setMode(m)
                    }

                    className={`flex-1 py-3 rounded-lg text-sm font-medium capitalize transition ${mode === m
                        ? "bg-[#2b2545] text-white"
                        : "text-gray-500"
                      }`}
                  >
                    {m}
                  </button>
                ))}

              </div>

            </div>

            {/* UPLOAD */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

              <div className="flex items-center gap-2 mb-5">

                <ImagePlus
                  size={20}
                  className="text-[#2b2545]"
                />

                <h2 className="text-lg font-medium text-[#2b2545]">
                  Upload Photos
                </h2>

              </div>

              {/* DROPZONE */}
              <label className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#2b2545] transition">

                <Upload
                  size={28}
                  className="text-gray-400"
                />

                <p className="mt-4 text-sm font-medium text-gray-700">
                  Click to upload images
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Maximum 6 images
                </p>

                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={
                    handleImageUpload
                  }
                />

              </label>

              {/* PREVIEWS */}
              {images.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-5">

                  {images.map(
                    (img, i) => (
                      <div
                        key={i}
                        className="relative rounded-xl overflow-hidden border border-gray-100"
                      >

                        <img
                          src={img}
                          alt="preview"
                          className="w-full h-28 object-cover"
                        />

                        <button
                          onClick={() =>
                            handleRemoveImage(
                              i
                            )
                          }

                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center"
                        >
                          <X size={14} />
                        </button>

                      </div>
                    )
                  )}

                </div>
              )}

            </div>

            {/* DETAILS */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-5">

              <div>

                <label className="text-sm font-medium text-gray-700">
                  Product Title
                </label>

                <input
                  name="title"
                  placeholder="Off White Hoodie"

                  className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2b2545]"

                  onChange={
                    handleChange
                  }
                />

              </div>

              {/* GRID */}
              <div className="grid sm:grid-cols-3 gap-4">

                {/* CATEGORY */}
                <div>

                  <label className="text-sm font-medium text-gray-700">
                    Category
                  </label>

                  <select
                    value={
                      form.category
                    }

                    onChange={(e) =>
                      setForm({
                        ...form,
                        category:
                          e.target.value.toLowerCase(),
                      })
                    }

                    className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none"
                  >
                    <option value="wedding">
                      Wedding
                    </option>

                    <option value="party">
                      Party
                    </option>

                    <option value="ethnic">
                      Ethnic
                    </option>

                    <option value="casual">
                      Casual
                    </option>

                  </select>

                </div>

                {/* SIZE */}
                <div>

                  <label className="text-sm font-medium text-gray-700">
                    Size
                  </label>

                  <select
                    name="size"

                    onChange={
                      handleChange
                    }

                    className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none"
                  >
                    <option value="S">
                      S
                    </option>

                    <option value="M">
                      M
                    </option>

                    <option value="L">
                      L
                    </option>

                    <option value="XL">
                      XL
                    </option>

                    <option value="XXL">
                      XXL
                    </option>

                  </select>

                </div>

                {/* CONDITION */}
                <div>

                  <label className="text-sm font-medium text-gray-700">
                    Condition
                  </label>

                  <select
                    name="condition"

                    value={
                      form.condition
                    }

                    onChange={
                      handleChange
                    }

                    className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none"
                  >
                    <option value="New">
                      New
                    </option>

                    <option value="Like New">
                      Like New
                    </option>

                    <option value="Good">
                      Good
                    </option>

                    <option value="Used">
                      Used
                    </option>

                  </select>

                </div>

              </div>

            </div>

            {/* SELL */}
            {(mode === "sell" ||
              mode === "both" ||
              mode === "sale") && (
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

                  <label className="text-sm font-medium text-gray-700">
                    Selling Price
                  </label>

                  <input
                    name="price"
                    placeholder="₹ 2500"

                    className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2b2545]"

                    onChange={
                      handleChange
                    }
                  />

                </div>
              )}

            {/* RENT */}
            {(mode === "rent" ||
              mode === "both") && (
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

                  <label className="text-sm font-medium text-gray-700">
                    Rent Per Day
                  </label>

                  <input
                    name="rent"
                    placeholder="₹ 300"

                    className="w-full mt-2 mb-5 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2b2545]"

                    onChange={
                      handleChange
                    }
                  />

                  {/* CALENDAR */}
                  <div className="border border-gray-200 rounded-2xl overflow-hidden">

                    <DateRange
                      ranges={dateRange}

                      onChange={(
                        item
                      ) =>
                        setDateRange([
                          item.selection,
                        ])
                      }
                    />

                  </div>

                </div>
              )}

            {/* SUBMIT */}
            <button
              disabled={loading}

              onClick={handleSubmit}

              className="w-full bg-[#2b2545] text-white py-4 rounded-xl font-medium hover:opacity-95 transition shadow-sm"
            >
              {loading
                ? "Listing Product..."
                : "List Product"}
            </button>

          </div>

          {/* RIGHT */}
          <div className="lg:sticky lg:top-24">

            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

              <div className="flex items-center gap-2 mb-5">

                <Shirt
                  size={20}
                  className="text-[#2b2545]"
                />

                <h2 className="text-lg font-medium text-[#2b2545]">
                  Live Preview
                </h2>

              </div>

              {/* CARD */}
              <div className="border border-gray-100 rounded-2xl overflow-hidden">

                <img
                  src={
                    images[0] ||
                    "https://via.placeholder.com/400x500?text=Preview"
                  }

                  alt="preview"

                  className="w-full h-[400px] object-cover bg-gray-100"
                />

                <div className="p-5">

                  <h3 className="text-xl font-medium text-[#2b2545]">
                    {form.title ||
                      "Product Title"}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500 capitalize">
                    {form.category} •{" "}
                    {form.size}
                  </p>

                  <div className="mt-5 flex items-center justify-between">

                    <div>

                      <p className="text-sm text-gray-500">
                        Price
                      </p>

                      <p className="text-2xl font-semibold text-[#2b2545]">
                        ₹{" "}
                        {form.price ||
                          form.rent ||
                          0}
                      </p>

                    </div>

                    <div className="px-3 py-1.5 rounded-full bg-gray-100 text-xs font-medium text-gray-700">
                      {form.condition}
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Sell;