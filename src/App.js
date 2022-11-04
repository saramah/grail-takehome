import './App.css';
import { SearchPage } from './SearchPage.tsx'

function App() {
  const onSearch = (term) => {
    console.log("hello " + term)
  }

  return (
    <div className="App">
      <SearchPage search={onSearch} />
    </div>
  );
}

export default App;
