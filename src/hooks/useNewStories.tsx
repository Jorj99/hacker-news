import { useState, useEffect, useCallback, useRef } from "react";
import { Story } from "../interfaces";

interface UseNewStoriesResult {
  data: Story[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

const DELAY_TIME = 60000;

const useNewStories = (): UseNewStoriesResult => {
  const [data, setData] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const lastFetchTimeRef = useRef<number>(new Date().getTime());

  const fetchNewStories = useCallback(async () => {
    try {
      const response = await fetch(
        "https://hacker-news.firebaseio.com/v0/newstories.json"
      );
      const newStoriesIds = await response.json();
      const latest100StoriesIds = newStoriesIds.slice(0, 100);

      const newStories = await Promise.all(
        latest100StoriesIds.map(async (id: string | number) => {
          const storyResponse = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`
          );
          const storyData = await storyResponse.json();
          return storyData as Story;
        })
      );

      setData(newStories);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("An unknown error occurred."));
      }
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNewStories();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      if (now - lastFetchTimeRef.current > DELAY_TIME) {
        fetchNewStories();
        lastFetchTimeRef.current = now;
      }
    }, DELAY_TIME);

    return () => clearInterval(interval);
  }, [fetchNewStories]);
  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    setData([]);
    fetchNewStories();
  }, [fetchNewStories]);

  return { data, loading, error, refetch };
};

export default useNewStories;
