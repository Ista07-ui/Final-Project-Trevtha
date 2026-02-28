import UserDashboardHeader from "@/components/user/UserDashboardHeader";

export default function PaymentMethodsPage() {
  return (
    <div className="layout-container flex h-full grow flex-col bg-background-light text-charcoal [--color-primary:#1B3022] [--color-forest:#1B3022] [--color-gold:#D4AF37] [--color-background-light:#F9F7F2] [--color-background-dark:#121212]">
      {/* Top Navigation */}
      <UserDashboardHeader />

      {/* Main Content Area */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="max-w-5xl mx-auto mb-10">
          <h2 className="text-4xl font-extrabold text-forest mb-2">
            Payment Methods
          </h2>
          <p className="text-charcoal/60 text-lg">
            Securely manage your preferred ways to pay for your luxury journeys.
          </p>
        </header>

        <div className="max-w-5xl mx-auto space-y-12">
          {/* Section 1: Saved Cards */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-forest flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  credit_card
                </span>
                Saved Cards
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Visa Card */}
              <div className="relative group p-6 rounded-2xl bg-forest text-cream flex flex-col justify-between h-48 shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <span className="material-symbols-outlined text-9xl">
                    credit_card
                  </span>
                </div>
                <div className="flex justify-between items-start z-10">
                  <div className="w-12 h-8 bg-primary/20 rounded flex items-center justify-center overflow-hidden">
                    <img
                      alt="Visa"
                      className="w-8 h-auto"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuByLQcVzxMAsQ2_kJ0_lmD_429bMqDZepWclgaMVOCtkzoigXotViJ-Om6tlymEUPPhLd0QStblLdJIVGGVYNIu0S-gbQPsOCJUW8otKureD0QpjGjJzc9bPDKHYzA_M4Ij4A4NRdqmgDpzjIEAZmPbYMoh6fvspCCHKdPodxq9r5s3q6sSarCi8PS6nQ_psgGSO_litvJtXLUNNsa2RR_7qWegGFsif1X5aaPNig6FoS5mrdhswFI-uy2WlHSJ9tFxZI3NkaGCe-jz"
                    />
                  </div>
                  <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                    Default
                  </span>
                </div>
                <div className="z-10">
                  <p className="text-xl font-mono tracking-widest mb-1">
                    •••• •••• •••• 4242
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] uppercase opacity-60">
                        Expires
                      </p>
                      <p className="text-sm font-medium">12/26</p>
                    </div>
                    <div className="flex gap-3">
                      <button className="text-xs font-semibold hover:text-primary transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mastercard */}
              <div className="relative group p-6 rounded-2xl bg-white border border-primary/30 text-forest flex flex-col justify-between h-48 shadow-md hover:shadow-lg transition-all">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-8 flex items-center justify-center overflow-hidden">
                    <img
                      alt="Mastercard"
                      className="w-8 h-auto"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC19QzLy9AsfoMTzQH0vgxWtqZl-IA4s8jYqN7I6iDVG5sXbIV1GMTjmFMvFsiG6kw4H2P-M9V3jPJ03jg48uGnySfT-x3qhHJIArtA3eCmqhtQ0FLGctsz-TQImUa8e0adm6h_42-RmMd143iLQ5h3F-KPZqBIDxcwLCRYgoF0EgKhApMNM3r509MKWVBSrMiaGrquK4KuU0c4YEWxALxS50LPulo0h46YdWez5iBuqnOKAg-zyA7H82kzjmpp1z0XV02-hcSzlCK3"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-xl font-mono tracking-widest text-charcoal mb-1">
                    •••• •••• •••• 5555
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] uppercase text-charcoal/40">
                        Expires
                      </p>
                      <p className="text-sm font-medium">09/25</p>
                    </div>
                    <div className="flex gap-3">
                      <button className="text-xs font-semibold text-primary hover:underline">
                        Set Default
                      </button>
                      <button className="text-xs font-semibold text-red-500 hover:underline">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add New Card */}
              <button className="p-6 rounded-2xl border-2 border-dashed border-primary/30 flex flex-col items-center justify-center gap-3 h-48 group hover:bg-white hover:border-primary transition-all">
                <div className="size-12 rounded-full bg-cream flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">
                    add
                  </span>
                </div>
                <div className="text-center">
                  <p className="font-bold text-forest">Add New Card</p>
                  <p className="text-xs text-charcoal/40">Secure encryption</p>
                </div>
              </button>
            </div>
          </section>

          {/* Section 2: Available Payment Options */}
          <section className="space-y-8">
            <h3 className="text-xl font-bold text-forest flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">
                account_balance_wallet
              </span>
              Available Payment Options
            </h3>

            {/* Bank Transfer */}
            <div>
              <p className="text-sm font-bold text-charcoal/40 uppercase tracking-widest mb-4">
                Bank Transfer
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[
                  {
                    name: "BCA Transfer",
                    fee: "Rp 2.500",
                    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBA1U6eZpBCi5R8h_7nlCnLqkZA-ftHQWDt5UVFK8Gd6s51qecCOiXu-JOYWHYLg8woYCRC0WoVy5wc0Sz8-40lkP8-SRrVIsMrxm6qtlbCkVo1kj97zJaRYaFniHv2zm4LuhK6dAorcV5PTAU963iyEBOLiGyiWDZ0dNk5955_tPPokGlWyYgZARQCO6WnnzHWzCrNB7PPn_VphJTE2_4CnycuRBiSiStxNEMe5C8Q5fZeIILvygDsxbAmnDkjTn4ZOi785yQfR9Bi",
                  },
                  {
                    name: "Mandiri Transfer",
                    fee: "Rp 2.500",
                    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_jJKUE_4fA4EZeL5lDhcskHsIcz3h890Hyyx2uj4Omli8cXDJ0U8n9Rpncqk5icmYtYafKSPxHtncRkVPAooFyzB5-VUkX3mEYkV0BtEZLZvlFvzIqxWGx9MqDiM6HpjvGQLSNcLhFnVUYnJSuEVS8lx0RDs6yGa32Xziuu6Lz0vxQ2gFyShteirj1GNsbbGeS8TFvpVcR9cdDobEMzvV58LppUDH_s8E8ZhIOCtURjeSu-SUs9DmCW5lKOYb-y10CfpJKlIzuJ56",
                  },
                  {
                    name: "BNI Transfer",
                    fee: "Rp 2.500",
                    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCLNz3zefKKx2alhVZutcljlo82CRwLXB0IMJb820mcHaJgfFlHicwdHounxUhSJagCKjvs_xnNvnEYx3OkHDsEIaW9k3xCjg6kkfVAXlQaicuY3skNeqwKEHEuW3YM161i0_HkaxjUWwTu54c0mOCwbDiyFnRUJGCvbCjQyyL3IW4jHh-rYcReJKt4KT9axmahiIXqqlR_1UiDPBd1Og8hjEARi2FzH1thD92TstmXwr_5ZRz9-rnZGtk91-Q1B0VtCr7EqQ9gvIF",
                  },
                  {
                    name: "BRI Transfer",
                    fee: "Rp 2.500",
                    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSANxfspo89wYKpcXHD9-sXI3e9IcoH5cL5cGY7IayioMxFqVy8N6fEjOchvH542U2UF_9Er2CDEyasxjcva9pG1mkNJ8R0z1sXElPS8pP14lQ4bNoOm_mMhI2QuVU3GbSrAtoZpBwV_3Oh4x9b95x832dbf_0ybvUIy3apl0vNQJPBtoSc0Uc62JLfInBy4gFXxjTs-NT-cQuI7-izj9FyUSUWrk0Pc0tB-1JDw_BwE7mmooh7RrCFhgHDvCbtxIDtzUt43Hwwvye",
                  },
                ].map((bank, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-xl border border-primary/10 hover:border-primary hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="h-8 flex items-center justify-start grayscale group-hover:grayscale-0 transition-all">
                        <img
                          alt={bank.name}
                          className="h-6 w-auto"
                          src={bank.logo}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-forest">
                          {bank.name}
                        </p>
                        <span className="inline-block mt-1 text-[10px] bg-cream px-2 py-0.5 rounded text-primary font-bold">
                          Fee: {bank.fee}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* E-Wallet */}
            <div>
              <p className="text-sm font-bold text-charcoal/40 uppercase tracking-widest mb-4">
                E-Wallet
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[
                  {
                    name: "QRIS Payment",
                    fee: "0.7%",
                    feeColor: "green",
                    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPHzRf9wBqgm1LGZvtJpyMIywCKTGLmWrEwfu5FAVfcSOw-zvIeXh3lthjuLTKX9sbrCyUmlveAqHuIaW5ybpfTAME-eCZhjtiKgr_V1WV70PJHojceaO26InSUmZMRvzj1TM6EwC6UNZCTTUxqx9y6HSZIMdvpd8QFA-rvVPMq9QHqAmZ-hAHkduUcxF1ymJd1Ytj_fDmIEGkip4S8U0lfM9qEmrguJ9sxAo6MSu19NRswWO4it9Bfoeq2g1FwkNbXQ8LbiqRs0JT",
                  },
                  {
                    name: "GoPay",
                    fee: "Rp 1.000",
                    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDk8NcakFYR7oCsOkTv0YK4nnCt5bnffd-yZh3vgmtcR-nUeS6-I8ZRYpo1YVb5AMx55Od-uoSxnpGngw9jyXgdbUG0Pw1n2u6Zzu4xqGjYLiU7urZHbBx3uSHvXEnrLVb67bCitAdTWvlDepuVYJTg3Uk6dTvd3s5pGGUHox_UurMsOokAgfmnw2TOmDqWXgpby27VPx4TOn4DFfYAgfqkkRKtahQ-YlkXm_T7nc-AbBpmXLO380SZES2KNvBJcQwhzlYirm_G-K7",
                  },
                  {
                    name: "OVO Cash",
                    fee: "Rp 1.000",
                    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIJ6cfOF232U3804ZJ0QwSzYf5b_WRsaB0Xffs6GCIvomJLgn3GQGg6Nw84bleyuvKRcv6sNXksgKN6IyN7SwoJ_RQl5M6l_cXCA0tppkSFdTkpa0R-uUkSSngRLoqEqXXOcaT93M3LTR0Z3PihUB2MLtIW_lQUMqWxclYTbk9sm4H8qiqIocTpO2F1bg0-s9g7Z77hg-TCQauX3kQ95OGsIA-2aHPqeJx7Eor_zkaBD4d3hsW8CEG9o2YOFMcGw8OTADOiwd1O0AO",
                  },
                  {
                    name: "Dana Wallet",
                    fee: "Rp 1.000",
                    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBakAj2gleqtXnfM0bT7D35XKOy2-Yqdou3HwXnvgqt4KzZC_fPoSAVEcAlwI3mds3LRAWvnOny4ttfw5jGVl_x2FRVI3Sx-piuS788tefIpftEgBViN2RCy7SjbXbKzyZ_WDgFWKjN1maQKj-ODRW4H0ilnwttI2EwCpQw0QS5dOrC1-Hbt26OfESUnlpJmQVzlu7e7KxK552ka7cxmYJuf_d0LjpoQ-zhqSkIuMpX_D0RBgWRHjK6IF5j6DCPgH2RRgErYE8UVd0_",
                  },
                ].map((wallet, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-xl border border-primary/10 hover:border-primary hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="h-8 flex items-center justify-start grayscale group-hover:grayscale-0 transition-all">
                        <img
                          alt={wallet.name}
                          className="h-4 w-auto"
                          src={wallet.logo}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-forest">
                          {wallet.name}
                        </p>
                        <span
                          className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded font-bold ${
                            wallet.feeColor === "green"
                              ? "bg-green-50 text-green-700"
                              : "bg-cream text-primary"
                          }`}
                        >
                          Fee: {wallet.fee}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Over-the-Counter */}
            <div>
              <p className="text-sm font-bold text-charcoal/40 uppercase tracking-widest mb-4">
                Over-the-Counter
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[
                  {
                    name: "Alfamart",
                    fee: "Rp 5.000",
                    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwtMS94Z0e9oieOT96q77gW5CXV4-_R_wH4Dp_JPtNPMH2RVcGcmhhxytywTiUTCa9Xtq6Y_ke4i6TeGl7ANgZanrrHpdGrmhm7bmZ9_Fh4G_Oybryi3fVTBSWCDASh6OOiAyH-QVxu-100W1UiBt3t960_Vxwz4AcLzfA0BtTHmB7wowXfXmZikq8A5K_nLIt7aoH6Lo_zVoUSJCknC7Lr-YiB2o2CYtRDoDOz4nftvPGTjQZybK250dCCvk0gJOVxZ3KeYxBt6aP",
                  },
                  {
                    name: "Indomaret",
                    fee: "Rp 5.000",
                    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4L4fUTW2h0YFLOaKzK3ub6kWrCJ3SY85IUx7LSdKAweTH3XNIbZ9pdQ0NKE7BQccoz2YN_AaFd4ylGF2yYBjqMe43W7AMyv7BPfi896dhUzi1zaHwcR3FuQcvQEOA0ZkYuQEt_Suw4yS7JsaTycNDXM9QcTAi0_rTatYi2-_OyD0-lbW1Prf6qoNVHqSFTrqqtqwRJAoyXIF1bqCCtS4RFKcHBcjVY5TiIfeP-4bIixQ1aX0ZJaRoIFs8Ou4xfnF0DvoysH6721TW",
                  },
                ].map((store, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-xl border border-primary/10 hover:border-primary hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="h-8 flex items-center justify-start grayscale group-hover:grayscale-0 transition-all">
                        <img
                          alt={store.name}
                          className="h-5 w-auto"
                          src={store.logo}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-forest">
                          {store.name}
                        </p>
                        <span className="inline-block mt-1 text-[10px] bg-cream px-2 py-0.5 rounded text-primary font-bold">
                          Fee: {store.fee}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Footer Meta */}
        <footer className="max-w-5xl mx-auto mt-20 pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4 text-charcoal/40 text-xs">
          <p>© 2024 TREVTHA Luxury Travel Marketplace. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-primary transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Terms of Service
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              PCI-DSS Compliant
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
