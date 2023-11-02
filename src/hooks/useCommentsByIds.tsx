import { useState, useEffect, useCallback } from "react";
import { Comment } from "../interfaces";

interface UseCommentsByIdResult {
  comment: Comment | null;
  loading: boolean;
  error: Error | null;
}

const useCommentById = (id: number | string): UseCommentsByIdResult => {
  const [comment, setComment] = useState<Comment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchComment = useCallback(async () => {
    try {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      const data = await response.json();
      setComment(data as Comment);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("An unknown error occurred."));
      }
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchComment();
  }, [fetchComment]);

  return { comment, loading, error };
};

export default useCommentById;
