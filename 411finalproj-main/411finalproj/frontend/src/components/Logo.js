import { HStack, Text, Icon } from '@chakra-ui/react';
import { BuildingStorefrontIcon } from '@heroicons/react/24/solid';

const Logo = () => {
    return (
        <HStack spacing="12px">
            <Icon as={BuildingStorefrontIcon} height='36px' width='36px' color='red.600'/>
            <Text fontSize="36px" fontWeight="black" color="red.600">Table for Two</Text>
        </HStack>
    );
};

export default Logo;