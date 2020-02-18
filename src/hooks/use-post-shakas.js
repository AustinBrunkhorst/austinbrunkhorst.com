import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

const apiRequestDebounce = 1250;

export default function usePostShakas(slug) {
  const [total, setTotal] = useState(0);
  const apiTimeout = useRef(null);
  const sendShakaQueue = useRef(0);

  useEffect(() => {
    axios.get(
      `https://abrunkhorst-blog.azurewebsites.net/api/shaka/${slug.replace(/\//g, '')}`, 
      { 
        params: {
          code: "lCCNJVI9L/EAW/ddJeh/v4G9WfHdni4KQaoKb8yvadIYquAQZcY6eQ=="
        }
      }
    ).then(response => setTotal(response.data));
  }, [slug]);

  const sendShakas = useCallback(() => {
    const count = sendShakaQueue.current;

    sendShakaQueue.current = 0;

    axios.post(
      `https://abrunkhorst-blog.azurewebsites.net/api/shaka/${slug.replace(/\//g, '')}`,
      { count },
      { 
        params: {
          code: "9qt/OiVkTzsbq9NT9GE76ndbk/YV4MDqTKSA98rAs02bpgkzoFpONg=="
        }
      }
    ).then(response => setTotal(response.data));
  }, [setTotal]);

  const giveShaka = useCallback(() => {
    setTotal(total + 1);

    ++sendShakaQueue.current;

    clearTimeout(apiTimeout.current);
    apiTimeout.current = setTimeout(sendShakas, apiRequestDebounce);

    if (window && window.ga) {
      window.ga('send', {
        hitType: 'event',
        eventCategory: slug,
        eventAction: 'send_shaka',
        eventValue: 1
      });
    }
  }, [total, setTotal]);

  return { total, giveShaka };
}