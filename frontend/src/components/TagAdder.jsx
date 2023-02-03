import { useState } from 'react';

const TagAdder = ({ boardInfo, setBoardInfo }) => {
  const [tag, setTag] = useState('');

  const handleChange = (event) => {
    setTag(event.target.value);
  };

  const addTag = (event) => {
    event.preventDefault();
    if (tag !== '') {
      setBoardInfo({
        ...boardInfo,
        tags: [...boardInfo.tags, tag],
      });
    }
    setTag('');
  };

  return (
    <div className="form-group">
      <label htmlFor="tag">Board Tags</label>
      <div className="add-field">
        <input
          type="text"
          name="tag"
          id="tag"
          value={tag}
          onChange={handleChange}
        />
        <button className="btn" onClick={addTag}>
          Add Tag
        </button>
      </div>
    </div>
  );
};

export default TagAdder;
