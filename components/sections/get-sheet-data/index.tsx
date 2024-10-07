/* eslint-disable react/no-unescaped-entities */
'use client';
import { Input } from '@/components/elements/input';
import { Button } from '@/components/elements/shad-cn/button';
import { citiesByState } from '@/data/config';
import { Checkbox } from '@radix-ui/react-checkbox';
import React, { useState } from 'react';

import '../../../app/globals.css'
import { text } from 'stream/consumers';
import { cn } from '@/components/elements/utils';
import { Check, LucideMessageCircleOff } from 'lucide-react';
import { Container, Section } from '@/components/layouts';
import { Heading, SubTitle } from '@/components/elements';
import Loader from '@/components/elements/loader';
interface RowData {
    [key: string]: Lead;
}

interface BookingButtonProps {
    selectedLeads: string[];
    totalLeads: number;
    composeSelectedLeadsMessage: any
}
interface LeadCardProps {
    row: Lead;
    index: number;
    isSelected: boolean;
    onSelect: () => void;
}
interface Lead {
    "Lead Code": string;
    "Project Size": string;
    "Nature of Installation": string | null;
    City: string | null;
    State: string | null;
    "Post Code": string | null;
}

export default function SheetData() {
    const [rows, setRows] = useState<RowData[]>([]);
    const [selectedState, setSelectedState] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedState(event.target.value);
        setSelectedCity('');
    };

    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(event.target.value);
    };

    const fetchData = async (state?: string, city?: string) => {
        setIsLoading(true)
        const response = await fetch("/api/getSheetData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                state: state || null,
                city: city || null
            })
        });
        const data = await response.json();
        setRows(data.data);
        setIsLoading(false)
    };



    const handleGetAllLeads = () => {
        fetchData();
    };

    const handleGetStateLeads = () => {
        fetchData(selectedState);
    };

    const handleGetCityLeads = () => {
        fetchData(selectedState, selectedCity);
    };
    const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

    const composeAllLeadsMessage = () => {
        const leadType = selectedCity ? `${selectedCity}, ${selectedState}` : selectedState ? selectedState : 'All';
        const leadCodes = rows.map(row => row["Lead Code"]).join(", ");
        const message = `
      Hi Lead2Solar,

      I'm interested in booking all leads for ${leadType}. Here are the details:

      Number of Leads: ${rows.length}
      Lead Codes: ${leadCodes}

      Could you please review these leads and let me know the next steps?

      Thank You.
    `;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/1234567890?text=${encodedMessage}`; // Replace with actual Lead2Solar WhatsApp number
        window.open(whatsappUrl, '_blank');
    };

    const handleLeadSelection = (leadCode: string) => {
        setSelectedLeads(prev =>
            prev.includes(leadCode)
                ? prev.filter(code => code !== leadCode)
                : [...prev, leadCode]
        );
    };

    const composeSelectedLeadsMessage = (leads: Lead[]) => {
        if (!leads || leads.length === 0) {

            return;
        }
        let leadType;
        if (selectedCity && selectedState) {
            leadType = `${selectedCity}, ${selectedState}`;
        } else if (selectedState) {
            leadType = selectedState;
        } else {
            leadType = null
        }

        // Extract and join lead codes
        const selectedLeadCodes = leads
            .map(lead => lead["Lead Code"] || lead)
            .join(', ');



        // Construct the message
        const message = `
Hi Lead2Solar,

I'm interested in booking the following ${leads.length} lead${leads.length > 1 ? 's' : ''} :  \n Lead Codes: ${selectedLeadCodes}

Could you please review these leads and let me know the next steps?

Thank You.
    `;

        // Encode the message for URL
        const encodedMessage = encodeURIComponent(message);

        // Construct WhatsApp URL
        const whatsappUrl = `https://wa.me/1234567890?text=${encodedMessage}`; // Replace with actual Lead2Solar WhatsApp number

        // Open the WhatsApp URL in a new tab
        window.open(whatsappUrl, '_blank');
    };
    return (
        <Section className="bg-beige-primary rounded-3xl ">
            <Container>
                <SubTitle
                    dark
                    subTitle="Filter and Book Leads Easily"
                    className="text-secondary-950"
                />
                <div className="mb-12">
                    <Heading as="h2" className="text-section leading-none ">
                        Manage and Book Leads
                    </Heading>
                </div>
                <div className="mb-4">
                    <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-700">Select State:</label>
                    <select
                        id="state"
                        value={selectedState}
                        onChange={handleStateChange}
                        className="p-2 border rounded w-full"
                    >
                        <option value="">-- Select State --</option>
                        {(Object.keys(citiesByState) as string[]).map((state) => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>

                {selectedState && (
                    <div className="mb-4">
                        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-700">Select City:</label>
                        <select
                            id="city"
                            value={selectedCity}
                            onChange={handleCityChange}
                            className="p-2 border rounded w-full"
                        >
                            <option value="">-- Select City (Optional) --</option>
                            {citiesByState[selectedState].map((city: string) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="flex gap-4 mb-10">
                    {!selectedState && (
                        <Button
                            onClick={handleGetAllLeads}
                            className="bg-secondary-950 text-secondary-50 hover:bg-secondary-800"
                            size={'lg'}
                            type="submit"
                        >
                            Get All Leads
                        </Button>
                    )}
                    {selectedState && !selectedCity && (
                        <Button
                            onClick={handleGetStateLeads}
                            className="bg-secondary-950 text-secondary-50 hover:bg-secondary-800"
                            size={'lg'}
                            type="submit"
                        >
                            Get {selectedState} Leads
                        </Button>
                    )}
                    {selectedState && selectedCity && (
                        <Button
                            onClick={handleGetCityLeads}
                            className="bg-secondary-950 text-secondary-50 hover:bg-secondary-800"
                            size={'lg'}
                            type="submit"
                        >
                            Get {selectedCity} Leads
                        </Button>
                    )}
                    {(selectedState || selectedCity) && (
                        <Button
                            onClick={() => {
                                setSelectedState('')
                                setSelectedCity('')
                            }}

                            size={'lg'}
                            variant={'destructive'}
                            type="button"
                        >
                            Reset Filters
                        </Button>
                    )}
                </div>
                {isLoading ? (
                    <Loader />
                ) : rows?.length > 0 ? (
                    <>
                        <div className="grid gap-4 justify-center lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                            {rows.map((row: any, index) => (
                                <LeadCard
                                    key={row["Lead Code"] || index}
                                    row={row}
                                    index={index}
                                    isSelected={selectedLeads.includes(row["Lead Code"])}
                                    onSelect={() => handleLeadSelection(row["Lead Code"])}
                                />
                            ))}
                        </div>
                        <BookingButton
                            selectedLeads={selectedLeads}
                            totalLeads={rows.length}
                            composeSelectedLeadsMessage={composeSelectedLeadsMessage}
                        />
                    </>
                ) : (
                    <p className="text-gray-500">No data to display. Select a state and a city.</p>
                )}
            </Container></Section>
    );
}

interface LeadCardProps {
    row: Lead;
    index: number;
    isSelected: boolean;
    onSelect: () => void;
}

const LeadCard: React.FC<LeadCardProps> = ({ row, index, isSelected, onSelect }) => {
    const composeWhatsAppMessage = () => {
        const message = `
      *${row["Lead Code"]}*
      Hi Lead2Solar,

      I'm interested in the following project details:

      - **Lead Code:** ${row["Lead Code"]}
      - **Project Size:** ${row["Project Size"].replace(',', '.')} project
      - **Nature of Installation:** ${row["Nature of Installation"] || 'N/A'}
      - **Location:** ${row.City || 'N/A'}, ${row.State || 'N/A'}
      - **Post Code:** ${row["Post Code"] || 'N/A'}

      Could you please review and let me know the next steps?

      Thanks,`
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/1234567890?text=${encodedMessage}`; // Replace with actual Lead2Solar WhatsApp number
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div key={index} className="bg-secondary-950 text-center text-primary-50 aspect-square rounded-xl gap-4 flex flex-col shadow-md p-6">
            <Button variant={'secondary'}>
                Code: {row["Lead Code"]}
            </Button>

            <div className='text-3xl font-bold'>
                {row["Project Size"].replace(',', '.') || 'N/A' + " project"}
            </div>
            <div className='flex gap-3'>
                <div className='bg-primary-50/10 rounded-lg p-2 w-full'>
                    {row["Nature of Installation"] || 'N/A'}
                </div>
                <div className='bg-primary-50/10 rounded p-2 w-full'>
                    {row["Post Code"] || 'N/A'}
                </div>
            </div>
            <div className='flex gap-3'>
                <div className='bg-primary-50/10 rounded-lg p-2 w-full'>
                    {row.City || 'N/A'}
                </div>
                <div className='bg-primary-50/10 rounded p-2 w-full'>
                    {row.State || 'N/A'}
                </div>
            </div>
            <div className='flex items-center justify-center gap-4 whitespace-nowrap'>

                <Button className='text-primary-950 gap-2 w-fit' onClick={composeWhatsAppMessage}>
                    <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
                    {isSelected ? "Lead Selected" : " Get this Lead"}
                </Button>
                <Checkbox
                    className={cn((isSelected ? 'bg-primary-500' : 'bg-secondary-900'), 'w-8 h-8 whitespace-nowrap rounded-full')}
                    checked={isSelected}
                    onCheckedChange={onSelect}
                />

            </div>
        </div>
    );
};
const BookingButton: React.FC<BookingButtonProps> = ({ selectedLeads, totalLeads, composeSelectedLeadsMessage }) => {
    const buttonText = selectedLeads.length > 0
        ? `Book ${selectedLeads.length} Selected Lead${selectedLeads.length > 1 ? 's' : ''}`
        : `Book All ${totalLeads} Lead${totalLeads > 1 ? 's' : ''}`;

    const handleClick = () => {
        composeSelectedLeadsMessage(selectedLeads.length > 0 ? selectedLeads : totalLeads);
    };

    return (
        <Button
            onClick={handleClick}
            className="h-14 flex gap-2 text-primary-50 text-xl rounded-full font-bold mt-10 w-full"
            size="lg"
            variant="secondary"
            type="button"
        >
            {buttonText}
        </Button>
    );
};
