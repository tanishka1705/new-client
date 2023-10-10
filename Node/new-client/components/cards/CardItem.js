import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react"
import { useState } from "react"

const CardItem = ({ title, onClick }) => {

    return (
        <>
            <Card w='17em' cursor='pointer' style={{ backgroundImage: `url('/images/card.jpg')`, backgroundSize: 'cover' }} onClick={() => onClick(true)} >
                <CardHeader color='white' fontSize='1.3em' textAlign='center'>{title}</CardHeader>
            </Card>
        </>
    )
}

export default CardItem