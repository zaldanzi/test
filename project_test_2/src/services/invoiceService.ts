import axios from "axios";

export interface InvoiceInput {
  productId: string;
  customPrice: number;
  invoiceDate: string; // ISO format
}

export interface Invoice {
  id: string;
  productId: string;
  productName?: string;
  customPrice: number;
  invoiceDate: string;
}

const API_URL = "/api/invoices";

export const getInvoices = async (): Promise<Invoice[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createInvoice = async (data: InvoiceInput): Promise<Invoice> => {
  const response = await axios.post(API_URL, data);
  return response.data;
};
