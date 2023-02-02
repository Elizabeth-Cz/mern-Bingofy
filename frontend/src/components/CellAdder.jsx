import { useState } from 'react';

const CellAdder = ({ boardInfo, setBoardInfo }) => {
  const [cell, setCell] = useState('');

  const handleChange = (event) => {
    setCell(event.target.value);
    console.log(boardInfo);
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
    <div className="form-group add-field">
      <input
        type="text"
        name="cell"
        id="cell"
        placeholder="Board Cells"
        value={cell}
        onChange={handleChange}
      />
      <button className="btn" onClick={addCell}>
        Add Cell
      </button>
    </div>
  );
};

export default CellAdder;
