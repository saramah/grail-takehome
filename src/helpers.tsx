import { faker } from "@faker-js/faker"
import { Participant, TrialStatus } from "./Participant.tsx";

export let nextParticipantId = 0;
const allStatuses = Object.keys(TrialStatus)

export const generateTestParticipant: () => Participant = () => {
    nextParticipantId += 1;
    return {
        id: nextParticipantId.toString(),
        name: faker.name.fullName(),
        address: faker.address.streetAddress(),
        birthday: faker.date.birthdate(),
        telephone: faker.phone.number(),
        status: allStatuses[faker.datatype.number() % (allStatuses.length)]
    }
}

export const generateTestData = (numRows: number) => {
    const testData = Array(numRows).fill(0).map(() => generateTestParticipant())
    const testMap = new Map()
    for (const element of testData) {
        testMap[element.id] = element
    }
    return testMap;
}