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
import { Check } from 'lucide-react';
import { Container, Section } from '@/components/layouts';
import { Heading, SubTitle } from '@/components/elements';
interface RowData {
    [key: string]: Lead;
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

    const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedState(event.target.value);
        setSelectedCity('');
    };

    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(event.target.value);
    };

    const fetchData = async (state?: string, city?: string) => {
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

                {rows?.length > 0 ? (
                    <div className="grid gap-4 justify-center lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                        {rows.map((row: any, index: number) => (
                            <LeadCard
                                key={index}
                                row={row}
                                index={index}
                                isSelected={selectedLeads.includes(row["Lead Code"])}
                                onSelect={() => handleLeadSelection(row["Lead Code"])}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No data to display. Select a state and a city.</p>
                )}
                {selectedLeads.length > 0 ? (
                    <Button
                        onClick={() => composeSelectedLeadsMessage(selectedLeads as any)}
                        className="h-14 text-xl rounded-full font-bold mt-10 w-full"
                        size={'lg'}
                        variant={'secondary'}
                        type="button"
                    >
                        Book {selectedLeads.length} Selected Lead{selectedLeads.length > 1 ? 's' : ''}
                    </Button>
                ) : rows?.length ? <Button
                    onClick={() => composeSelectedLeadsMessage(rows as any)}
                    className="h-14 text-xl rounded-full font-bold mt-10 w-full"
                    size={'lg'}
                    variant={'secondary'}
                    type="button"
                >
                    Book  All {rows.length} Lead{rows.length > 1 ? 's' : ''}
                </Button> : null}
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
            <div className='flex items-center justify-center gap-4 flex-wrap'>

                <Button className='text-primary-950 gap-2' size={'lg'} onClick={composeWhatsAppMessage}>
                    {isSelected && <Check />}
                    {isSelected ? "Lead Selected" : " Get this Lead"}
                </Button>
                <Checkbox
                    className={cn((isSelected ? 'bg-primary-500' : 'bg-secondary-900'), 'w-8 h-8 rounded-full')}
                    checked={isSelected}
                    onCheckedChange={onSelect}
                />

            </div>
        </div>
    );
};
