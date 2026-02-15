import { create } from 'zustand';
import Cookies from 'js-cookie';
import { authService } from '@/service/authService';

export const useStore = create((set, get) => ({
    // Auth State
    isAuthenticated: !!Cookies.get('auth_token'),
    user: null,

    login: (userData) => {
        set({ isAuthenticated: true, user: userData });
    },

    logout: () => {
        authService.logout();
        set({ isAuthenticated: false, user: null, videos: [] }); // Clear videos on logout
    },

    checkAuth: () => {
        const token = Cookies.get('auth_token');
        set({ isAuthenticated: !!token });
    },

    // Video State
    videos: [],
    setVideos: (videos) => set({ videos }),
    addVideo: (video) => set((state) => ({ videos: [video, ...state.videos] })),
    fetchVideos: async () => {
        try {
            const { default: api } = await import('@/service/api');
            const response = await api.get("/api/v1/videos/my-videos");
            set({ videos: response.data });
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    },
}));
