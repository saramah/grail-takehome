import React, { useState } from "react";

import './App.css';
import { SearchPage } from './SearchPage.tsx';
import { generateTestData } from './helpers.tsx';

const testData = generateTestData(10);

function App() {

  const [selectedParticipant, setSelectedParticipant] = useState(undefined);

  const handleSearch = (term) => {
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

  const handleFieldUpdate = (id, valueType, newValue) => {
    const newInfo = { ...testData[id] };
    newInfo[valueType] = newValue;
    testData[id] = newInfo;
    setSelectedParticipant(newInfo);
    return true;
  }

  return (
    <div className="App">
      <SearchPage search={handleSearch} participant={selectedParticipant} onFieldUpdate={handleFieldUpdate} />
    </div>
  );
}

export default App;
