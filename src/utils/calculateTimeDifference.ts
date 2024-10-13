// Calculate time difference
export const calculateTimeDifference = (startTime: string, endTime: string): number => {
      const [startHours, startMinutes] = startTime.split(":").map(Number);
      const [endHours, endMinutes] = endTime.split(":").map(Number);

      const startDate = new Date();
      startDate.setHours(startHours, startMinutes);

      const endDate = new Date();
      endDate.setHours(endHours, endMinutes);

      const diffInMilliseconds = endDate.getTime() - startDate.getTime();
      const diffInHours = diffInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours

      return diffInHours;
};