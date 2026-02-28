interface UserStatusWidget {
  label: string;
  count: string;
  icon: string;
  bgColor: string;
  textColor: string;
}

const userStatusWidgets: UserStatusWidget[] = [
  {
    label: "Pending",
    count: "03",
    icon: "payments",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-600",
  },
  {
    label: "Success",
    count: "28",
    icon: "check_circle",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
  },
  {
    label: "Failed",
    count: "01",
    icon: "error",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
  },
];

export default function UserStatusWidgets() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {userStatusWidgets.map((widget) => (
        <div
          key={widget.label}
          className="bg-white p-6 rounded-xl border border-primary/5 shadow-sm flex items-center justify-between group hover:border-accent transition-colors"
        >
          <div>
            <p className="text-sm font-medium text-charcoal/60">
              {widget.label}
            </p>
            <h3 className="text-3xl font-bold text-primary mt-1">
              {widget.count}
            </h3>
          </div>
          <div
            className={`size-12 rounded-lg ${widget.bgColor} ${widget.textColor} flex items-center justify-center group-hover:brightness-110 transition-colors`}
          >
            <span className="material-symbols-outlined">{widget.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
