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
    if (!value || value.trim() === '') {
        return new Date(); // Retorna data atual se string estiver vazia
    }
    
    const parts = value.split('/');
    if (parts.length !== 3) {
        return new Date(); // Retorna data atual se formato estiver incorreto
    }
    
    const [day, month, year] = parts.map(Number);
    
    // Verificar se os valores são números válidos
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return new Date(); // Retorna data atual se algum valor for inválido
    }
    
    const date = new Date(year, month - 1, day); // month is 0-based in JS Date
    
    // Verificar se a data criada é válida
    if (isNaN(date.getTime())) {
        return new Date(); // Retorna data atual se a data for inválida
    }
    
    return date;
};

const laravelDateFormat = (datetimeStr: string | undefined) => {
    if (!datetimeStr || datetimeStr.trim() === '') { return '' };
    const [datePart] = datetimeStr.split(' ');
    const [year, month, day] = datePart.split('-');
    
    // Verificar se todas as partes da data são válidas
    if (!year || !month || !day || isNaN(Number(year)) || isNaN(Number(month)) || isNaN(Number(day))) {
        return '';
    }
    
    return `${day}/${month}/${year}`;
}

export function DatePicker({ value, onChange, minDate, maxDate }: Props) {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const [month, setMonth] = React.useState(new Date());
    const [txtDate, setTxtDate] = React.useState<string>(laravelDateFormat(value?.toString()));

    // Sincroniza com o valor externo quando ele muda
    useEffect(() => {
        setTxtDate(laravelDateFormat(value?.toString()));
    }, [value]);

    useEffect(() => {
        if (txtDate == '') {
            setMonth(new Date());
            setDate(undefined);
            onChange?.(undefined);
            return
        }

        // Só processa se a data estiver completa (formato DD/MM/YYYY)
        if (txtDate.length === 10 && txtDate.split('/').length === 3) {
            const finalDate = strToDate(txtDate);
            
            // Só atualiza se a data for válida
            if (!isNaN(finalDate.getTime())) {
                setMonth(finalDate);
                if (minDate && finalDate < minDate) {
                    return;
                }
                setDate(finalDate);
                onChange?.(finalDate);
            }
        }
    }, [txtDate])

    const handleDate = (value: string) => {
        const formattedDate = formatDate(value);

        setTxtDate(formattedDate);
    };

    return (
        <div className="flex flex-col gap-3" >
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div>
                        <Input 
                            inputIcon={<CalendarIcon className="size-5 cursor-pointer" onClick={() => setOpen(true)} />} 
                            value={txtDate} 
                            onChange={(e) => handleDate(e.target.value)} 
                            placeholder={new Date().toLocaleDateString('en-GB')}
                        />
                    </div>
                </PopoverTrigger>
                <PopoverContent 
                    className="w-auto overflow-hidden p-0" 
                    align="start" 
                    onOpenAutoFocus={(e) => e.preventDefault()} 
                    onCloseAutoFocus={(e) => e.preventDefault()}
                >
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
