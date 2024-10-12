export const calculateRange = (total: number, page: number, limit: number): { start: number, end: number } | null => {
    if (!total || !page || !limit) {
        return null;
    }
    const start = (page - 1) * limit + 1;
    const end = Math.min(start + limit - 1, total);
    return { start, end };
};