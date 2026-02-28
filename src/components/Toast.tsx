"use client";

import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastProps {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}

function Toast({ toast, onRemove }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), toast.duration || 4000);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  const bgColor =
    toast.type === "success"
      ? "bg-emerald-50 border-emerald-200"
      : toast.type === "error"
        ? "bg-red-50 border-red-200"
        : toast.type === "warning"
          ? "bg-yellow-50 border-yellow-200"
          : "bg-blue-50 border-blue-200";

  const textColor =
    toast.type === "success"
      ? "text-emerald-700"
      : toast.type === "error"
        ? "text-red-700"
        : toast.type === "warning"
          ? "text-yellow-700"
          : "text-blue-700";

  const iconName =
    toast.type === "success"
      ? "check_circle"
      : toast.type === "error"
        ? "error"
        : toast.type === "warning"
          ? "warning"
          : "info";

  return (
    <div
      className={`flex gap-3 rounded-lg border px-4 py-3 ${bgColor} ${textColor} animate-in fade-in slide-in-from-top-4 duration-300`}
      role="alert"
    >
      <span className="material-symbols-outlined flex-shrink-0 text-lg">
        {iconName}
      </span>
      <p className="text-sm font-medium">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="ml-auto flex-shrink-0 text-lg hover:opacity-70"
      >
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-sm">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}
