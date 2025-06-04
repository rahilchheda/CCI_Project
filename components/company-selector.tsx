"use client"

import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface CompanySelectorProps {
  selectedCompanies: string[]
  onSelect: (company: string) => void
  companies: string[]
}

export function CompanySelector({ selectedCompanies, onSelect, companies }: CompanySelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Select Companies to Compare (max 2)</label>
        <div className="flex flex-wrap gap-2">
          {[0, 1].map((index) => (
            <Popover key={index}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full md:w-[250px] justify-between",
                    !selectedCompanies[index] && "text-muted-foreground",
                  )}
                >
                  {selectedCompanies[index] || `Select company ${index + 1}`}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full md:w-[250px] p-0">
                <Command>
                  <CommandInput placeholder="Search company..." />
                  <CommandList>
                    <CommandEmpty>No company found.</CommandEmpty>
                    <CommandGroup>
                      {companies.map((company) => (
                        <CommandItem
                          key={company}
                          value={company}
                          onSelect={() => onSelect(company)}
                          disabled={selectedCompanies.includes(company) && selectedCompanies.indexOf(company) !== index}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCompanies.indexOf(company) === index ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {company}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </div>
    </div>
  )
}
