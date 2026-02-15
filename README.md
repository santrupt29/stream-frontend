# Vortex Frontend

This is the frontend of the premium video streaming application Vortex built with **Next.js 14**, **Tailwind CSS**, and **Zustand**. It provides a sleek, modern interface for creators to upload content and for users to stream videos with adaptive HLS playback.

## 🚀 Features

-   **Cinematic UI**: A warm, minimalist, and distraction-free design inspired by high-end streaming platforms.
-   **Video Upload**: Seamless drag-and-drop upload with real-time progress tracking.
-   **Adaptive Streaming**: Integrated HLS player (`video.js` / `hls.js`) for smooth playback across varying network conditions.
-   **Creator Studio**: A dashboard to manage uploaded content, view video details, and preview playback.
-   **Authentication**: Secure JWT-based authentication (Login/Signup) with global state management.
-   **Responsive Design**: Fully optimized for desktop, tablet, and mobile experiences.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
-   **Video Player**: [Video.js](https://videojs.com/)
-   **HTTP Client**: [Axios](https://axios-http.com/)
-   **UI Components**: Custom Tailwind components + [Flowbite React](https://flowbite-react.com/)
-   **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

## 📦 Getting Started

### Prerequisites

-   Node.js 18+
-   Backend API running (Spring Boot)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/santrupt29/stream-frontend.git
    cd stream-frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    bun install
    ```

3.  Configure Environment Variables:
    Create a `.env.local` file in the root directory:
    ```env
    NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
    ```

4.  Run the development server:
    ```bash
    npm run dev
    # or
    bun dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📂 Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   ├── dashboard/        # Creator Studio (Video List & Upload)
│   └── page.js           # Landing page
├── components/           # Reusable UI components
│   ├── Navbar.js         # Main navigation
│   ├── VideoPlayer.js    # HLS Video Player wrapper
│   └── VideoUpload.js    # Video upload form with progress
├── service/              # API services
│   ├── api.js            # Axios instance with interceptors
│   └── authService.js    # Auth API calls
├── store/                # Global state management
│   └── index.js          # Zustand store (Auth & Videos)
└── public/               # Static assets
```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License

This project is licensed under the MIT License.
