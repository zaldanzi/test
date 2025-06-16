import { useEffect, useState } from "react";
import { getInvoices } from "services/invoiceService";
import { format } from "date-fns";
import Link from "next/link";

export default function InvoiceListPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await getInvoices();
        setInvoices(data);
      } catch (err) {
        console.error("Gagal mengambil data invoice", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Invoice</h1>
      <Link href="/">
        <span className="text-blue-600 hover:underline">← Kembali ke Dashboard</span>
      </Link>

      {loading ? (
        <p className="mt-4">Memuat data...</p>
      ) : invoices.length === 0 ? (
        <p className="mt-4">Belum ada invoice.</p>
      ) : (
        <table className="mt-6 w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">Produk</th>
              <th className="border px-4 py-2 text-left">Harga Custom</th>
              <th className="border px-4 py-2 text-left">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="border px-4 py-2">{invoice.id}</td>
                <td className="border px-4 py-2">{invoice.productName || invoice.product?.name}</td>
                <td className="border px-4 py-2">Rp{invoice.customPrice.toLocaleString()}</td>
                <td className="border px-4 py-2">
                  {format(new Date(invoice.invoiceDate), "dd MMM yyyy")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
