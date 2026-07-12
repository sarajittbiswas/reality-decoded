'use client';

import { useState } from 'react';

export default function PurgeButton({ id }: { id: string | number }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const res = await fetch('/api/editor/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        window.location.reload(); 
      } else {
        // Silently log the error to the console instead of an ugly browser alert
        console.error('Purge Failed: Server rejected the command.');
        setIsDeleting(false);
        setIsConfirming(false);
      }
    } catch (err) {
      console.error('Purge Failed: Network edge disconnected.');
      setIsDeleting(false);
      setIsConfirming(false);
    }
  };

  // State 2: The user clicked "Purge" and needs to confirm
  if (isConfirming) {
    return (
      <div className="flex items-center gap-1 flex-1">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex-1 px-2 py-2 text-[10px] font-bold tracking-widest uppercase text-white bg-red-600 hover:bg-red-500 border border-red-500 rounded-lg transition-colors disabled:opacity-50"
        >
          {isDeleting ? '...' : 'Confirm'}
        </button>
        <button
          onClick={() => setIsConfirming(false)}
          disabled={isDeleting}
          className="px-2 py-2 text-[10px] font-bold uppercase text-gray-400 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg transition-colors disabled:opacity-50"
        >
          X
        </button>
      </div>
    );
  }

  // State 1: Default view
  return (
    <button
      onClick={() => setIsConfirming(true)}
      className="flex-1 px-3 py-2 text-[10px] font-bold tracking-widest uppercase text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg transition-colors"
    >
      Purge
    </button>
  );
}