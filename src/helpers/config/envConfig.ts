export const getBaseUrl = (): string => {
      // return "http://localhost:5000/api/v1";
    
      return (
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "https://gym-schedule-backend-eight.vercel.app/api/v1"
      );
    };
    