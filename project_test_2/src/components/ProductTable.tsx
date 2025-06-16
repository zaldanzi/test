import React from "react";

export const ProductTable = ({ products, loading, onEdit, onDelete }) => {
  if (loading) return <p>mohon tunggu</p>;
  if (products.length === 0) return <p>Tidak ada produk tersedia.</p>;

  return (
    <table className="w-full border mt-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2">ID</th>
          <th className="border px-4 py-2">Nama</th>
          <th className="border px-4 py-2">Kategori</th>
          <th className="border px-4 py-2">Stok</th>
          <th className="border px-4 py-2">Harga</th>
          <th className="border px-4 py-2">Deskripsi</th>
          <th className="border px-4 py-2">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td className="border px-4 py-2">{product.id}</td>
            <td className="border px-4 py-2">{product.name}</td>
            <td className="border px-4 py-2">{product.category}</td>
            <td className="border px-4 py-2">{product.stock}</td>
            <td className="border px-4 py-2">Rp{product.price.toLocaleString()}</td>
            <td className="border px-4 py-2">{product.description}</td>
            <td className="border px-4 py-2 space-x-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => onEdit(product)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => onDelete(product.id)}
              >
                Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
