"use client";

import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";
import activityService, { type Activity } from "@/lib/services/activity";
import { ToastContainer } from "@/components/Toast";

export default function ActivitiesPage() {
  const toast = useToast();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true);
      const data = await activityService.getActiveActivities(1, 50);
      setActivities(Array.isArray(data) ? data : []);
      setIsLoading(false);
    };

    fetchActivities();
  }, []);

  const handleDeleteActivity = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this activity?")) {
      return;
    }

    setDeletingId(id);
    const result = await activityService.deleteActivity(id);

    if (result) {
      setActivities(activities.filter((activity) => activity.id !== id));
      toast.success("Activity deleted successfully!");
    } else {
      toast.error("Failed to delete activity");
    }

    setDeletingId(null);
  };

  const totalActivities = activities.length;
  const activeActivities = activities.filter(
    (activity) => activity.price > 0,
  ).length;

  return (
    <AdminShell activeNav="activities">
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-forest">
            Activities & Experiences
          </h1>
          <p className="text-slate-600 mt-2">
            Manage all tourism activities and travel packages
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Total Activities
                </p>
                <p className="text-3xl font-bold text-forest mt-2">
                  {totalActivities}
                </p>
              </div>
              <span className="material-symbols-outlined text-gold text-4xl">
                local_activity
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Active Activities
                </p>
                <p className="text-3xl font-bold text-gold mt-2">
                  {activeActivities}
                </p>
              </div>
              <span className="material-symbols-outlined text-emerald-500 text-4xl">
                check_circle
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Average Rating
                </p>
                <p className="text-3xl font-bold text-amber-500 mt-2">
                  {activities.length > 0
                    ? (
                        activities.reduce(
                          (sum, act) => sum + (act.rating || 0),
                          0,
                        ) / activities.length
                      ).toFixed(1)
                    : "0"}
                </p>
              </div>
              <span className="material-symbols-outlined text-amber-500 text-4xl">
                star
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search activities..."
              className="px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-gold"
            />
            <select className="px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-600 focus:outline-none focus:border-gold">
              <option>All Categories</option>
              <option>Water Activity</option>
              <option>Mountain Trekking</option>
              <option>Luxury Tour</option>
            </select>
          </div>
          <Link
            href="/admin/activities/new"
            className="bg-gold hover:bg-[#c19b2a] text-forest font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-md whitespace-nowrap"
          >
            <span className="material-symbols-outlined">add</span>Add New
            Activity
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
                <p className="mt-4 text-slate-600">Loading activities...</p>
              </div>
            </div>
          ) : activities.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl text-slate-300">
                  deployed_code
                </span>
                <p className="mt-4 text-slate-600">
                  No activities found. Create your first one!
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      No
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      Activity
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      Location
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      Price
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      Rating
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activities.map((activity, index) => (
                    <tr
                      key={activity.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-slate-400 font-medium">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={
                              activity.imageUrl ||
                              "https://via.placeholder.com/48"
                            }
                            alt={activity.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-slate-900">
                              {activity.title}
                            </p>
                            <p className="text-xs text-slate-500">
                              {activity.description?.substring(0, 30)}...
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {activity.city}, {activity.province}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-forest">
                        IDR {activity.price?.toLocaleString("id-ID") || "0"}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-amber-500 text-base">
                            star
                          </span>
                          <span className="font-medium text-slate-900">
                            {activity.rating || "0"}
                          </span>
                          <span className="text-xs text-slate-500">(0)</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/admin/activities/${activity.id}/edit`}
                            className="p-2 text-slate-500 hover:text-gold hover:bg-slate-100 rounded-lg transition-all"
                          >
                            <span className="material-symbols-outlined">
                              edit
                            </span>
                          </Link>
                          <button
                            onClick={() => handleDeleteActivity(activity.id)}
                            disabled={deletingId === activity.id}
                            className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                          >
                            <span className="material-symbols-outlined">
                              {deletingId === activity.id
                                ? "hourglass_empty"
                                : "delete"}
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-500 font-medium">
              Showing {activities.length} of {totalActivities} activities
            </p>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-8 h-8 rounded-lg bg-gold text-forest font-bold text-sm shadow-sm">
                1
              </button>
              <button className="p-2 text-slate-400 hover:text-forest">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
