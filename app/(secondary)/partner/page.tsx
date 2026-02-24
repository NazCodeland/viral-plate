"use client";
// app/(secondary)/partner/page.tsx

import { useState } from "react";
import PageHeader from "@/components/PageHeader";

type PartnerType = "creator" | "restaurant";

export default function JoinPartnerPage() {
  const [selectedType, setSelectedType] = useState<PartnerType>("creator");

  return (
    <>
      <PageHeader title="Join as a Partner" />
      <div className="p-4">
        <p className="text-muted-foreground mb-4">
          Choose how you&apos;d like to partner with us
        </p>

        <div className="border-b border-border mb-4">
          <div className="flex gap-8">
            {(["creator", "restaurant"] as PartnerType[]).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`py-4 border-b-2 capitalize transition-colors ${
                  selectedType === type
                    ? "border-primary text-foreground font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {selectedType === "creator" ? (
          <CreatorApplicationForm />
        ) : (
          <RestaurantApplicationForm />
        )}
      </div>
    </>
  );
}

function CreatorApplicationForm() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Become a Creator
        </h2>
        <p className="text-muted-foreground">
          Upload food videos and earn money when users order from your recipes.
        </p>
      </div>
      <div className="space-y-4">
        <Field label="Full Name" placeholder="Enter your full name" />
        <Field label="Creator Username" placeholder="@username" />
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Social Media Links
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-input rounded-md mb-2 bg-background text-foreground placeholder:text-muted-foreground"
            placeholder="TikTok URL"
          />
          <input
            type="text"
            className="w-full px-3 py-2 border border-input rounded-md mb-2 bg-background text-foreground placeholder:text-muted-foreground"
            placeholder="Instagram URL"
          />
          <input
            type="text"
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground"
            placeholder="YouTube URL"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Tell us about yourself
          </label>
          <textarea
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground"
            rows={4}
            placeholder="What kind of content do you create? What's your cooking style?"
          />
        </div>
        <SubmitButton />
      </div>
    </div>
  );
}

function RestaurantApplicationForm() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Register as Restaurant
        </h2>
        <p className="text-muted-foreground">
          Fulfill orders and showcase your menu through engaging food videos.
        </p>
      </div>
      <div className="space-y-4">
        <Field
          label="Restaurant Name"
          placeholder="Enter your restaurant name"
        />
        <Field
          label="Business License Number"
          placeholder="Enter your business license number"
        />
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Restaurant Address
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-input rounded-md mb-2 bg-background text-foreground placeholder:text-muted-foreground"
            placeholder="Street address"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              className="px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground"
              placeholder="City"
            />
            <input
              type="text"
              className="px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground"
              placeholder="Postal code"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Contact Person
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-input rounded-md mb-2 bg-background text-foreground placeholder:text-muted-foreground"
            placeholder="Full name"
          />
          <input
            type="email"
            className="w-full px-3 py-2 border border-input rounded-md mb-2 bg-background text-foreground placeholder:text-muted-foreground"
            placeholder="Email"
          />
          <input
            type="tel"
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground"
            placeholder="Phone number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Restaurant Description
          </label>
          <textarea
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground"
            rows={4}
            placeholder="Tell us about your restaurant, cuisine type, and specialties"
          />
        </div>
        <SubmitButton />
      </div>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">
        {label}
      </label>
      <input
        type="text"
        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground"
        placeholder={placeholder}
      />
    </div>
  );
}

function SubmitButton() {
  return (
    <button className="w-full bg-primary text-primary-foreground py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
      Submit Application
    </button>
  );
}
