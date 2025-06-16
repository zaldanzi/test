import React from "react";
import { useForm } from "react-hook-form";

export const ProductForm = ({ initialData, onSubmit, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      name: "",
      category: "",
      stock: 0,
      price: 0,
      description: "",
    },
  });

  const submit = (data) => {
    data.stock = parseInt(data.stock);
    data.price = parseFloat(data.price);
    onSubmit(data);
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-md max-w-md mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? "Edit Produk" : "Tambah Produk"}
      </h2>
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <div>
          <label className="block mb-1">Nama Produk</label>
          <input
            type="text"
            {...register("name", { required: "Nama wajib diisi" })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Kategori</label>
          <input
            type="text"
            {...register("category", { required: "Kategori wajib diisi" })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Stok</label>
          <input
            type="number"
            {...register("stock", { valueAsNumber: true, min: 0 })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Harga</label>
          <input
            type="number"
            {...register("price", { valueAsNumber: true, min: 0 })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Deskripsi</label>
          <textarea
            {...register("description")}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};
