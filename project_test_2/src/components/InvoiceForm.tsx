import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

const schema = z.object({
  productId: z.string().min(1, "Produk harus dipilih"),
  customPrice: z.number().min(0, "Harga tidak boleh negatif"),
  invoiceDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Tanggal tidak valid",
  }),
});

export const InvoiceForm = ({ products, onSubmit, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      productId: "",
      customPrice: 0,
      invoiceDate: format(new Date(), "yyyy-MM-dd"),
    },
  });

  const submit = (data) => {
    onSubmit({
      ...data,
      customPrice: Number(data.customPrice),
      invoiceDate: new Date(data.invoiceDate).toISOString(),
    });
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-md max-w-md mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">Buat Invoice</h2>
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <div>
          <label className="block mb-1">Produk</label>
          <select {...register("productId")} className="w-full border px-3 py-2 rounded">
            <option value="">-- Pilih Produk --</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} - Rp{product.price}
              </option>
            ))}
          </select>
          {errors.productId && <p className="text-red-500 text-sm">{errors.productId.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Harga Custom</label>
          <input
            type="number"
            {...register("customPrice", { valueAsNumber: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.customPrice && <p className="text-red-500 text-sm">{errors.customPrice.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Tanggal Invoice</label>
          <input
            type="date"
            {...register("invoiceDate")}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.invoiceDate && <p className="text-red-500 text-sm">{errors.invoiceDate.message}</p>}
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
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Simpan Invoice
          </button>
        </div>
      </form>
    </div>
  );
};
