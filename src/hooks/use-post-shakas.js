import { useState, useCallback } from "react";

export default function usePostShakas(slug) {
  const [total, setTotal] = useState(0);

  const giveShaka = useCallback(() => {
    setTotal(total + 1);

    if (window && window.ga) {
      window.ga('send', {
        hitType: 'event',
        eventCategory: slug,
        eventAction: 'send_shaka',
        eventValue: total
      });
    }
  }, [total, setTotal]);

  return { total, giveShaka };
}