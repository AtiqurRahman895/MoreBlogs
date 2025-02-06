# MoreBlogs

A modern blogging platform where users can create, update, and explore various blog posts with enhanced UI/UX and dynamic features.

![MoreBlogs Screenshot](https://i.ibb.co.com/MzSJ9GC/project-Image3.jpg) 

## 🚀 Live Project  
🔗 [MoreBlogs Live](https://more-blogs-atiq.web.app)  

---

## 📌 Technologies Used  
- **Frontend**: React, React Router DOM, Styled Components, Tailwind CSS, DaisyUI, Firebase for Authentication  
- **Backend**: Node.js, Express.js, MongoDB Atlas, Axios (for API calls) 
- **Hosting:** Client hosted on firebase, Server hosted on Vercel   
- **State Management & Utilities**: LocalForage, Match Sorter, React Helmet Async  
- **Animations & UI Enhancements**: React Awesome Reveal, React Slick, Motion, React Tooltip  
- **Text Editing**: React Quill  
- **Tables & Data Handling**: React Data Table Component  

---

## 🌟 Core Features  
✅ User authentication with Firebase  
✅ Add, edit, update, and delete blogs  
✅ Wishlist feature to save favorite blogs  
✅ Featured blogs section  
✅ SEO-friendly with React Helmet Async  
✅ Responsive design with Tailwind CSS and DaisyUI  
✅ Rich-text editing using React Quill  
✅ Smooth animations and transitions  

---

## 📦 Dependencies  
Refer to [`package.json`](package.json) for a complete list of dependencies. Some key dependencies include:  
- **React & React DOM** (`^18.3.1`)  
- **React Router DOM** (`^6.28.0`)  
- **Firebase** (`^11.1.0`)  
- **Axios** (`^1.7.9`)  
- **React Quill** (`^2.0.0`)  
- **Styled Components** (`^6.1.13`)  
- **Tailwind CSS** (`^3.4.16`)  

---

## 🛠️ Installation & Setup  

Follow these steps to run the project locally:  

### Prerequisites  
- Install [Node.js](https://nodejs.org/) (latest LTS version recommended)  
- Install [Git](https://git-scm.com/)  

### Steps  

1. **Clone the repository**  
   ```sh
   git clone https://github.com/your-username/moreblogs.git
   cd moreblogs
   ```

2. **Install dependencies**  
   ```sh
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env.local` file in the root directory and add the following variables:  
   ```sh
   VITE_apiKey=your_firebase_api_key
   VITE_authDomain=your_firebase_auth_domain
   VITE_projectId=your_firebase_project_id
   VITE_storageBucket=your_firebase_storage_bucket
   VITE_messagingSenderId=your_firebase_messaging_sender_id
   VITE_appId=your_firebase_app_id
   VITE_cloudinary_cloud_name=your_cloudinary_cloud_name
   ```

4. **Start the development server**  
   ```sh
   npm run dev
   ```

5. **Open the project in your browser**  
   ```
   http://localhost:5173
   ```

---

## 🔄 Project Routes  

| Route               | Access  | Description                  |
|---------------------|---------|------------------------------|
| `/`                | Public  | Home page                     |
| `/add_blog`        | Private | Add a new blog post           |
| `/all_blogs`       | Public  | View all blogs                |
| `/blog/:_id`       | Public  | View single blog details      |
| `/update_blog/:_id`| Private | Update an existing blog       |
| `/wishlist`        | Private | View saved blogs              |
| `/featured`        | Public  | View featured blogs           |
| `/login`          | Public  | User login                    |
| `/register`       | Public  | User registration             |
| `/change-password` | Private | Change account password       |
| `/forgot-password` | Public  | Reset password request        |

---

## 🌍 Relevant Resources  
🔗 [Live Project](https://more-blogs-atiq.web.app)  
📖 [Vite Documentation](https://vitejs.dev/)  
📖 [React Router Docs](https://reactrouter.com/)  
📖 [Firebase Docs](https://firebase.google.com/docs)  

---

## 📜 License  
This project is licensed under the **MIT License**.  

🙌 Feel free to contribute and improve the project! 🚀
