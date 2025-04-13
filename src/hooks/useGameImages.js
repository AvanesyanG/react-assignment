import { useQuery } from '@tanstack/react-query';

const fetchImages = async (count) => {
    const response = await fetch(
        `https://picsum.photos/v2/list?page=${Math.floor(Math.random() * 10)}&limit=${count}`
    );
    if (!response.ok) throw new Error('Failed to fetch images');
    return response.json();
};

export const useGameImages = (difficulty) => {
    const imageCount = {
        easy: 8,
        medium: 18,
        hard: 32
    }[difficulty];

    return useQuery({
        queryKey: ['gameImages', imageCount],
        queryFn: () => fetchImages(imageCount),
        enabled: !!difficulty,
        staleTime: Infinity,
        select: (data) => data.map((img) => img.download_url)
    });
};