import './App.css';
import handleRequest from './handleRequest';

function App() {
  return (
    <div className="App">
      <button onClick={handleRequest}>Click Me</button>
    </div>
  );
}

export default App;
