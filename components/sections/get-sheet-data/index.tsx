"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/elements/shad-cn/button";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Container, Section } from "@/components/layouts";
import { Heading, SubTitle } from "@/components/elements";
import Loader from "@/components/elements/loader";
import { cn } from "@/components/elements/utils";
import { citiesByState } from "@/data/config";
const MESSAGE_TEMPLATES = {
  // Single lead purchase
  singleLead: (lead: Lead) => `
Hey Lead2Solar!

I'm ready to buy this lead:
*${lead["Lead Code"]}*

Quick details:
Size: ${lead["Project Size"].replace(",", ".")}
Type: ${lead["Nature of Installation"] || "N/A"}
Location: ${lead.City || "N/A"}, ${lead.State || "N/A"}
Post Code: ${lead["Post Code"] || "N/A"}

Ready to proceed! What's next?`,

  // Multiple leads purchase
  multipleLeads: (leadCodes: string[]) => `
Hey Lead2Solar!

I'm ready to purchase these ${leadCodes.length} leads:
${leadCodes.join("\n")}

Looking forward to moving ahead! What's the next step?`,

  // Request for specific location
  requestLocation: (location: string | null) => `
Hey Lead2Solar!

I'm looking for leads ${location ? `in ${location}` : "my area"}
Could you notify me when leads become available in ${location ? `in ${location}` : "my area"}?

Thanks!`,

  // Subscription inquiry
  subscriptionInquiry: () => `
Hey Lead2Solar!

I'm interested in your lead subscription plans
Could you share the available options and pricing details?

Thanks!`,
};
// Types and Constants
interface Lead {
  "Lead Code": string;
  "Project Size": string;
  "Nature of Installation": string | null;
  City: string | null;
  State: string | null;
  "Post Code": string | null;
}

interface FilterState {
  state: string;
  city: string;
}

const ITEMS_PER_PAGE = 12;
const WHATSAPP_CONFIG = {
  phoneNumber: "+918689843820",
  baseUrl: "https://wa.me",
};

// Utility Functions
const createWhatsAppUrl = (message: string): string => {
  return `${WHATSAPP_CONFIG.baseUrl}/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(message)}`;
};

// Components
const SelectField: React.FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}> = ({ label, value, onChange, options, placeholder }) => (
  <div className="mb-4">
    <label
      htmlFor={label}
      className="block mb-2 text-sm font-medium text-gray-700"
    >
      {label}:
    </label>
    <select
      id={label}
      value={value}
      onChange={onChange}
      className="p-2 border rounded w-full"
    >
      <option value="">{placeholder}</option>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  </div>
);

