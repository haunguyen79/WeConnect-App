import FriendRequests from "@components/FriendRequests";
import PostCreation from "@components/PostCreation";
import PostList from "@components/PostList";
import Sidebar from "@components/Sidebar";

function HomePage() {
  return (
    <div className="bg-dark-200 flex gap-4 p-6">
      <Sidebar />
      <div className="flex-1 flex flex-col gap-4">
        <PostCreation />
        <PostList />
      </div>
      <div className="w-64 hidden sm:block">
        <FriendRequests />
      </div>
    </div>
  );
}

export default HomePage;

// Nhấn Ctrl + Space -> Gợi ý Code TailwindCSS
