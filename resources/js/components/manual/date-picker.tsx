"use client"

import { Input } from "@/components/ui/input";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ptBR } from "date-fns/locale";
import { useEffect } from "react";
import formatHandler from "@/lib/formatHandler";

interface Props {
    value?: string | number;
    onChange?: (value: any) => void;
    className?: string;
    minDate?: Date | null;
    maxDate?: Date | null;
}

const formatDate = (value: string) => {
    const digits = value.replace(/\D/g, '');

    // Apply formatting
    const parts = [];
    if (digits.length > 0) parts.push(digits.substring(0, 2)); // MM
    if (digits.length > 2) parts.push(digits.substring(2, 4)); // DD
    if (digits.length > 4) parts.push(digits.substring(4, 8)); // YYYY

    return parts.join('/');
}

const strToDate = (value: string): Date => {
    const [day, month, year] = value.split('/').map(Number);
    return new Date(year, month - 1, day); // month is 0-based in JS Date
};

const laravelDateFormat = (datetimeStr: string | undefined) => {
    if (!datetimeStr) { return '' };
    const [datePart] = datetimeStr.split(' ');
    const [year, month, day] = datePart.split('-');
    return `${day}/${month}/${year}`;
}

export function DatePicker({ value, onChange, minDate, maxDate }: Props) {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const [month, setMonth] = React.useState(new Date());
    const [txtDate, setTxtDate] = React.useState<string>(laravelDateFormat(value?.toString()));


    //atualiza txt de Data quanto data muda
    useEffect(() => {
        if (!date) return;
        console.log(date);

        setTxtDate(date.toLocaleDateString('en-GB'))
    }, [date])

    useEffect(() => {
        if (txtDate == '') {
            setMonth(new Date());
            setDate(undefined);
            return
        }

        const finalDate = new Date(strToDate(txtDate));

        setMonth(finalDate);
        if (minDate && finalDate < minDate) {
            return;

        }
        setDate(finalDate);
        onChange?.(finalDate);
    }, [txtDate])

    const handleDate = (value: string) => {
        const formattedDate = formatDate(value);

        setTxtDate(formattedDate);
    };

    return (
        <div className="flex flex-col gap-3" >
            <Popover modal={true} open={open} onOpenChange={setOpen}>
                <PopoverTrigger>
                    <Input inputIcon={<CalendarIcon className="size-5" />} value={txtDate} onChange={(e) => handleDate(e.target.value)} placeholder={new Date().toLocaleDateString('en-GB')} />
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start" onOpenAutoFocus={(e) => e.preventDefault()} onCloseAutoFocus={(e) => e.preventDefault()}>
                    <Calendar
                        endMonth={new Date((new Date().getFullYear() + 20), 0)}
                        className="bg-card"
                        buttonVariant={"default"}
                        month={month}
                        onMonthChange={setMonth}

                        locale={ptBR}
                        mode="single"
                        selected={date}
                        disabled={(date) => {
                            if (minDate && date < minDate) return true;
                            if (maxDate && date > maxDate) return true;
                            return false;
                        }}
                        captionLayout="dropdown"
                        onSelect={(selectedDate) => {
                            setDate(selectedDate)
                            setOpen(false)
                            if (selectedDate) {
                                onChange?.(selectedDate);
                            }
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
