import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ThreadInput({ onAddThread, showInput, setShowInput }) {
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  const handleBodyChange = ({ target }) => {
    if (target.value.length <= 1000) {
      setBody(target.value);
    }
  };

  const resetForm = () => {
    setBody('');
    setTitle('');
    setCategory('');
    setShowInput(false);
  };

  const handleSubmit = () => {
    onAddThread({ body, category, title });
    resetForm();
  };

  const handleCancel = () => {
    resetForm();
  };

  return (
    <div className={`thread-input-container glass-card ${showInput ? 'show' : 'hidden'}`}>
      <h3>Buat Diskusi Baru</h3>
      <input
        type='text'
        className='thread-input-title'
        placeholder='Judul Diskusi'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type='text'
        className='thread-input-category'
        placeholder='Kategori Diskusi'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <textarea
        className='thread-textarea'
        placeholder='Tulis sesuatu... (maksimal 1000 karakter)'
        value={body}
        onChange={handleBodyChange}
      />
      <p className='thread-input-char'>
        <strong>{body.length}/1000</strong>
      </p>
      <div className='btn-group'>
        <button type='submit' onClick={handleSubmit}>Thread</button>
        <button type='button' onClick={handleCancel}>Batal</button>
      </div>
    </div>
  );
}

ThreadInput.propTypes = {
  onAddThread: PropTypes.func.isRequired,
  showInput: PropTypes.bool.isRequired,
  setShowInput: PropTypes.func.isRequired,
};

export default ThreadInput;