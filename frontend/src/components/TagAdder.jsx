import { useState } from 'react';

const TagAdder = ({ boardInfo, setBoardInfo }) => {
  const [tag, setTag] = useState('');

  const handleChange = (event) => {
    setTag(event.target.value);
    console.log(boardInfo);
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
    <div className="form-group add-field">
      <input
        type="text"
        name="tag"
        id="tag"
        placeholder="Board Tag"
        value={tag}
        onChange={handleChange}
      />
      <button className="btn" onClick={addTag}>
        Add Tag
      </button>
    </div>
  );
};

export default TagAdder;
