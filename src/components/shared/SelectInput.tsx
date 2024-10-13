import React, { ReactNode } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';

type OptionType = {
      id: string;
      value: string;
      label: string | ReactNode;
}

type SelectInputPropsType = {
      placeholder?: string;
      options: OptionType[];
      onChange?: (name: string, value: string) => void;
      name: string;
}

const SelectInput = ({ placeholder = "Select here", options, onChange, name }: SelectInputPropsType) => {
      return (
            <Select
                  onValueChange={(value) => {
                        if (onChange) {
                              onChange(name, value)
                        }
                  }}
            >
                  <SelectTrigger>
                        <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                        <SelectGroup>
                              <SelectLabel>{!options.length && "No Content"}</SelectLabel>
                              {
                                    options?.map((option) => <SelectItem
                                          key={option.id}
                                          value={option.value}
                                          className='capitalize'
                                    >
                                          {option.label}
                                    </SelectItem>
                                    )
                              }
                        </SelectGroup>
                  </SelectContent>
            </Select>
      );
};

export default SelectInput;