import { faker } from "@faker-js/faker"
import React, { useState } from "react"

import './App.css';
import { TrialStatus } from "./Participant.tsx";
import { SearchPage } from './SearchPage.tsx'

const allStatuses = [TrialStatus.active, TrialStatus.withdrawn, TrialStatus.finished]

var nextParticipantId = 0;

const generateTestParticipant = () => {
  nextParticipantId += 1;
  return {
    id: nextParticipantId,
    name: faker.name.fullName(),
    address: faker.address.streetAddress(),
    birthday: faker.date.birthdate(),
    telephone: faker.phone.number(),
    status: allStatuses[faker.datatype.number() % (allStatuses.length)]
  }
}

const generateTestData = (numRows) => {
  const testData = Array(numRows).fill(0).map(() => generateTestParticipant())
  const testMap = new Map()
  for (const element of testData) {
    testMap[element.id] = element
  }
  return testMap;
}

const testData = generateTestData(10);
console.log(JSON.stringify(testData, null, 2));

function App() {

  const [selectedParticipant, setSelectedParticipant] = useState(undefined);

  const onSearch = (term) => {
    // we'll want a relatively performant algorithm here if we want to future proof it for
    // 100k participants or more. hashing is constant time, so let's just use a Map for now
    // since this is an MVP

    // in the future, we'd simply look this up in a database which would solve the problem
    // of keeping all participant objects in memory.
    if (testData[term] !== undefined) {
      setSelectedParticipant(testData[term]);
      return true;
    }
    setSelectedParticipant(undefined);
    return false;
  }

  return (
    <div className="App">
      <SearchPage search={onSearch} participant={selectedParticipant} />
    </div>
  );
}

export default App;
