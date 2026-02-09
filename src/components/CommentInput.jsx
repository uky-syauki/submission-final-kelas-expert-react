import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CommentInput({ onAddComment, threadId, authUser }) {
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);

  const canSend = content.trim().length > 0 && !sending;

  const handleSend = async () => {
    if (!canSend) return;

    const trimmed = content.trim();
    try {
      setSending(true);
      const result = onAddComment(trimmed, threadId);
      if (result && typeof result.then === 'function') {
        await result;
      }
      setContent('');
    } catch (err) {
      console.error('Kirim komentar gagal:', err);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  if (!authUser) {
    return (
      <div className='comment-input-disabled'>
        <p>Silakan <strong>login</strong> untuk menambahkan komentar.</p>
      </div>
    );
  }


  return (
    <div className='comment-input'>
      <img
        className='comment-avatar'
        src={authUser.avatar || '/default-avatar.png'}
        alt={authUser.name || 'avatar'}
        width={40}
        height={40}
      />

      <div className='comment-body'>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Tambahkan komentar... (Ctrl/Cmd + Enter untuk kirim)'
          aria-label='Tambahkan komentar'
          maxLength={1000}
        />

        <div className='comment-controls'>
          <small className='comment-counter'>{content.length}/1000</small>

          <div className='comment-actions'>
            <button
              type='button'
              className='comment-send-btn'
              onClick={handleSend}
              disabled={!canSend}
              aria-disabled={!canSend}
            >
              {sending ? 'Mengirim...' : 'Kirim'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

CommentInput.propTypes = {
  onAddComment: PropTypes.func.isRequired, // signature: onAddComment(content, threadId) OR returns Promise
  threadId: PropTypes.string.isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    email: PropTypes.string,
  }),
};

CommentInput.defaultProps = {
  authUser: null,
};

export default CommentInput;
