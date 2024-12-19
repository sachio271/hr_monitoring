import { Vendor } from "@/interface/vendor/response";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface ComboboxDemoProps {
  data: Vendor[];
  value: string;
  setValue: (value: string) => void;
}

export function VendorSelect({ data, value, setValue }: ComboboxDemoProps) {
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
                        ? data.find((vendor) => vendor.id_vendor === value)?.nama_vendor
                        : "Select Vendor..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Cari Vendor..." />
                    <CommandList>
                        <CommandEmpty>No Vendor found.</CommandEmpty>
                        <CommandGroup>
                            {data.map((vendor) => (
                                <CommandItem
                                    key={vendor.id_vendor}
                                    value={vendor.id_vendor}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === vendor.id_vendor ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {vendor.nama_vendor}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}