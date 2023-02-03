import { useState } from 'react';

const CellAdder = ({ boardInfo, setBoardInfo }) => {
  const [cell, setCell] = useState('');

  const handleChange = (event) => {
    setCell(event.target.value);
  };

  const addCell = (event) => {
    event.preventDefault();
    if (cell !== '') {
      setBoardInfo({
        ...boardInfo,
        cells: [...boardInfo.cells, cell],
      });
    }
    setCell('');
  };

  return (
    <>
      <div className="form-group">
        <label htmlFor="cell">Board cells</label>
        <div className="add-field">
          <input
            type="text"
            name="cell"
            id="cell"
            value={cell}
            onChange={handleChange}
          ></input>
          <button className="btn" onClick={addCell}>
            Add Cell
          </button>
        </div>
      </div>
    </>
  );
};

export default CellAdder;
