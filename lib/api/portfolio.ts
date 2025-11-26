export interface PortfolioImage {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
}

export interface PortfolioVideo {
    url: string;
    thumbnail?: string;
    duration?: number;
}

export type PortfolioMedia =
    | string
    | PortfolioImage
    | PortfolioVideo
    | (string | PortfolioImage | PortfolioVideo)[];

export interface PortfolioItem {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    category: string | null;
    images: PortfolioMedia | null;
    videos: PortfolioMedia | null;
    createdAt: string;
}

export interface PortfolioResponse {
    data: PortfolioItem[];
    total: number;
    limit: number | null;
    offset: number | null;
}

export async function getPortfolioItems(limit?: number, category?: string): Promise<PortfolioItem[]> {
    try {
        // For client-side, use relative URL
        const isServer = typeof window === 'undefined';
        const baseUrl = isServer
            ? (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000')
            : '';

        let url = `${baseUrl}/api/portfolio?published=true`;

        if (limit) {
            url += `&limit=${limit}`;
        }

        if (category) {
            url += `&category=${category}`;
        }

        const response = await fetch(url, {
            next: isServer ? { revalidate: 3600 } : undefined, // Revalidate every hour on server
            cache: isServer ? 'force-cache' : 'no-store',
        });

        if (!response.ok) {
            return [];
        }

        const result: PortfolioResponse = await response.json();
        return result.data || [];
    } catch (error) {
        // Error will be handled by error boundary or component
        if (process.env.NODE_ENV === 'development') {
            console.error('Error fetching portfolio:', error);
        }
        return [];
    }
}

