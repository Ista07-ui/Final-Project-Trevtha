"use client";

import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";
import { useEffect, useState } from "react";
import { categoryService, Category } from "@/lib/services/category";
import { useToast } from "@/hooks/useToast";
import { ToastContainer } from "@/components/Toast";

export default function ManageCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        toast.error("Failed to load categories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    setDeletingId(id);
    try {
      const success = await categoryService.deleteCategory(id);
      if (success) {
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
        toast.success("Category deleted successfully");
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AdminShell activeNav="categories">
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />
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
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-forest uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest/5">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <p className="text-charcoal/60 font-medium">
                      Loading categories...
                    </p>
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <p className="text-charcoal/60 font-medium">
                      No categories found
                    </p>
                  </td>
                </tr>
              ) : (
                categories.map((category, index) => (
                  <tr
                    key={category.id}
                    className="hover:bg-cream/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-charcoal/70 text-center font-medium">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-forest">
                      {category.name}
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className="h-12 w-12 rounded-lg bg-cover bg-center border border-forest/10"
                        style={{
                          backgroundImage: `url('${category.imageUrl}')`,
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          category.status === "active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-charcoal/10 text-charcoal/60"
                        }`}
                      >
                        {category.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/categories/${category.id}/edit`}
                          className="p-2 hover:bg-gold/10 hover:text-gold text-forest/40 rounded transition-all"
                        >
                          <span className="material-symbols-outlined text-lg">
                            edit_square
                          </span>
                        </Link>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          disabled={deletingId === category.id}
                          className="p-2 hover:bg-rose-500/10 hover:text-rose-500 text-forest/40 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="material-symbols-outlined text-lg">
                            {deletingId === category.id
                              ? "hourglass_empty"
                              : "delete"}
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
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
