import { useState, useCallback } from "react";

export default function usePostShakas() {
  const [total, setTotal] = useState(0);

  const giveShaka = useCallback(() => {
    setTotal(total + 1);
  }, [total, setTotal]);

  return { total, giveShaka };
}