// ComboboxDemo.tsx
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Penempatan } from "@/interface/penempatan/response";

interface ComboboxDemoProps {
  data: Penempatan[];
  value: string;
  setValue: (value: string) => void;
}

export function ComboboxDemo({ data, value, setValue }: ComboboxDemoProps) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? data.find((penempatan) => penempatan.nama_penempatan === value)?.nama_penempatan
                        : "Select Penempatan..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Cari Penempatan..." />
                    <CommandList>
                        <CommandEmpty>No Penempatan found.</CommandEmpty>
                        <CommandGroup>
                            {data.map((penempatan) => (
                                <CommandItem
                                    key={penempatan.id_penempatan}
                                    value={penempatan.nama_penempatan}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === penempatan.nama_penempatan ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {penempatan.nama_penempatan}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}