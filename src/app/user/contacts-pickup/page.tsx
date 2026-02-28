"use client";

import UserDashboardHeader from "@/components/user/UserDashboardHeader";
import { useEffect, useState } from "react";

type Passenger = {
  id: number;
  name: string;
  gender: "Male" | "Female";
  dob: string;
  identityType: "NIK" | "Passport";
  identityNumber: string;
  image: string;
};

const PASSENGER_STORAGE_KEY = "trevtha_user_passengers";

export default function ContactsPickupPage() {
  const defaultPassengers: Passenger[] = [
    {
      id: 1,
      name: "Alexander Hunt",
      gender: "Male",
      dob: "12/05/1985",
      identityType: "NIK",
      identityNumber: "3201**********88",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAr8MJJelI-OOfsDnb1wtQ1lH7VPio2s2r2uHA7JKfwgHbpQCdJMgB5nzmQdk5VNCti1lCLpFyrrknMjbQromvpaip0e3lU_4WdR7xqpiK6pk9lmckfPD-3qCKnCr8mG2o-_YL0Tq51ypKK7DlAwLcticqaQzMA1nsmPRPx9j1CFmY6tEI1gViXqGPyRMcr6yOGU0rwiJ9WVa1m-Md3b68S9Bq0TVWngy-n2OigiysF7AkJLZLuN2Sdw33elKMW0pnzIyy5UasSxF4Q",
    },
    {
      id: 2,
      name: "Sophia Chen",
      gender: "Female",
      dob: "24/08/1992",
      identityType: "Passport",
      identityNumber: "E91****22",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuASNiUe35SeO1TMkVirBBTnOAbS0fM-VAB1IjokzCCK2AaaakyiPm9iWn5jzXctmd9yxYFVi4pLLc_0G7jBU9Q8506IexZauuyd9G-9J3V82wEqm5zELATTgDmS1zK7goGKeieP8WzqAlx_jQEAKY50zWsSeCzeWsK6ossTSk3YCXaFkK3eG-vrWfg6DqFblQf4daYXNODjBNNBtcrehr0A3xbLrqOKH__YhmM7zXr9I_i5X9Lom0SQ3-XS8gkG8VeIaUk5fBAcD_pf",
    },
  ];

  const [passengers, setPassengers] = useState<Passenger[]>(() => {
    try {
      const raw = localStorage.getItem(PASSENGER_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Passenger[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Return default on error
    }
    return defaultPassengers;
  });
  const [isPassengerFormOpen, setIsPassengerFormOpen] = useState(false);
  const [editingPassengerId, setEditingPassengerId] = useState<number | null>(
    null,
  );
  const [passengerForm, setPassengerForm] = useState({
    name: "",
    gender: "Male" as "Male" | "Female",
    dob: "",
    identityType: "NIK" as "NIK" | "Passport",
    identityNumber: "",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAr8MJJelI-OOfsDnb1wtQ1lH7VPio2s2r2uHA7JKfwgHbpQCdJMgB5nzmQdk5VNCti1lCLpFyrrknMjbQromvpaip0e3lU_4WdR7xqpiK6pk9lmckfPD-3qCKnCr8mG2o-_YL0Tq51ypKK7DlAwLcticqaQzMA1nsmPRPx9j1CFmY6tEI1gViXqGPyRMcr6yOGU0rwiJ9WVa1m-Md3b68S9Bq0TVWngy-n2OigiysF7AkJLZLuN2Sdw33elKMW0pnzIyy5UasSxF4Q",
  });

  useEffect(() => {
    localStorage.setItem(PASSENGER_STORAGE_KEY, JSON.stringify(passengers));
  }, [passengers]);

  const resetPassengerForm = () => {
    setPassengerForm({
      name: "",
      gender: "Male",
      dob: "",
      identityType: "NIK",
      identityNumber: "",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAr8MJJelI-OOfsDnb1wtQ1lH7VPio2s2r2uHA7JKfwgHbpQCdJMgB5nzmQdk5VNCti1lCLpFyrrknMjbQromvpaip0e3lU_4WdR7xqpiK6pk9lmckfPD-3qCKnCr8mG2o-_YL0Tq51ypKK7DlAwLcticqaQzMA1nsmPRPx9j1CFmY6tEI1gViXqGPyRMcr6yOGU0rwiJ9WVa1m-Md3b68S9Bq0TVWngy-n2OigiysF7AkJLZLuN2Sdw33elKMW0pnzIyy5UasSxF4Q",
    });
    setEditingPassengerId(null);
  };

  const openCreatePassengerForm = () => {
    resetPassengerForm();
    setIsPassengerFormOpen(true);
  };

  const openEditPassengerForm = (passenger: Passenger) => {
    setPassengerForm({
      name: passenger.name,
      gender: passenger.gender,
      dob: passenger.dob,
      identityType: passenger.identityType,
      identityNumber: passenger.identityNumber,
      image: passenger.image,
    });
    setEditingPassengerId(passenger.id);
    setIsPassengerFormOpen(true);
  };

  const closePassengerForm = () => {
    setIsPassengerFormOpen(false);
    resetPassengerForm();
  };

  const handlePassengerFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setPassengerForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePassengerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !passengerForm.name ||
      !passengerForm.dob ||
      !passengerForm.identityNumber
    ) {
      return;
    }

    if (editingPassengerId !== null) {
      setPassengers((prev) =>
        prev.map((item) =>
          item.id === editingPassengerId
            ? {
                ...item,
                ...passengerForm,
              }
            : item,
        ),
      );
    } else {
      setPassengers((prev) => [
        {
          id: Date.now(),
          ...passengerForm,
        },
        ...prev,
      ]);
    }

    closePassengerForm();
  };

  const handleDeletePassenger = (passengerId: number) => {
    setPassengers((prev) => prev.filter((item) => item.id !== passengerId));
  };

  const pickupLocations = [
    {
      id: 1,
      label: "Home",
      name: "The Penthouse Residence",
      address: "1221 Avenue of the Americas, Floor 45, NY 10020",
      notes: '"Black gate with gold accents, ring bell 402."',
      mapImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD63198nMjJ4IyEEs4YP7i3a9TLJrLNNKo0eX_D2rnaseLJ91hvAgBXbV9C0-1eULWBnDHqdhgzk43FidtG9-j5fCQ_CRtS-yMbbJ8Tams53UkcUjc2AnXW4T9dSKP_jT0qA8EeBBJYMzSf2ZwaO9DYIw0xQ0J1e43yBKa9tGbCi_UWGppgEN9UZA9AfW1jynjMd-IV886xuPlMKsRK8sWwR00UmPs2Pc1jpOd7JLDC7yUdwqM_-IEVEyX8x_Y9xW6u4MM1BFbXqzdy",
    },
    {
      id: 2,
      label: "Office",
      name: "Global Trade Center",
      address: "88 Corporate Plaza, Suite 200, Finance District",
      notes: '"Main lobby entrance near the fountain."',
      mapImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAMspqzyeKnV8w2z0Hf17cBwC4OfQoJGRrx4V9xIu6ZO2Ruy9AhIaqJUq864dx9MuhcvL_5P_825g0s8URHhEi672yqQF2NYqzNreYw7bGRFst7yTrDKHeUK8oeLPDRS8ccUkVGnjnT5Ir1Jgpr4yP-9qMTDyws5tzq0t9d9rMiOn_FP1_el6ooYrU1gfzkUJ9fkbt20EOoGWIYuC9DYDiFnHzWBumLDHSuUBn7veq1g2iOT-5hgjcKut6hxPfbyRRQC66uq1iMG4pE",
    },
  ];

  return (
    <div className="layout-container flex h-full grow flex-col bg-background-light text-charcoal [--color-primary:#1B3022] [--color-forest:#1B3022] [--color-gold:#D4AF37] [--color-background-light:#F9F7F2] [--color-background-dark:#121212]">
      {/* Top Navigation */}
      <UserDashboardHeader />

      {/* Main Content */}
      <main className="flex-1 p-10 max-w-6xl mx-auto w-full">
        {/* Header */}
        <header className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-extrabold text-forest mb-2">
              Contacts & Pickup
            </h2>
            <p className="text-slate-500 text-lg">
              Manage your elite travel network and arrival preferences.
            </p>
          </div>
          <button
            onClick={openCreatePassengerForm}
            className="bg-forest text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all"
          >
            <span className="material-symbols-outlined">person_add</span>
            Add New Contact
          </button>
        </header>

        {isPassengerFormOpen && (
          <section className="mb-8 rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
            <h3 className="mb-5 text-lg font-bold text-forest">
              {editingPassengerId !== null
                ? "Edit Passenger"
                : "Create New Passenger"}
            </h3>
            <form
              onSubmit={handlePassengerSubmit}
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              <input
                type="text"
                name="name"
                value={passengerForm.name}
                onChange={handlePassengerFormChange}
                placeholder="Passenger Name"
                className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary"
                required
              />
              <input
                type="text"
                name="dob"
                value={passengerForm.dob}
                onChange={handlePassengerFormChange}
                placeholder="Date of Birth (DD/MM/YYYY)"
                className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary"
                required
              />
              <select
                name="gender"
                value={passengerForm.gender}
                onChange={handlePassengerFormChange}
                className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <select
                name="identityType"
                value={passengerForm.identityType}
                onChange={handlePassengerFormChange}
                className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary"
              >
                <option value="NIK">NIK</option>
                <option value="Passport">Passport</option>
              </select>
              <input
                type="text"
                name="identityNumber"
                value={passengerForm.identityNumber}
                onChange={handlePassengerFormChange}
                placeholder="Identity Number"
                className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary"
                required
              />
              <input
                type="url"
                name="image"
                value={passengerForm.image}
                onChange={handlePassengerFormChange}
                placeholder="Profile Image URL"
                className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary"
              />
              <div className="md:col-span-2 mt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closePassengerForm}
                  className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-forest px-5 py-2.5 text-sm font-bold text-white hover:bg-opacity-90"
                >
                  {editingPassengerId !== null ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </section>
        )}

        <div className="space-y-12">
          {/* Saved Passengers Section */}
          <section>
            <h3 className="text-xl font-bold text-forest mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined">group</span>
              Saved Passengers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {passengers.map((passenger) => (
                <div
                  key={passenger.id}
                  className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-full bg-cream overflow-hidden border-2 border-primary/20">
                      <img
                        className="w-full h-full object-cover"
                        src={passenger.image}
                        alt={passenger.name}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditPassengerForm(passenger)}
                        className="p-2 text-slate-400 hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">
                          edit
                        </span>
                      </button>
                      <button
                        onClick={() => handleDeletePassenger(passenger.id)}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">
                    {passenger.name}
                  </h4>
                  <div className="mt-4 space-y-2 text-sm text-slate-500">
                    <p className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-xs">
                        {passenger.gender === "Male" ? "male" : "female"}
                      </span>{" "}
                      {passenger.gender} • {passenger.dob}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-xs">
                        {passenger.identityType === "NIK"
                          ? "fingerprint"
                          : "badge"}
                      </span>{" "}
                      {passenger.identityType}: {passenger.identityNumber}
                    </p>
                  </div>
                </div>
              ))}

              {/* Add New Card Placeholder */}
              <button
                onClick={openCreatePassengerForm}
                className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-6 text-slate-400 hover:border-primary hover:text-primary cursor-pointer transition-all"
              >
                <span className="material-symbols-outlined text-4xl mb-2">
                  add_circle
                </span>
                <span className="font-bold">Add New Passenger</span>
              </button>
            </div>
          </section>

          {/* Emergency Contact & Preferences Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Emergency Contact Section */}
            <section className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-forest mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">emergency</span>
                Emergency Contact
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">
                      Full Name
                    </label>
                    <input
                      className="bg-cream border-none rounded-lg focus:ring-2 focus:ring-primary py-3 px-4 text-sm font-medium"
                      type="text"
                      defaultValue="Eleanor Hunt"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">
                      Relationship
                    </label>
                    <select className="bg-cream border-none rounded-lg focus:ring-2 focus:ring-primary py-3 px-4 text-sm font-medium">
                      <option>Spouse</option>
                      <option>Parent</option>
                      <option>Sibling</option>
                      <option>Business Partner</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    Emergency Phone Number
                  </label>
                  <div className="flex items-center bg-cream rounded-lg px-4">
                    <span className="material-symbols-outlined text-slate-400 text-sm mr-2">
                      call
                    </span>
                    <input
                      className="bg-transparent border-none w-full focus:ring-0 py-3 text-sm font-medium"
                      type="tel"
                      defaultValue="+1 (555) 012-3456"
                    />
                  </div>
                </div>
                <button className="mt-4 text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                  Save Emergency Info
                </button>
              </div>
            </section>

            {/* Communication Preferences */}
            <section className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-forest mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">
                  notifications_active
                </span>
                Communication Preferences
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase mb-3">
                    Preferred Contact Method
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 cursor-pointer bg-cream px-4 py-2 rounded-full text-sm font-medium border border-transparent has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                      <input
                        defaultChecked
                        className="text-primary focus:ring-primary w-4 h-4"
                        name="contact"
                        type="radio"
                      />
                      WhatsApp
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer bg-cream px-4 py-2 rounded-full text-sm font-medium border border-transparent has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                      <input
                        className="text-primary focus:ring-primary w-4 h-4"
                        name="contact"
                        type="radio"
                      />
                      Phone
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer bg-cream px-4 py-2 rounded-full text-sm font-medium border border-transparent has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                      <input
                        className="text-primary focus:ring-primary w-4 h-4"
                        name="contact"
                        type="radio"
                      />
                      Email
                    </label>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-500 uppercase">
                    Journey Notifications
                  </p>
                  <div className="flex items-center gap-3">
                    <input
                      defaultChecked
                      className="rounded border-slate-300 text-forest focus:ring-forest w-5 h-5"
                      type="checkbox"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      Driver arrival and status updates
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      defaultChecked
                      className="rounded border-slate-300 text-forest focus:ring-forest w-5 h-5"
                      type="checkbox"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      Itinerary changes and delay alerts
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Saved Pickup Points Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-forest flex items-center gap-2">
                <span className="material-symbols-outlined">location_on</span>
                Saved Pickup Points
              </h3>
              <button className="text-forest font-bold text-sm flex items-center gap-1 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-base">add</span>{" "}
                Add New Location
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pickupLocations.map((location) => (
                <div
                  key={location.id}
                  className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm flex flex-col md:flex-row"
                >
                  <div className="w-full md:w-32 bg-slate-200">
                    <div
                      className="h-full w-full bg-cover bg-center min-h-[120px]"
                      style={{
                        backgroundImage: `url('${location.mapImage}')`,
                      }}
                    ></div>
                  </div>
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className={`${
                          location.label === "Home"
                            ? "bg-forest text-primary"
                            : "bg-primary/20 text-forest"
                        } text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded`}
                      >
                        {location.label}
                      </span>
                      <button className="text-slate-400 hover:text-primary">
                        <span className="material-symbols-outlined text-sm">
                          edit
                        </span>
                      </button>
                    </div>
                    <h4 className="font-bold text-slate-900">
                      {location.name}
                    </h4>
                    <p className="text-sm text-slate-500 mt-1">
                      {location.address}
                    </p>
                    <div className="mt-4 pt-4 border-t border-slate-50">
                      <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">
                        Pickup Notes
                      </p>
                      <p className="text-sm text-slate-600 italic">
                        {location.notes}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer Help */}
        <footer className="mt-16 pt-8 border-t border-slate-200 flex justify-between items-center text-slate-400 text-sm">
          <p>© 2026 TREVTHA Luxury Travel Marketplace. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-primary" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-primary" href="#">
              Concierge Support
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
