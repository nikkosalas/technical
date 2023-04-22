import { useState } from "react";
 
function SourceTable({ numbers, onTransfer }) {
  return (
    <div className="flex" >
      <table>
        <tbody>
          {numbers.map((number, index) => (
            <tr key={`source-${index}`}>
              <td>{number}</td>
              <td className="bot">
                <button onClick={() => onTransfer(index)}>↶</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
function TargetTable({ numbers, onDelete }) {
  return (
    <div className="flex">
      <table>
        <tbody>
          {numbers.map((number, index) => (
            <tr key={`target-${index}`}>
              <td>{number}</td>
              <td className="bot">
                <button onClick={() => onDelete(index)}> x </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
export default function App() {
  const [sourceNumbers, setSourceNumbers] = useState([]);
  const [targetNumbers, setTargetNumbers] = useState([]);
 
  function handleAddNumber(newNumber) {
    
    const newSourceNumbers = [...sourceNumbers, newNumber];
    setSourceNumbers(newSourceNumbers);
  }
 
  function handleTransfer(index) {
    
    const newSourceNumbers = [...sourceNumbers];
    newSourceNumbers.splice(index, 1);
    setSourceNumbers(newSourceNumbers);
 
    
    const newTargetNumbers = [...targetNumbers, sourceNumbers[index]];
    setTargetNumbers(newTargetNumbers);
  }
 
  function handleDelete(index) {
   
    const newTargetNumbers = [...targetNumbers];
    newTargetNumbers.splice(index, 1);
    setTargetNumbers(newTargetNumbers);
  }
 
  return (
    <div className="main">
      
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const numberInput = event.target.elements.number;
          const newNumber = parseInt(numberInput.value, 10);
          numberInput.value = "";
          handleAddNumber(newNumber);
        }}>


          <input type="number" name="number" />
        
        <button className="add" type="submit">Add</button>
      </form>
      <h2 className="nowser">Now Serving</h2>
      <SourceTable numbers={sourceNumbers} onTransfer={handleTransfer} />
      <h2 className="nowpre">Now Preparing</h2>
      <TargetTable numbers={targetNumbers} onDelete={handleDelete} />
    </div>
  );
}