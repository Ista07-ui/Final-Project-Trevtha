export default function UserPaymentMethods() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {/* Active Payment Method Card */}
      <div className="bg-white p-5 rounded-xl border border-primary/5 shadow-sm flex flex-col justify-between hover:border-accent transition-colors">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs font-bold text-charcoal/40 uppercase tracking-wider mb-1">
              Active Payment Method
            </p>
            <h4 className="text-lg font-bold text-primary">
              •••• •••• •••• 8824
            </h4>
          </div>
          <span className="material-symbols-outlined text-accent">
            credit_card
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-charcoal/60">Expires 05/27</span>
          <button className="text-accent text-xs font-bold hover:underline">
            Manage Methods
          </button>
        </div>
      </div>

      {/* Reward Card */}
      <div className="bg-[#1B3022] text-white p-5 rounded-xl border border-primary/5 shadow-sm flex flex-col justify-between relative overflow-hidden">
        <div className="absolute -right-4 -top-4 size-24 bg-accent/10 rounded-full"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-accent text-sm">
              redeem
            </span>
            <p className="text-[10px] font-bold text-accent uppercase tracking-widest">
              Member Exclusive
            </p>
          </div>
          <h4 className="text-lg font-bold mb-3">$200 Off Your Next Cruise</h4>
        </div>
        <button className="relative z-10 w-fit bg-accent text-primary px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-tight hover:brightness-110 transition-all">
          Claim Reward
        </button>
      </div>
    </div>
  );
}
