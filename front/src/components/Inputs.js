import React from 'react'
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'


function Inputs({ name, onChangeHandler, errors }) {
    const placeholder = "Enter your " + name;
    return (
        <FormControl isInvalid={errors} isRequired>
            <FormLabel>{name}</FormLabel>
            <Input type='text' name={name} placeholder={placeholder} onChange={onChangeHandler} />
            {errors && <FormErrorMessage>{errors[0]}</FormErrorMessage>}
        </FormControl>
    )
}

export default Inputs