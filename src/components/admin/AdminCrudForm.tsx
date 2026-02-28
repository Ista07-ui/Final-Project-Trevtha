"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
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

  const submitForm = () => {
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

    try {
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
    } catch {
      setStatus("failed");
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
                className="px-4 py-2 rounded-lg border border-forest/10 text-charcoal/70 hover:bg-cream"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-gold text-forest font-bold hover:bg-gold/90"
              >
                {saveLabel}
              </button>
            </div>

            {status === "saved" ? (
              <p className="text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg">
                Data saved to localStorage successfully.
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
