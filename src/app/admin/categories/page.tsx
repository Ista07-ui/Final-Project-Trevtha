"use client";

import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";
import { useState } from "react";
import {
  deleteStoredAdminRecord,
  getStoredValue,
  useStoredAdminRecords,
} from "@/hooks/admin/useStoredAdminRecords";

const categories = [
  {
    id: 1,
    name: "Beach",
    count: "12 Activities",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDwb_LtgTg7IvUJI3Hcpem9eUgJfxxz_eszR5O0o7O4u6jO9Hvc-CStYL8CRaBhMPpYaGXOrdYZZcZByQjE1UBnmnXhF6ecoC4OC2l6cV_OzTDIADlJwFkM__yCANzPo5KofbXPfia2AZoq47iBNML_eUDSDFz7i7ah6FtyHAX8eOPDO1v-1TLmH7Vvd0SeW3INu2_0o0n7LNR6SlEoGdxhDzdEV1A0e-kYT7um-3-42CcVSNiNNau52S1rbSIQztlfmuSrkpt8SWTa",
  },
  {
    id: 2,
    name: "Mountain",
    count: "8 Activities",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC1N2BGpHgKsJ6KVoHGvsggVNaEhu-r3tZ-V8zxbZFUQYvCz9pVc2LUqaMPcXmcU8SA6rCQAz1Dsc1L24LuABcEV8MQPnkmUkxHjOp4cvXIvvHxr8zfPPEyYJHAhzHUsS-MCKjBzCoKV-HFNsroj5Ye5mpTtX-VkMsAPXRGH15PEOYf9qRZLubfYMg7bRmO2Xyfy3QExFuLyDUPAbTmPdNGe6clWVUujP_0tdOAiH0IILa9G1yeWT4eBNQBKVCUkkofde63N3--QFwP",
  },
  {
    id: 3,
    name: "Cultural",
    count: "15 Activities",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBbSuts63WH0VETBQl2P61e4MMFRnjZKaFQGjuE2_TBqg0XljpItg9t3nKn9YQTEtR76cAOlY6VpjtKF23UkM9t20IMVUeo8yhbdmOe9ZB2mzGq_plED_pDHw0xSMkZIDPyxM0f4xDV7LcDPk90ZkqX3hf7XpPK_YSEHm2tuIZjfc2DOGbxwrRe59lJ7eR1biVT_2LhEHGTPBGmMV4eGZoOba_Jhspx80rHczKbv2OGMkUx4opvIvCO5Hm2h9ZihiDSw8HRT3TUOADv",
  },
  {
    id: 4,
    name: "City Tour",
    count: "10 Activities",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA2mFZzNcejE4KSZ_0oSL0n1qruXE6wSjF1ZQcG4hXB59mJO2QdzILLMzWwZak_peMoCZshFNJwrrV9Uri8OFKOvVkoNpI6I0OkrYkIhaHaQTKpnVPqnu7vLKsgwfMtAtUmmc2LAQBPa4zgoRL42-Z0Uo6Ln8aU5GX5RwyIum5aA7xke1bWxKLc8nmHllm9Ce8VpHNzy0cZ-YnLUHIB9a2GvHD5hOHHJJe5cB78lufTdnzlkdlmnjKYk2-Z33_qOkoX1TTImz8FRZhW",
  },
];

export default function ManageCategoriesPage() {
  const [deleteKey, setDeleteKey] = useState(0);
  const storedRecords = useStoredAdminRecords("categories");

  const handleDeleteRecord = (formId: string) => {
    deleteStoredAdminRecord("categories", formId);
    setDeleteKey((prev) => prev + 1);
  };

  return (
    <AdminShell activeNav="categories">
      <div className="flex-1 overflow-auto p-8">
        <div className="bg-white rounded-xl shadow-sm border border-forest/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-forest/10 flex items-center justify-between">
            <h3 className="text-xl font-bold text-forest">
              Category Management
            </h3>
            <Link
              href="/admin/categories/new"
              className="bg-gold hover:bg-gold/90 text-forest px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">add</span>Add
              New Category
            </Link>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-forest/[0.02] border-b border-forest/10">
                <th className="px-6 py-4 text-xs font-bold text-forest uppercase tracking-wider w-16 text-center">
                  No
                </th>
                <th className="px-6 py-4 text-xs font-bold text-forest uppercase tracking-wider">
                  Category Name
                </th>
                <th className="px-6 py-4 text-xs font-bold text-forest uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-4 text-xs font-bold text-forest uppercase tracking-wider">
                  Activity Count
                </th>
                <th className="px-6 py-4 text-xs font-bold text-forest uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest/5">
              {storedRecords.map((record, index) => (
                <tr
                  key={`stored-${record.id}`}
                  className="hover:bg-cream/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-charcoal/70 text-center font-medium">
                    C{index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-forest">
                    {getStoredValue(record.values, ["category_name"])}
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-10 w-16 rounded-lg bg-cream overflow-hidden border border-forest/5 flex items-center justify-center text-[10px] font-bold text-forest/60">
                      Custom
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-forest/10 text-forest">
                      New Category
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      href={`/admin/categories/${record.formId}/edit`}
                      className="p-2 text-charcoal/40 hover:text-gold transition-colors"
                    >
                      <span className="material-symbols-outlined text-xl">
                        edit
                      </span>
                    </Link>
                    <button
                      onClick={() => handleDeleteRecord(record.formId)}
                      className="p-2 text-charcoal/40 hover:text-rose-500 transition-colors"
                    >
                      <span className="material-symbols-outlined text-xl">
                        delete
                      </span>
                    </button>
                  </td>
                </tr>
              ))}

              {categories.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-cream/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-charcoal/70 text-center font-medium">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-forest">
                    {item.name}
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className="h-10 w-16 rounded-lg bg-cream overflow-hidden border border-forest/5 bg-cover bg-center"
                      style={{ backgroundImage: `url('${item.image}')` }}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-forest/10 text-forest">
                      {item.count}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      href={`/admin/categories/${item.id}/edit`}
                      className="p-2 text-charcoal/40 hover:text-gold transition-colors"
                    >
                      <span className="material-symbols-outlined text-xl">
                        edit
                      </span>
                    </Link>
                    <button className="p-2 text-charcoal/40 hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined text-xl">
                        delete
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-6 py-4 bg-forest/[0.02] border-t border-forest/10 flex items-center justify-between">
            <p className="text-sm text-charcoal/50">
              Showing 1 to 4 of 24 entries
            </p>
            <div className="flex items-center gap-1">
              <button className="p-2 text-charcoal/40 hover:text-forest">
                <span className="material-symbols-outlined text-lg">
                  chevron_left
                </span>
              </button>
              <button className="h-8 w-8 rounded-lg bg-gold text-forest font-bold text-sm">
                1
              </button>
              <button className="h-8 w-8 rounded-lg hover:bg-forest/5 text-charcoal font-medium text-sm">
                2
              </button>
              <button className="h-8 w-8 rounded-lg hover:bg-forest/5 text-charcoal font-medium text-sm">
                3
              </button>
              <span className="px-2 text-charcoal/30">...</span>
              <button className="h-8 w-8 rounded-lg hover:bg-forest/5 text-charcoal font-medium text-sm">
                6
              </button>
              <button className="p-2 text-charcoal/40 hover:text-forest">
                <span className="material-symbols-outlined text-lg">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
