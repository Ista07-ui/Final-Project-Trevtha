"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { useToast } from "@/hooks/useToast";
import { bannerService } from "@/lib/services/banner";
import { categoryService } from "@/lib/services/category";
import activityService from "@/lib/services/activity";
import promoService from "@/lib/services/promo";
import {
  getStoredRecordByFormId,
  upsertStoredAdminRecord,
} from "@/hooks/admin/useStoredAdminRecords";

type AdminNavKey =
  | "dashboard"
  | "banners"
  | "categories"
  | "activities"
  | "promos"
  | "payments"
  | "transactions"
  | "users";

type Field = {
  readonly label: string;
  readonly placeholder?: string;
  readonly type?: "text" | "number" | "date";
  readonly textarea?: boolean;
  readonly options?: readonly string[];
  readonly required?: boolean;
};

type AdminCrudFormProps = {
  readonly activeNav: AdminNavKey;
  readonly title: string;
  readonly subtitle: string;
  readonly backHref: string;
  readonly saveLabel: string;
  readonly fields: readonly Field[];
};

const toFieldKey = (label: string) =>
  label
    .toLowerCase()
    .trim()
    .split(" ")
    .filter(Boolean)
    .join("_")
    .split("/")
    .join("_");

export default function AdminCrudForm({
  activeNav,
  title,
  subtitle,
  backHref,
  saveLabel,
  fields,
}: Readonly<AdminCrudFormProps>) {
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToast();

  const section = useMemo(() => {
    const parts = backHref.split("/").filter(Boolean);
    return parts.at(-1) ?? "admin";
  }, [backHref]);

  const mode: "new" | "edit" = title.toLowerCase().includes("edit")
    ? "edit"
    : "new";

  const formId = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.at(-1) === "edit") {
      return parts.at(-2) ?? "unknown";
    }
    return "new";
  }, [pathname]);

  const initialValues = useMemo(() => {
    const values: Record<string, string> = {};
    for (const field of fields) {
      const key = toFieldKey(field.label);
      values[key] = field.options?.[0] ?? "";
    }
    return values;
  }, [fields]);

  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "saved" | "failed">("idle");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (mode !== "edit") {
      // Reset form when switching to create mode
      setValues(initialValues);
      setErrors({});
      setStatus("idle");
      return;
    }

    // In edit mode, try to load the record and merge with initial values
    const record = getStoredRecordByFormId(section, formId);
    if (!record) {
      setValues(initialValues);
      setErrors({});
      setStatus("idle");
      return;
    }

    setValues((prev) => ({
      ...prev,
      ...record.values,
    }));
  }, [initialValues, mode, section, formId]);

  const updateValue = (fieldKey: string, fieldValue: string) => {
    setValues((prev) => ({
      ...prev,
      [fieldKey]: fieldValue,
    }));
  };

  const submitForm = async () => {
    const nextErrors: Record<string, string> = {};

    for (const field of fields) {
      const key = toFieldKey(field.label);
      const value = values[key]?.trim();
      const isRequired = field.required ?? true;

      if (isRequired && !value) {
        nextErrors[key] = `${field.label} is required.`;
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("failed");
      return;
    }

    setIsLoading(true);

    try {
      // Handle Banner API
      if (section === "banners") {
        const bannerData = {
          name: values["name"] || "",
          imageUrl: values["image_url"] || "",
        };

        if (mode === "new") {
          const result = await bannerService.createBanner(bannerData);
          if (result) {
            toast.success("Banner created successfully!");
            setTimeout(() => {
              setIsLoading(false);
              router.push("/admin/banners");
            }, 1000);
            return;
          } else {
            setIsLoading(false);
            setStatus("failed");
            toast.error("Failed to create banner");
            return;
          }
        } else {
          // Edit mode
          const result = await bannerService.updateBanner(formId, bannerData);
          if (result) {
            toast.success("Banner updated successfully!");
            setTimeout(() => {
              setIsLoading(false);
              router.push("/admin/banners");
            }, 1000);
            return;
          } else {
            setIsLoading(false);
            setStatus("failed");
            toast.error("Failed to update banner");
            return;
          }
        }
      }

      // Handle Category API
      if (section === "categories") {
        const categoryData = {
          name: values["name"] || "",
          imageUrl: values["image_url"] || "",
        };

        if (mode === "new") {
          const result = await categoryService.createCategory(categoryData);
          if (result) {
            toast.success("Category created successfully!");
            setTimeout(() => {
              setIsLoading(false);
              router.push("/admin/categories");
            }, 1000);
            return;
          } else {
            setIsLoading(false);
            setStatus("failed");
            toast.error("Failed to create category");
            return;
          }
        } else {
          // Edit mode
          const result = await categoryService.updateCategory(
            formId,
            categoryData,
          );
          if (result) {
            toast.success("Category updated successfully!");
            setTimeout(() => {
              setIsLoading(false);
              router.push("/admin/categories");
            }, 1000);
            return;
          } else {
            setIsLoading(false);
            setStatus("failed");
            toast.error("Failed to update category");
            return;
          }
        }
      }

      // Handle Activity API
      if (section === "activities") {
        const activityData = {
          categoryId: values["category_id"] || "",
          title: values["title"] || "",
          description: values["description"] || "",
          imageUrls: values["image_urls"]
            ? values["image_urls"].split(",").map((url) => url.trim())
            : [],
          price: parseFloat(values["price"] || "0"),
          price_discount: values["price_discount"]
            ? parseFloat(values["price_discount"])
            : undefined,
          facilities: values["facilities"] || undefined,
          address: values["address"] || "",
          province: values["province"] || "",
          city: values["city"] || "",
          location_maps: values["location_maps"] || undefined,
        };

        if (mode === "new") {
          const result = await activityService.createActivity(activityData);
          if (result) {
            toast.success("Activity created successfully!");
            setTimeout(() => {
              setIsLoading(false);
              router.push("/admin/activities");
            }, 1000);
            return;
          } else {
            setIsLoading(false);
            setStatus("failed");
            toast.error("Failed to create activity");
            return;
          }
        } else {
          // Edit mode
          const result = await activityService.updateActivity(
            formId,
            activityData,
          );
          if (result) {
            toast.success("Activity updated successfully!");
            setTimeout(() => {
              setIsLoading(false);
              router.push("/admin/activities");
            }, 1000);
            return;
          } else {
            setIsLoading(false);
            setStatus("failed");
            toast.error("Failed to update activity");
            return;
          }
        }
      }

      // Handle Promo API
      if (section === "promos") {
        const promoData = {
          title: values["title"] || "",
          description: values["description"] || "",
          imageUrl: values["image_url"] || "",
          terms_condition: values["terms_condition"] || "",
          promo_code: values["promo_code"] || "",
          promo_discount_price: parseFloat(
            values["promo_discount_price"] || "0",
          ),
          minimum_claim_price: parseFloat(values["minimum_claim_price"] || "0"),
        };

        if (mode === "new") {
          const result = await promoService.createPromo(promoData);
          if (result) {
            toast.success("Promo created successfully!");
            setTimeout(() => {
              setIsLoading(false);
              router.push("/admin/promos");
            }, 1000);
            return;
          } else {
            setIsLoading(false);
            setStatus("failed");
            toast.error("Failed to create promo");
            return;
          }
        } else {
          // Edit mode
          const result = await promoService.updatePromo(formId, promoData);
          if (result) {
            toast.success("Promo updated successfully!");
            setTimeout(() => {
              setIsLoading(false);
              router.push("/admin/promos");
            }, 1000);
            return;
          } else {
            setIsLoading(false);
            setStatus("failed");
            toast.error("Failed to update promo");
            return;
          }
        }
      }

      // Fallback to localStorage untuk section lain
      const generatedId =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2);
      const resolvedFormId = mode === "edit" ? formId : generatedId;

      upsertStoredAdminRecord({
        id: `${section}-${resolvedFormId}`,
        section,
        formId: resolvedFormId,
        mode,
        values,
        savedAt: new Date().toISOString(),
      });

      setErrors({});
      setStatus("saved");
      setIsLoading(false);
    } catch (error) {
      console.error("Submit error:", error);
      setStatus("failed");
      setIsLoading(false);
      toast.error("An error occurred");
    }
  };

  const renderInputField = (field: Field, key: string, value: string) => {
    const commonClass =
      "w-full rounded-lg border border-forest/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40";

    if (field.options) {
      return (
        <select
          value={value}
          onChange={(event) => updateValue(key, event.target.value)}
          className={`${commonClass} bg-white`}
        >
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    if (field.textarea) {
      return (
        <textarea
          rows={4}
          value={value}
          onChange={(event) => updateValue(key, event.target.value)}
          placeholder={field.placeholder}
          className={commonClass}
        />
      );
    }

    return (
      <input
        type={field.type ?? "text"}
        value={value}
        onChange={(event) => updateValue(key, event.target.value)}
        placeholder={field.placeholder}
        className={commonClass}
      />
    );
  };

  return (
    <AdminShell activeNav={activeNav}>
      <div className="p-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-forest tracking-tight">
              {title}
            </h2>
            <p className="text-charcoal/60 mt-2">{subtitle}</p>
          </div>
          <Link
            href={backHref}
            className="px-4 py-2 rounded-lg border border-forest/10 text-forest hover:bg-forest/5 font-semibold"
          >
            Back to list
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-forest/10 shadow-sm p-6 md:p-8">
          <form
            className="space-y-6"
            onSubmit={(event) => {
              event.preventDefault();
              submitForm();
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map((field, index) => {
                const key = toFieldKey(field.label);
                const value = values[key] ?? "";

                return (
                  <label
                    key={`${field.label}-${index}`}
                    className={`flex flex-col gap-2 ${
                      field.textarea ? "md:col-span-2" : ""
                    }`}
                  >
                    <span className="text-sm font-semibold text-forest">
                      {field.label}
                    </span>

                    {renderInputField(field, key, value)}

                    {errors[key] ? (
                      <span className="text-xs text-red-600 font-medium">
                        {errors[key]}
                      </span>
                    ) : null}
                  </label>
                );
              })}
            </div>

            <div className="pt-4 border-t border-forest/10 flex items-center justify-end gap-3">
              <Link
                href={backHref}
                className="px-4 py-2 rounded-lg border border-forest/10 text-charcoal/70 hover:bg-cream disabled:opacity-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 rounded-lg bg-gold text-forest font-bold hover:bg-gold/90 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-lg">
                      progress_activity
                    </span>
                    Loading...
                  </>
                ) : (
                  saveLabel
                )}
              </button>
            </div>

            {status === "saved" ? (
              <p className="text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg">
                {section === "banners"
                  ? "Banner saved successfully!"
                  : "Data saved to localStorage successfully."}
              </p>
            ) : null}

            {status === "failed" && Object.keys(errors).length === 0 ? (
              <p className="text-sm font-medium text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
                Failed to save data. Please try again.
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </AdminShell>
  );
}