const LeadCard: React.FC<{
  lead: Lead;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ lead, isSelected, onSelect }) => {
  const handleWhatsAppClick = () => {
    window.open(
      createWhatsAppUrl(MESSAGE_TEMPLATES.singleLead(lead)),
      "_blank"
    );
  };

  return (
    <div className="bg-secondary-950 text-center text-primary-50 aspect-square rounded-xl gap-4 flex flex-col shadow-md p-6">
      <Button variant="secondary">Code: {lead["Lead Code"]}</Button>
      <div className="text-3xl font-bold">
        {lead["Project Size"].replace(",", ".")} project
      </div>
      <div className="flex gap-3">
        {["Nature of Installation", "Post Code"].map((field) => (
          <div key={field} className="bg-primary-50/10 rounded-lg p-2 w-full">
            {lead[field as keyof Lead] || "N/A"}
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        {["City", "State"].map((field) => (
          <div key={field} className="bg-primary-50/10 rounded-lg p-2 w-full">
            {lead[field as keyof Lead] || "N/A"}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 whitespace-nowrap">
        <Button
          className="text-primary-950 gap-2 w-fit"
          onClick={handleWhatsAppClick}
        >
          <WhatsAppIcon />
          {isSelected ? "Lead Selected" : "Get this Lead"}
        </Button>
        <Checkbox
          className={cn(
            isSelected ? "bg-primary-500" : "bg-secondary-900",
            "w-8 h-8 whitespace-nowrap rounded-full"
          )}
          checked={isSelected}
          onCheckedChange={onSelect}
        />
      </div>
    </div>
  );
};

// Main Component
export default function LeadManagement() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filters, setFilters] = useState<FilterState>({ state: "", city: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);

  const resetFilters = useCallback(() => {
    setFilters({ state: "", city: "" });
    setCurrentPage(1);
    setSelectedLeads([]);
    setLeads([]);
    setHasSearched(false);
  }, []);

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const response = await fetch("/api/getSheetData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          state: filters.state || null,
          city: filters.city || null,
        }),
      });
      const data = await response.json();
      console.log(data);
      setLeads(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Error fetching leads:", error);
      setLeads([]); // Reset to empty array on error
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const handleLeadSelection = useCallback((leadCode: string) => {
    setSelectedLeads((prev) =>
      prev.includes(leadCode)
        ? prev.filter((code) => code !== leadCode)
        : [...prev, leadCode]
    );
  }, []);

  const composeSelectedLeadsMessage = useCallback(() => {
    const selectedLeadsCodes = leads
      .filter((lead) => selectedLeads.includes(lead["Lead Code"]))
      .map((lead) => lead["Lead Code"]);

    if (selectedLeadsCodes.length) {
      window.open(
        createWhatsAppUrl(MESSAGE_TEMPLATES.multipleLeads(selectedLeadsCodes)),
        "_blank"
      );
    }
  }, [leads, selectedLeads]);

  const totalPages = Math.ceil((leads?.length || 0) / ITEMS_PER_PAGE);
  const paginatedLeads = (leads || []).slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Section className="bg-beige-primary rounded-3xl">
      <Container>
        <SubTitle
          dark
          subTitle="Manage and Book Leads"
          className="text-secondary-950"
        />
        <div className="mb-12">
          <Heading as="h2" className="text-section leading-none">
            Filter and Book Leads You Want
          </Heading>
          <p className=" text-sm mt-3">
            Our team verifies these leads, ensuring they are double-checked for
            quality, so you can confidently claim them.
          </p>
        </div>

        <SelectField
          label="Select State"
          value={filters.state}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, state: e.target.value, city: "" }))
          }
          options={Object.keys(citiesByState).map((state) => ({
            value: state,
            label: state,
          }))}
          placeholder="-- Select State --"
        />

        {filters.state && (
          <SelectField
            label="Select City"
            value={filters.city}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, city: e.target.value }))
            }
            options={citiesByState[filters.state].map((city) => ({
              value: city,
              label: city,
            }))}
            placeholder="-- Select City (Optional) --"
          />
        )}

        <div className="flex flex-wrap gap-4 mb-10">
          <Button
            onClick={fetchLeads}
            className="bg-secondary-950 text-secondary-50 hover:bg-secondary-800"
            size="lg"
          >
            Get {filters.city || filters.state || "All"} Leads
          </Button>
          {(filters.state || filters.city) && (
            <Button onClick={resetFilters} size="lg" variant="destructive">
              Reset Filters
            </Button>
          )}
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {paginatedLeads.length > 0 ? (
              <>
                <div className="grid gap-4 justify-center lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                  {paginatedLeads.map((lead) => (
                    <LeadCard
                      key={lead["Lead Code"]}
                      lead={lead}
                      isSelected={selectedLeads.includes(lead["Lead Code"])}
                      onSelect={() => handleLeadSelection(lead["Lead Code"])}
                    />
                  ))}
                </div>
                <Button
                  onClick={composeSelectedLeadsMessage}
                  className="h-14 flex gap-2 text-primary-50 text-xl rounded-full font-bold mt-10 w-full"
                  size="lg"
                  variant="secondary"
                >
                  Book {selectedLeads.length || leads.length} Lead{" "}
                  {(selectedLeads.length || leads.length) > 1 ? "s" : ""}
                </Button>
              </>
            ) : (
              hasSearched && (
                <div className="text-center">
                  <p className="text-gray-500 mb-4">
                    No leads available for the selected location.
                  </p>
                </div>
              )
            )}

            <div className="text-center mt-6">
              <Button
                onClick={() => {
                  const location = filters.city
                    ? `${filters.city}, ${filters.state}`
                    : filters.state || null;
                  window.open(
                    createWhatsAppUrl(
                      MESSAGE_TEMPLATES.requestLocation(location || null)
                    ),
                    "_blank"
                  );
                }}
                className="bg-secondary-950 text-secondary-50 hover:bg-secondary-800"
                size="lg"
              >
                {paginatedLeads.length > 0
                  ? `Request More Leads for ${filters.city ? `${filters.city}, ${filters.state}` : filters.state || "Your Area"}`
                  : `Request Leads for ${filters.city ? `${filters.city}, ${filters.state}` : filters.state || "Your Area"}`}
              </Button>
            </div>
          </>
        )}
      </Container>
    </Section>
  );
}

const WhatsAppIcon = () => (
  <svg
    width={20}
    height={20}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
);
